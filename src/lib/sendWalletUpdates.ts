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

  // 3. Send APNs pushes
  try {
    console.log('[wallet-updates] Step 4: Sending APNs push...');
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

    console.log('[wallet-updates] Step 4.1: Importing apn library...');
    const apn = (await import('apn')).default;

    console.log('[wallet-updates] Step 4.2: Creating apn.Provider...');
    const provider = new apn.Provider({
      token: {
        key: Buffer.from(APPLE_APNS_KEY, 'base64'),
        keyId: APPLE_APNS_KEY_ID,
        teamId: APPLE_PASS_TEAM_IDENTIFIER
      },
      production: true
    });

    try {
      const notification = new apn.Notification();
      // Apple Wallet requires a completely empty payload for pass updates
      notification.topic = APPLE_PASS_TYPE_IDENTIFIER || 'pass.com.mtdigitaltech.businesscard';

      console.log(`[wallet-updates] Step 4.3: Sending push to ${pushTokens.length} token(s)...`);
      
      // Race the send operation against a 10s timeout
      const sendPromise = provider.send(notification, pushTokens);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('APNs push timed out after 10s')), 10000)
      );

      const result = await Promise.race([sendPromise, timeoutPromise]) as any;
      console.log(`[wallet-updates] Step 4.4 OK — APNs result:`, JSON.stringify(result));
    } finally {
      console.log('[wallet-updates] Step 4.5: Shutting down apn.Provider...');
      provider.shutdown();
    }

    return { updated: passes.length, notified: pushTokens.length };
  } catch (err: any) {
    console.error('[wallet-updates] Step 4 FAILED — Exception:', err.message || err);
    return { updated: passes.length, notified: 0 };
  }
}

