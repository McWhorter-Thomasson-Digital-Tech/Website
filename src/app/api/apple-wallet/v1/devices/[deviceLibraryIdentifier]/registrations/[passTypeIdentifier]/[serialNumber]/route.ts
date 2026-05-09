export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

async function validateToken(request: Request, serialNumber: string): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  console.log('[wallet-auth] serialNumber:', serialNumber);
  console.log('[wallet-auth] authHeader present:', !!authHeader, 'starts with ApplePass:', authHeader?.startsWith('ApplePass '));

  if (!authHeader || !authHeader.startsWith('ApplePass ')) {
    console.log('[wallet-auth] REJECTED: missing or malformed Authorization header');
    return false;
  }
  const token = authHeader.replace('ApplePass ', '').trim();
  console.log('[wallet-auth] token from device (first 8 chars):', token.substring(0, 8));
  
  const { data, error } = await supabase
    .from('wallet_passes')
    .select('authentication_token')
    .eq('serial_number', serialNumber)
    .single();

  console.log('[wallet-auth] DB lookup — error:', error?.message || 'none', '| data found:', !!data);
  if (data) {
    console.log('[wallet-auth] DB token (first 8 chars):', data.authentication_token?.substring(0, 8));
    console.log('[wallet-auth] tokens match:', data.authentication_token === token);
  }

  if (error || !data) return false;
  
  return data.authentication_token === token;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ deviceLibraryIdentifier: string, passTypeIdentifier: string, serialNumber: string }> }
) {
  try {
    const { deviceLibraryIdentifier, serialNumber } = await params;
    
    // Validate Authorization header
    const isValid = await validateToken(request, serialNumber);
    if (!isValid) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const pushToken = body.pushToken;

    if (!pushToken) {
      return new NextResponse('Missing pushToken', { status: 400 });
    }

    const { error } = await supabase
      .from('wallet_registrations')
      .upsert({
        device_library_identifier: deviceLibraryIdentifier,
        serial_number: serialNumber,
        push_token: pushToken
      }, { onConflict: 'device_library_identifier,serial_number' });

    if (error) {
      console.error('Error inserting wallet registration:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    return new NextResponse('OK', { status: 200 }); // Apple accepts 201 or 200
  } catch (error) {
    console.error('Error in POST registration:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ deviceLibraryIdentifier: string, passTypeIdentifier: string, serialNumber: string }> }
) {
  try {
    const { deviceLibraryIdentifier, serialNumber } = await params;

    // Validate Authorization header
    const isValid = await validateToken(request, serialNumber);
    if (!isValid) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { error } = await supabase
      .from('wallet_registrations')
      .delete()
      .match({
        device_library_identifier: deviceLibraryIdentifier,
        serial_number: serialNumber
      });

    if (error) {
      console.error('Error deleting wallet registration:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error in DELETE registration:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
