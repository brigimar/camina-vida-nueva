import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para navegador.
 * Usar solo en flows de auth (login/logout/perfil).
 */
export function getBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
