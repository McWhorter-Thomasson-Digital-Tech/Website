export interface BusinessCardData {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  department?: string;
  email: string;
  phoneMobile: string;
  phoneOffice?: string;
  linkedInUrl?: string;
  profileImageUrl: string;
  companyName: string;
  companyWebsite: string;
}

export interface WalletPassData extends BusinessCardData {
  passBackgroundColor: string; // Valid Hex code
  passTextColor: string;       // Valid Hex code
  logoImageUrl: string;        // URL to a high-res transparent PNG
  stripImageUrl?: string;      // URL to a 375x123px banner image for Apple Wallet
}
