import { createBrowserClient } from "@supabase/ssr";

/**
 * Crea un cliente de Supabase para uso exclusivamente en Client Components.
 * 
 * ⚠️ IMPORTANTE:
 * - Solo use en Client Components (con "use client")
 * - NUNCA use en Server Components o Route Handlers
 * - NO maneja cookies automáticamente
 * - Use para operaciones del lado del cliente (fetch, storage, etc.)
 * 
 * Uso en Client Component:
 *   const supabase = createSupabaseBrowser();
 *   const { data } = await supabase.from("table").select();
 */
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
