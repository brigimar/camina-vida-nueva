import { createSupabaseServer } from "../supabaseServer";

export async function requireUser() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    throw { message: "Unauthorized", status: 401 };
  }
  return data.user;
}

export async function requireRole(allowed: string[]) {
  const user = await requireUser();
  const role = (user?.app_metadata as any)?.role;
  if (!role || !allowed.includes(role)) {
    throw { message: "Forbidden", status: 403 };
  }
  return user;
}
