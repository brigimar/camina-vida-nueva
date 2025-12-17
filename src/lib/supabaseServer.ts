import { createServerClient as createServerClientFromSupabase } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Crea un cliente de Supabase para uso en Server Components y Route Handlers.
 * Soporta lectura y actualización de cookies de sesión.
 * 
 * ⚠️ IMPORTANTE:
 * - Solo use en Server Components o Route Handlers
 * - No use en Client Components
 * - Las cookies se manejan automáticamente por Supabase
 * - No modifique cookies manualmente
 * 
 * Uso en Server Component:
 *   const supabase = await createSupabaseServer();
 *   const { data: { user } } = await supabase.auth.getUser();
 * 
 * Uso en Route Handler:
 *   const supabase = await createSupabaseServer();
 *   const { data } = await supabase.from("table").select();
 */
export async function createSupabaseServer() {
  try {
    const cookieStore = await cookies();

    return createServerClientFromSupabase(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            // Only allow reading cookies here. Mutating cookies must happen
            // inside Route Handlers or Server Actions.
            return cookieStore.getAll();
          },
          // Intentionally no-op for set/remove to avoid accidental cookie
          // modifications from generic server code. Use explicit handlers in
          // Route Handlers when you need to set cookies.
          set() {
            /* no-op */
          },
          remove() {
            /* no-op */
          },
        },
      }
    );
  } catch (e) {
    console.error("❌ createSupabaseServer error:", e);

    // Fallback: Create anonymous client without cookies
    return createServerClientFromSupabase(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return [];
          },
          set() {
            /* no-op */
          },
          remove() {
            /* no-op */
          },
        },
      }
    );
  }
}

/**
 * Cliente Supabase para lectura solo en contextos especiales.
 * Prefer createSupabaseServer() para acceso a cookies.
 */
export async function createSupabaseServerReadOnly() {
  const cookieStore = await cookies();
  return createServerClientFromSupabase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        set() {
          /* no-op */
        },
        remove() {
          /* no-op */
        },
      },
    }
  );
}
