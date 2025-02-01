/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_PRODUCTION_URL: string;
  readonly VITE_SUPABASE_PRODUCTION_ANON_KEY: string;
  readonly VITE_SUPABASE_TESTING_URL: string;
  readonly VITE_SUPABASE_TESTING_ANON_KEY: string;
  readonly VITE_RESEND_API_KEY: string;
  readonly VITE_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
