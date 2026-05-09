export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { mockBusinessCards } from '@/data/mockBusinessCards';
import { PKPass } from 'passkit-generator';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ passTypeIdentifier: string, serialNumber: string }> }
) {
  try {
    const { serialNumber } = await params;
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('ApplePass ')) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const token = authHeader.replace('ApplePass ', '').trim();
    
    const { data: passData, error: dbError } = await supabase
      .from('wallet_passes')
      .select('authentication_token, updated_at')
      .eq('serial_number', serialNumber)
      .single();

    if (dbError || !passData || passData.authentication_token !== token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Extract employeeId from serialNumber (format: card-{employeeId})
    const employeeId = serialNumber.replace('card-', '');
    const employeeData = mockBusinessCards[employeeId];

    if (!employeeData) {
      return new NextResponse('Pass Not Found', { status: 404 });
    }

    // Verify required environment variables
    const {
      APPLE_WWDR_CERT,
      APPLE_SIGNER_CERT,
      APPLE_SIGNER_KEY,
      APPLE_PASS_TEAM_IDENTIFIER,
      APPLE_PASS_TYPE_IDENTIFIER,
    } = process.env;

    if (!APPLE_WWDR_CERT || !APPLE_SIGNER_CERT || !APPLE_SIGNER_KEY) {
      console.error('Missing Apple Wallet Certificates in environment variables.');
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    const webServiceURL = `https://www.${(process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'mtdigitaltech.com').replace(/^www\./, '')}/api/apple-wallet/`;

    // Build the pass.json payload
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: APPLE_PASS_TYPE_IDENTIFIER || 'pass.com.mtdigitaltech.businesscard',
      serialNumber: serialNumber,
      teamIdentifier: APPLE_PASS_TEAM_IDENTIFIER || 'TEAMID1234',
      webServiceURL,
      authenticationToken: token,
      organizationName: employeeData.companyName,
      description: `${employeeData.firstName} ${employeeData.lastName} - Digital Business Card`,
      backgroundColor: employeeData.passBackgroundColor || '#0f172a',
      foregroundColor: employeeData.passTextColor || '#ffffff',
      labelColor: employeeData.passTextColor || '#ffffff',
      logoText: employeeData.companyName,
      generic: {
        primaryFields: [
          {
            key: 'name',
            label: 'Name',
            value: `${employeeData.firstName} ${employeeData.lastName}`
          }
        ],
        secondaryFields: [
          {
            key: 'title',
            label: 'Title',
            value: employeeData.title
          },
          {
            key: 'phone',
            label: 'Phone',
            value: employeeData.phoneMobile
          }
        ],
        auxiliaryFields: [
          {
            key: 'email',
            label: 'Email',
            value: employeeData.email
          }
        ],
        backFields: [
          {
            key: 'website',
            label: 'Website',
            value: employeeData.companyWebsite
          },
          ...(employeeData.linkedInUrl ? [{
            key: 'linkedin',
            label: 'LinkedIn',
            value: employeeData.linkedInUrl
          }] : []),
          {
            key: 'cardLink',
            label: 'My Card',
            value: `https://${employeeId}.mtdigitaltech.com`
          },
        ]
      },
      barcodes: [
        {
          format: 'PKBarcodeFormatQR',
          message: `https://${employeeId}.mtdigitaltech.com`,
          messageEncoding: 'iso-8859-1'
        }
      ]
    };

    // Initialize Pass
    const pass = new PKPass({
      'pass.json': Buffer.from(JSON.stringify(passJson))
    }, {
      wwdr: Buffer.from(APPLE_WWDR_CERT, 'base64'),
      signerCert: Buffer.from(APPLE_SIGNER_CERT, 'base64'),
      signerKey: Buffer.from(APPLE_SIGNER_KEY, 'base64')
    });

    try {
      const iconPath = path.join(process.cwd(), 'public', 'Logo.png');
      const iconBuffer = fs.readFileSync(iconPath);
      pass.addBuffer('icon.png', iconBuffer);
      pass.addBuffer('icon@2x.png', iconBuffer);
      pass.addBuffer('logo.png', iconBuffer);
      pass.addBuffer('logo@2x.png', iconBuffer);
    } catch (err) {
      console.warn('Could not add image buffers to pass:', err);
    }

    const buffer = pass.getAsBuffer();

    const lastModified = passData.updated_at
      ? new Date(passData.updated_at).toUTCString()
      : new Date().toUTCString();

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="${serialNumber}.pkpass"`,
        'Last-Modified': lastModified,
      },
      status: 200,
    });

  } catch (error) {
    console.error('Error generating latest pass:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
