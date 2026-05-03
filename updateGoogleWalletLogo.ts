// update-logo.ts
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config(); // Fallback to .env if .env.local doesn't exist

async function updateWalletPassLogo() {
  // 1. Grab your target variables from the command line
  const args = process.argv.slice(2);
  const employeeId = args[0];
  const newLogoUrl = args[1];

  if (!employeeId || !newLogoUrl) {
    console.error('❌ Error: Missing arguments.');
    console.log('Usage: npx tsx updateGoogleWalletLogo.ts <employeeId> <newLogoUrl>');
    // npx tsx updateGoogleWalletLogo.ts graham-thomasson https://mtdigitaltech.com/Logo.png
    process.exit(1);
  }

  console.log(`⏳ Authenticating to update pass for: ${employeeId}...`);

  try {
    // 2. Safely parse environment variables
    const {
      GOOGLE_CREDENTIALS,
      GOOGLE_ISSUER_ID,
      GOOGLE_CLASS_ID,
    } = process.env;

    if (!GOOGLE_CREDENTIALS || !GOOGLE_ISSUER_ID || !GOOGLE_CLASS_ID) {
      throw new Error('Missing Google environment variables in .env file.');
    }

    // Parse the Google Credentials JSON
    const credentials = JSON.parse(Buffer.from(GOOGLE_CREDENTIALS, 'base64').toString('utf-8'));

    // Construct the Generic Object for the Google Wallet Pass
    const objectId = `${GOOGLE_ISSUER_ID}.${employeeId}`;
    const classId = `${GOOGLE_ISSUER_ID}.${GOOGLE_CLASS_ID}`;

    // 3. Initialize the Google Auth Client
    const client = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
    });


    // 4. Target the specific object ID
    const apiUrl = `https://walletobjects.googleapis.com/walletobjects/v1/genericObject/${objectId}`;

    // 5. Send the PATCH request
    console.log(`🚀 Sending PATCH request to Google Wallet API...`);
    const response = await client.request({
      url: apiUrl,
      method: 'PATCH',
      data: {
        logo: {
          sourceUri: {
            uri: newLogoUrl
          }
        }
      }
    });

    console.log('✅ Success! The pass has been updated.');
    console.log(`📱 Check the wallet on your phone to see the new logo for ${employeeId}.`);

  } catch (error: any) {
    console.error('❌ Failed to update Google Wallet pass.');
    if (error.response && error.response.data) {
      console.error('Google API Error Details:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

updateWalletPassLogo();