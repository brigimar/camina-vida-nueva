//src\lib\supabase\client.ts
import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
  return createSupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
