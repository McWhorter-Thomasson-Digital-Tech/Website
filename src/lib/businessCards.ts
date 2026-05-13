import { supabase } from './supabase';
import { WalletPassData } from '../types/businessCard';
import { mockBusinessCards } from '../data/mockBusinessCards';

export async function getBusinessCard(id: string): Promise<WalletPassData | null> {
  try {
    const { data, error } = await supabase
      .from('business_cards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`[businessCards] Error fetching card ${id} from Supabase:`, error);
      // Fallback to mock data if database fetch fails
      return mockBusinessCards[id] || null;
    }

    if (!data) {
      return mockBusinessCards[id] || null;
    }

    // Map database snake_case fields to TypeScript camelCase interface
    const card: WalletPassData = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      title: data.title,
      department: data.department || undefined,
      email: data.email,
      phoneMobile: data.phone_mobile,
      phoneOffice: data.phone_office || undefined,
      linkedInUrl: data.linkedin_url || undefined,
      profileImageUrl: data.profile_image_url,
      companyName: data.company_name,
      companyWebsite: data.company_website,
      passBackgroundColor: data.wallet_pass_bg_color,
      passTextColor: data.wallet_pass_text_color,
      logoImageUrl: data.logo_image_url,
      stripImageUrl: data.strip_image_url || undefined,
      preferences: data.preferences,
    };

    return card;
  } catch (e) {
    console.error(`[businessCards] Unexpected error fetching card ${id}:`, e);
    return mockBusinessCards[id] || null;
  }
}
