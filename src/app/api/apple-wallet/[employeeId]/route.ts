import { NextResponse } from 'next/server';
import { mockBusinessCards } from '@/data/mockBusinessCards';
import { PKPass } from 'passkit-generator';
import fs from 'fs';
import path from 'path';

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

    // Build the pass.json payload
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: APPLE_PASS_TYPE_IDENTIFIER || 'pass.com.mtdigitaltech.businesscard',
      serialNumber: `card-${employeeId}`,
      teamIdentifier: APPLE_PASS_TEAM_IDENTIFIER || 'TEAMID1234',
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
          }] : [])
        ]
      },
      barcodes: [
        {
          format: 'PKBarcodeFormatQR',
          message: `https://mtdigitaltech.com/business-cards/${employeeId}`,
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

