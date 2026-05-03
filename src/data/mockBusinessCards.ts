import { WalletPassData } from '../types/businessCard';

export const mockBusinessCards: Record<string, WalletPassData> = {
  'matthew-mcwhorter': {
    id: 'matthew-mcwhorter',
    firstName: 'Matthew',
    lastName: 'McWhorter',
    title: 'Co-Founder',
    email: 'matt@mtdigitaltech.com',
    phoneMobile: '+17042540084',
    linkedInUrl: 'https://www.linkedin.com/in/matthewmcw/',
    profileImageUrl: '/Logo.png', // Fallback as no headshot provided
    companyName: 'McWhorter-Thomasson Digital Technologies',
    companyWebsite: 'https://mtdigitaltech.com',
    passBackgroundColor: '#0f172a',
    passTextColor: '#ffffff',
    logoImageUrl: '/Logo_Clear_Center_smaller.png',
  },
  'graham-thomasson': {
    id: 'graham-thomasson',
    firstName: 'Graham',
    lastName: 'Thomasson',
    title: 'Co-Founder',
    email: 'graham@mtdigitaltech.com',
    phoneMobile: '+17578053097',
    linkedInUrl: 'https://www.linkedin.com/in/graham-thomasson-933341302/',
    profileImageUrl: '/Logo.png', // Fallback as no headshot provided
    companyName: 'McWhorter-Thomasson Digital Technologies',
    companyWebsite: 'https://mtdigitaltech.com',
    passBackgroundColor: '#0f172a',
    passTextColor: '#ffffff',
    logoImageUrl: '/Logo_Clear_Center_smaller.png',
  }
};

