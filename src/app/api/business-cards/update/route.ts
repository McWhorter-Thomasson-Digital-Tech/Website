export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import apn from 'apn';
import crypto from 'crypto';

// Using a module-level variable to cache the APN provider across hot reloads if possible
let apnProvider: apn.Provider | null = null;

function getApnProvider() {
  if (apnProvider) return apnProvider;

  const {
    APPLE_APNS_KEY,
    APPLE_APNS_KEY_ID,
    APPLE_PASS_TEAM_IDENTIFIER
  } = process.env;

  if (!APPLE_APNS_KEY || !APPLE_APNS_KEY_ID || !APPLE_PASS_TEAM_IDENTIFIER) {
    throw new Error('APNs credentials not configured');
  }

  apnProvider = new apn.Provider({
    token: {
      key: Buffer.from(APPLE_APNS_KEY, 'base64'),
      keyId: APPLE_APNS_KEY_ID,
      teamId: APPLE_PASS_TEAM_IDENTIFIER
    },
    production: true // Usually true for Wallet passes even in dev
  });

  return apnProvider;
}

export async function POST(request: Request) {
  try {
    const payloadStr = await request.text();
    let body;
    try {
      body = JSON.parse(payloadStr);
    } catch (e) {
      return new NextResponse('Invalid JSON body', { status: 400 });
    }

    const { employeeId } = body;
    if (!employeeId) {
      return new NextResponse('Missing employeeId', { status: 400 });
    }

    // 1. Dynamic Security Checks
    const signature = request.headers.get('x-mtdt-signature');
    const authHeader = request.headers.get('Authorization');
    const webhookSecret = process.env.WEBHOOK_SECRET;

    let isAuthorized = false;

    // Webhook HMAC Validation
    if (signature && webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payloadStr, 'utf8')
        .digest('hex');

      if (
        signature.length === expectedSignature.length &&
        crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))
      ) {
        isAuthorized = true;
      }
    }
    // Supabase Session Validation (CMS/Admin)
    else if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (user && !error) {
        // If the user has a valid Supabase session, we authorize them.
        // Role-based checks (e.g. user.user_metadata.role === 'admin') can be added here.
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const serialNumber = `card-${employeeId}`;

    // 2. Update the timestamp in Supabase
    const { error: updateError } = await supabase
      .from('wallet_passes')
      .update({ updated_at: new Date().toISOString() })
      .eq('serial_number', serialNumber);

    if (updateError) {
      console.error('Failed to update pass timestamp:', updateError);
      return new NextResponse('Database Error', { status: 500 });
    }

    // 3. Get all push tokens
    const { data: registrations, error: fetchError } = await supabase
      .from('wallet_registrations')
      .select('push_token')
      .eq('serial_number', serialNumber);

    if (fetchError || !registrations) {
      console.error('Failed to fetch registrations:', fetchError);
      return new NextResponse('Database Error', { status: 500 });
    }

    if (registrations.length === 0) {
      // No one has added this pass to their wallet yet
      return new NextResponse('Pass updated, no devices to notify', { status: 200 });
    }

    const pushTokens = registrations.map(reg => reg.push_token);

    // 4. Send APNs Push
    try {
      const provider = getApnProvider();

      const notification = new apn.Notification();
      // Apple Wallet requires an completely empty payload for pass updates.
      notification.topic = process.env.APPLE_PASS_TYPE_IDENTIFIER || 'pass.com.mtdigitaltech.businesscard';

      const result = await provider.send(notification, pushTokens);

      return NextResponse.json({
        message: `Push notification sent to ${pushTokens.length} devices`,
        apnsResult: result
      }, { status: 200 });

    } catch (apnError) {
      console.error('APNs sending failed:', apnError);
      return new NextResponse('Failed to send push notifications', { status: 500 });
    }

  } catch (error) {
    console.error('Error in Update trigger:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
