import { createClient } from '@supabase/supabase-js';

// Access the environment variables with the PARCEL_ prefix
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
