export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const logs = body.logs;

    if (logs && Array.isArray(logs)) {
      logs.forEach(log => {
        console.error('[Apple Wallet Error Log]:', log);
      });
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error in Apple Wallet log endpoint:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
