import { supabase } from './supabase';

/**
 * Sends APNs push notifications to ALL registered devices, triggering them to
 * fetch the latest pass data. Used by the deploy hook to push updates when
 * business card data changes with a new deployment.
 */
export async function sendAllWalletUpdates(): Promise<{ updated: number; notified: number }> {
  console.log('[wallet-updates] Starting post-deploy wallet update...');

  // 1. Bump updated_at for ALL passes so devices know there's something new
  const { data: passes, error: passError } = await supabase
    .from('wallet_passes')
    .select('serial_number');

  if (passError || !passes || passes.length === 0) {
    console.log('[wallet-updates] No passes found in DB');
    return { updated: 0, notified: 0 };
  }

  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from('wallet_passes')
    .update({ updated_at: now })
    .in('serial_number', passes.map(p => p.serial_number));

  if (updateError) {
    console.error('[wallet-updates] Failed to update timestamps:', updateError);
    return { updated: 0, notified: 0 };
  }

  console.log(`[wallet-updates] Updated ${passes.length} pass timestamps`);

  // 2. Get all registered push tokens (deduplicated)
  const { data: registrations, error: regError } = await supabase
    .from('wallet_registrations')
    .select('push_token');

  if (regError || !registrations || registrations.length === 0) {
    console.log('[wallet-updates] No registered devices to notify');
    return { updated: passes.length, notified: 0 };
  }

  // 3. Send APNs pushes
  const {
    APPLE_APNS_KEY,
    APPLE_APNS_KEY_ID,
    APPLE_PASS_TEAM_IDENTIFIER,
    APPLE_PASS_TYPE_IDENTIFIER
  } = process.env;

  if (!APPLE_APNS_KEY || !APPLE_APNS_KEY_ID || !APPLE_PASS_TEAM_IDENTIFIER) {
    console.warn('[wallet-updates] APNs credentials not configured, skipping push notifications');
    return { updated: passes.length, notified: 0 };
  }

  const apn = (await import('apn')).default;

  const provider = new apn.Provider({
    token: {
      key: Buffer.from(APPLE_APNS_KEY, 'base64'),
      keyId: APPLE_APNS_KEY_ID,
      teamId: APPLE_PASS_TEAM_IDENTIFIER
    },
    production: true
  });

  const notification = new apn.Notification();
  // Apple Wallet requires a completely empty payload for pass updates
  notification.topic = APPLE_PASS_TYPE_IDENTIFIER || 'pass.com.mtdigitaltech.businesscard';

  const pushTokens = [...new Set(registrations.map(r => r.push_token))];
  const result = await provider.send(notification, pushTokens);

  console.log(`[wallet-updates] APNs push sent to ${pushTokens.length} device(s):`, JSON.stringify(result));

  provider.shutdown();

  return { updated: passes.length, notified: pushTokens.length };
}
