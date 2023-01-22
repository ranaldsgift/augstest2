import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

let SUPABASE_URL = env.PUBLIC_SUPABASE_URL;
let SUPABASE_KEY = env.PUBLIC_SUPABASE_ANON_KEY;

if (process.env.NODE_ENV === 'production' && process.env.PUBLIC_SUPABASE_URL && process.env.PUBLIC_SUPABASE_ANON_KEY) {
    SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
    SUPABASE_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);