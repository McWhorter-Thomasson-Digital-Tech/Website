import { NextResponse } from 'next/server';
import { sendAllWalletUpdates } from '@/lib/sendWalletUpdates';

// Force dynamic and give this route up to 60 seconds to execute.
// This prevents the timeouts experienced in the instrumentation hook.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    // Optional: Protect this route with a secret so only authorized clients
    // (like a GitHub Action or Vercel Webhook) can trigger it.
    const authHeader = request.headers.get('authorization');
    const secret = process.env.APPLE_PASS_UPDATE_SECRET;

    if (secret && authHeader !== `Bearer ${secret}`) {
      console.warn('[wallet-updates-api] Unauthorized update attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[wallet-updates-api] Triggering wallet updates...');
    const result = await sendAllWalletUpdates();

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('[wallet-updates-api] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed.' }, { status: 405 });
}
