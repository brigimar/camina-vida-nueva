import { createSupabaseServer } from "@/lib/supabase";

export async function getUserRole(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");

  const supabase = await createSupabaseServer();

  const { data } = await supabase.auth.getUser(token);

  if (!data.user) return null;

  const appMetadata = data.user.app_metadata as
    | { role?: string }
    | null
    | undefined;
  return appMetadata?.role || "viewer";
}
