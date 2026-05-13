export interface BusinessCardPreferences {
  online_card?: {
    theme?: 'light' | 'dark' | 'system';
    accent_color?: string;
    layout?: 'modern' | 'classic';
    [key: string]: any;
  };
  wallet_card?: {
    show_qr_code?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

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
  preferences?: BusinessCardPreferences;
}

export interface WalletPassData extends BusinessCardData {
  passBackgroundColor: string; // Valid Hex code
  passTextColor: string;       // Valid Hex code
  logoImageUrl: string;        // URL to a high-res transparent PNG
  stripImageUrl?: string;      // URL to a 375x123px banner image for Apple Wallet
}
