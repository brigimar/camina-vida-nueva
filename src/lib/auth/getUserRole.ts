import { createSupabaseServer } from "../supabaseServer";

export async function getUserRole(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");

  const supabase = await createSupabaseServer();

  const { data } = await supabase.auth.getUser(token as any);

  return data.user?.app_metadata?.role || "viewer";
}
