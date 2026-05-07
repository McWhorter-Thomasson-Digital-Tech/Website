export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ deviceLibraryIdentifier: string, passTypeIdentifier: string }> }
) {
  try {
    const { deviceLibraryIdentifier } = await params;
    const url = new URL(request.url);
    const passesUpdatedSince = url.searchParams.get('passesUpdatedSince');

    let query = supabase
      .from('wallet_registrations')
      .select(`
        serial_number,
        wallet_passes!inner(updated_at)
      `)
      .eq('device_library_identifier', deviceLibraryIdentifier);

    if (passesUpdatedSince) {
      // Filter passes that have been updated strictly after passesUpdatedSince
      query = query.gt('wallet_passes.updated_at', passesUpdatedSince);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching registrations:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    if (!data || data.length === 0) {
      return new NextResponse(null, { status: 204 }); // 204 No Content if no passes found
    }

    const serialNumbers = data.map(row => row.serial_number);
    
    // Use the latest updated_at as the new tag
    const latestDate = new Date(Math.max(...data.map(row => new Date((row.wallet_passes as any).updated_at).getTime())));

    return NextResponse.json({
      lastUpdated: latestDate.toISOString(),
      serialNumbers: serialNumbers
    }, { status: 200 });

  } catch (error) {
    console.error('Error in GET registrations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
