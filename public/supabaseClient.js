import { createClient } from '@supabase/supabase-js';

// Access the environment variables with the PARCEL_ prefix
const SUPABASE_URL = process.env.PARCEL_SUPABASE_URL;
const SUPABASE_KEY = process.env.PARCEL_SUPABASE_KEY;

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
