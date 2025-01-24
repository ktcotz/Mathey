import { createClient } from '@supabase/supabase-js';

const url =
  import.meta.env.VITE_MODE === 'testing'
    ? import.meta.env.VITE_SUPABASE_TESTING_URL
    : import.meta.env.VITE_SUPABASE_PRODUCTION_URL;

const anon_key =
  import.meta.env.VITE_MODE === 'testing'
    ? import.meta.env.VITE_SUPABASE_TESTING_ANON_KEY
    : import.meta.env.VITE_SUPABASE_PRODUCTION_ANON_KEY;

export const supabase = createClient(url, anon_key);
