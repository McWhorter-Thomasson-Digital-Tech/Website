import { NextResponse } from 'next/server';
import { mockBusinessCards } from '@/data/mockBusinessCards';
import { PKPass } from 'passkit-generator';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  try {
    const { employeeId } = await params;
    const employeeData = mockBusinessCards[employeeId];

    if (!employeeData) {
      return new NextResponse('Employee not found', { status: 404 });
    }

    // Verify required environment variables
    const {
      APPLE_WWDR_CERT,
      APPLE_SIGNER_CERT,
      APPLE_SIGNER_KEY,
      APPLE_PASS_TEAM_IDENTIFIER,
      APPLE_PASS_TYPE_IDENTIFIER,
    } = process.env;

    // app/api/apple-wallet/[employeeId]/route.ts

    // The regex /\\n/g finds the literal string "\n" and replaces it with an actual newline character

    if (!APPLE_WWDR_CERT || !APPLE_SIGNER_CERT || !APPLE_SIGNER_KEY) {
      // Return a 500 but log detailed error for the developer
      console.error('Missing Apple Wallet Certificates in environment variables.');
      return new NextResponse('Apple Wallet integration is not fully configured.', { status: 500 });
    }

    // Reuse existing auth token if the pass already exists in DB, otherwise generate a new one.
    // Regenerating on every download would invalidate tokens already embedded in installed passes,
    // causing "Authentication failure" on register/unregister calls from the device.
    const serialNumber = `card-${employeeId}`;
    const webServiceURL = `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'mtdigitaltech.com'}/api/apple-wallet/`;

    let authenticationToken: string;
    const { data: existingPass } = await supabase
      .from('wallet_passes')
      .select('authentication_token')
      .eq('serial_number', serialNumber)
      .single();

    if (existingPass?.authentication_token) {
      authenticationToken = existingPass.authentication_token;
    } else {
      authenticationToken = crypto.randomUUID().replace(/-/g, '');
    }

    // Build the pass.json payload
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: APPLE_PASS_TYPE_IDENTIFIER || 'pass.com.mtdigitaltech.businesscard',
      serialNumber,
      teamIdentifier: APPLE_PASS_TEAM_IDENTIFIER || 'TEAMID1234',
      webServiceURL,
      authenticationToken,
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

    // Store the pass details in Supabase
    try {
      await supabase
        .from('wallet_passes')
        .upsert({
          serial_number: serialNumber,
          authentication_token: authenticationToken,
          updated_at: new Date().toISOString()
        });
    } catch (dbError) {
      console.error('Failed to store wallet pass in Supabase:', dbError);
      // We continue since the pass itself was generated successfully
    }

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="wallet-${employeeId}.pkpass"`,
      },
    });

  } catch (error) {
    console.error('Error generating Apple Wallet Pass:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

