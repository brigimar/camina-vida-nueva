import { createSupabaseServer } from "@/lib/supabaseServer";
import { ok, errorResponse } from "@/lib/utils/respuesta";

export async function GET() {
  try {
    const supabase = await createSupabaseServer();

    const { data: users, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;

    const { data: roles } = await supabase.from("user_roles").select("*");

    const merged = users.users.map((u) => ({
      id: u.id,
      email: u.email,
      role: roles?.find((r) => r.user_id === u.id)?.role || "sin rol",
    }));

    return ok(merged);
  } catch (e) {
    return errorResponse(e);
  }
}
