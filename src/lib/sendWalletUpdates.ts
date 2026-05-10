import jwt from 'jsonwebtoken';
import http2 from 'http2';
import { supabase } from './supabase';

/**
 * Sends APNs push notifications to ALL registered devices, triggering them to
 * fetch the latest pass data. Used by the deploy hook to push updates when
 * business card data changes with a new deployment.
 */
export async function sendAllWalletUpdates(): Promise<{ updated: number; notified: number }> {
  console.log('[wallet-updates] Starting post-deploy wallet update...');

  // 0. Quick connectivity test
  try {
    console.log('[wallet-updates] Step 0: Checking internet connectivity...');
    const start = Date.now();
    const probe = await fetch('https://www.google.com', { method: 'HEAD', signal: AbortSignal.timeout(3000) });
    console.log(`[wallet-updates] Step 0 OK — Connectivity probe successful (${probe.status}) in ${Date.now() - start}ms`);
  } catch (err) {
    console.warn('[wallet-updates] Step 0 WARNING — Connectivity probe failed (non-fatal):', err);
  }

  // 1. Bump updated_at for ALL passes so devices know there's something new
  let passes: { serial_number: string }[] = [];
  try {
    console.log('[wallet-updates] Step 1: Fetching passes from DB...');
    
    // Race the supabase call against a timeout to prevent hanging the cold start
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Supabase fetch timed out after 8s')), 8000)
    );

    const fetchPromise = supabase
      .from('wallet_passes')
      .select('serial_number');

    const { data, error: passError } = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (passError) {
      console.error('[wallet-updates] Step 1 FAILED — DB error:', passError.message);
      return { updated: 0, notified: 0 };
    }

    if (!data || data.length === 0) {
      console.log('[wallet-updates] Step 1 — No passes found in DB');
      return { updated: 0, notified: 0 };
    }

    passes = data;
    console.log(`[wallet-updates] Step 1 OK — Found ${passes.length} pass(es)`);
  } catch (err) {
    console.error('[wallet-updates] Step 1 EXCEPTION:', err);
    return { updated: 0, notified: 0 };
  }

  try {
    console.log('[wallet-updates] Step 2: Bumping timestamps...');
    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('wallet_passes')
      .update({ updated_at: now })
      .in('serial_number', passes.map(p => p.serial_number));

    if (updateError) {
      console.error('[wallet-updates] Step 2 FAILED:', updateError.message);
      return { updated: 0, notified: 0 };
    }
    console.log(`[wallet-updates] Step 2 OK — Updated ${passes.length} pass timestamps`);
  } catch (err) {
    console.error('[wallet-updates] Step 2 EXCEPTION:', err);
    return { updated: 0, notified: 0 };
  }

  // 2. Get all registered push tokens (deduplicated)
  let pushTokens: string[] = [];
  try {
    console.log('[wallet-updates] Step 3: Fetching registrations...');
    const { data: registrations, error: regError } = await supabase
      .from('wallet_registrations')
      .select('push_token');

    if (regError) {
      console.error('[wallet-updates] Step 3 FAILED:', regError.message);
      return { updated: passes.length, notified: 0 };
    }

    if (!registrations || registrations.length === 0) {
      console.log('[wallet-updates] Step 3 — No registered devices to notify');
      return { updated: passes.length, notified: 0 };
    }

    pushTokens = [...new Set(registrations.map(r => r.push_token))];
    console.log(`[wallet-updates] Step 3 OK — Found ${pushTokens.length} device(s)`);
  } catch (err) {
    console.error('[wallet-updates] Step 3 EXCEPTION:', err);
    return { updated: passes.length, notified: 0 };
  }

  // 3. Send APNs pushes (HTTP/2 Implementation)
  try {
    console.log('[wallet-updates] Step 4: Sending APNs push via HTTP/2...');
    const {
      APPLE_APNS_KEY,
      APPLE_APNS_KEY_ID,
      APPLE_PASS_TEAM_IDENTIFIER,
      APPLE_PASS_TYPE_IDENTIFIER
    } = process.env;

    if (!APPLE_APNS_KEY || !APPLE_APNS_KEY_ID || !APPLE_PASS_TEAM_IDENTIFIER) {
      console.warn('[wallet-updates] Step 4 SKIPPED — APNs credentials not configured');
      return { updated: passes.length, notified: 0 };
    }

    console.log('[wallet-updates] Step 4.1: Generating APNs JWT...');
    const privateKey = Buffer.from(APPLE_APNS_KEY, 'base64').toString('utf8');
    const token = jwt.sign({}, privateKey, {
      algorithm: 'ES256',
      issuer: APPLE_PASS_TEAM_IDENTIFIER,
      header: {
        alg: 'ES256',
        kid: APPLE_APNS_KEY_ID,
      },
    });

    const topic = APPLE_PASS_TYPE_IDENTIFIER || 'pass.com.mtdigitaltech.businesscard';
    let notifiedCount = 0;

    console.log(`[wallet-updates] Step 4.2: Sending push to ${pushTokens.length} device(s)...`);
    
    // 1. Open a single HTTP/2 connection to Apple
    const client = http2.connect('https://api.push.apple.com');

    client.on('error', (err) => console.error('[wallet-updates] HTTP/2 Client Error:', err));

    // 2. Send requests over the multiplexed connection
    const results = await Promise.all(pushTokens.map((deviceToken) => {
      return new Promise((resolve) => {
        // Set a per-stream timeout
        const req = client.request({
          ':method': 'POST',
          ':path': `/3/device/${deviceToken}`,
          'authorization': `bearer ${token}`,
          'apns-topic': topic,
          'apns-push-type': 'background',
          'apns-priority': '5'
        });

        req.setTimeout(5000, () => {
          req.close(http2.constants.NGHTTP2_CANCEL);
          resolve({ token: deviceToken, success: false, error: 'Timeout' });
        });

        let responseData = '';

        req.on('response', (headers) => {
          const status = headers[':status'];
          req.on('data', (chunk) => { responseData += chunk; });
          req.on('end', () => {
            if (status === 200) {
              notifiedCount++;
              resolve({ token: deviceToken, success: true });
            } else {
              console.warn(`[wallet-updates] Push failed for ${deviceToken}: ${status} ${responseData}`);
              resolve({ token: deviceToken, success: false, status });
            }
          });
        });

        req.on('error', (err) => {
          console.error(`[wallet-updates] Stream error for ${deviceToken}:`, err.message);
          resolve({ token: deviceToken, success: false, error: err.message });
        });

        // Send the empty payload
        req.write(JSON.stringify({}));
        req.end();
      });
    }));

    // 3. Close the connection when done
    client.close();

    console.log(`[wallet-updates] Step 4.3 OK — Successfully notified ${notifiedCount}/${pushTokens.length} devices`);
    return { updated: passes.length, notified: notifiedCount };
  } catch (err: any) {
    console.error('[wallet-updates] Step 4 FAILED — Exception:', err.message || err);
    return { updated: passes.length, notified: 0 };
  }
}

