import { NextResponse } from 'next/server';
import { mockBusinessCards } from '@/data/mockBusinessCards';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  try {
    const { employeeId } = await params;
    const employeeData = mockBusinessCards[employeeId];

    if (!employeeData) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    const {
      GOOGLE_CREDENTIALS,
      GOOGLE_ISSUER_ID,
      GOOGLE_CLASS_ID,
    } = process.env;

    if (!GOOGLE_CREDENTIALS || !GOOGLE_ISSUER_ID || !GOOGLE_CLASS_ID) {
      console.error('Missing Google Wallet Credentials in environment variables.');
      return NextResponse.json({ error: 'Google Wallet integration is not fully configured.' }, { status: 500 });
    }

    // Parse the Google Credentials JSON
    const credentials = JSON.parse(Buffer.from(GOOGLE_CREDENTIALS, 'base64').toString('utf-8'));

    // Construct the Generic Object for the Google Wallet Pass
    const objectId = `${GOOGLE_ISSUER_ID}.${employeeId}`;
    const classId = `${GOOGLE_ISSUER_ID}.${GOOGLE_CLASS_ID}`;

    const genericObject = {
      id: objectId,
      classId: classId,
      genericType: 'GENERIC_TYPE_UNSPECIFIED',
      hexBackgroundColor: employeeData.passBackgroundColor || '#0f172a',
      logo: {
        sourceUri: {
          uri: `https://mtdigitaltech.com${employeeData.logoImageUrl}?t=${Date.now()}`
        }
      },
      cardTitle: {
        defaultValue: {
          language: 'en',
          value: `${employeeData.firstName} ${employeeData.lastName}`
        }
      },
      header: {
        defaultValue: {
          language: 'en',
          value: employeeData.title
        }
      },
      barcode: {
        type: 'QR_CODE',
        value: `https://mtdigitaltech.com/business-cards/${employeeId}`
      },
      textModulesData: [
        {
          header: 'Phone',
          body: employeeData.phoneMobile,
          id: 'phone'
        },
        {
          header: 'Email',
          body: employeeData.email,
          id: 'email'
        }
      ]
    };

    // Construct the JWT claims
    const claims = {
      iss: credentials.client_email,
      aud: 'google',
      origins: ['https://mtdigitaltech.com'], // Replace with actual production domain
      typ: 'savetowallet',
      payload: {
        genericObjects: [genericObject]
      }
    };

    // Sign the JWT
    const token = jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' });

    // Construct the Save to Google Wallet URL
    const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

    // Redirect the user to the Save to Google Pay URL
    return NextResponse.redirect(saveUrl);

  } catch (error) {
    console.error('Error generating Google Wallet Pass:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
