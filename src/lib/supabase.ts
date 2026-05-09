import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Use service role key if available, fallback to anon key
const supabaseKey = serviceKey || anonKey || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[supabase] Credentials missing:', { 
    hasUrl: !!supabaseUrl, 
    hasServiceKey: !!serviceKey, 
    hasAnonKey: !!anonKey 
  });
} else {
  console.log('[supabase] Initializing with:', {
    url: supabaseUrl,
    keyType: serviceKey ? 'SERVICE_ROLE' : 'ANON',
    keyLength: supabaseKey.length
  });
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);
