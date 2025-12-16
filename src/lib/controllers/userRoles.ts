import { createSupabaseServer } from "@/lib/supabaseServer";
import { z } from "zod";

export const userRoleSchema = z.object({
  user_id: z.string().uuid(),
  role: z.enum(["admin", "coordinador", "usuario", "contabilidad", "atencion"]),
  estado: z.string().optional(),
});

export async function updateUserRole(id: string, payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = userRoleSchema.partial().parse(payload);

  // ✅ 1. Obtener el rol anterior
  const { data: oldData } = await supabase
    .from("user_roles")
    .select("*")
    .eq("id", id)
    .single();

  const oldRole = oldData?.role;

  // ✅ 2. Actualizar el rol
  const { data, error } = await supabase
    .from("user_roles")
    .update({
      ...parsed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  // ✅ 3. Sincronizar con app_metadata
  if (parsed.role) {
    await supabase.auth.admin.updateUserById(data.user_id, {
      app_metadata: { role: parsed.role },
    });
  }

  // ✅ 4. Registrar auditoría
  if (parsed.role && parsed.role !== oldRole) {
    const { data: session } = await supabase.auth.getUser();

    if (session?.user?.id) {
      await supabase.from("role_audit").insert({
        user_id: data.user_id,
        old_role: oldRole,
        new_role: parsed.role,
        changed_by: session.user.id,
      });
    }
  }

  return data;
}

export async function getUserRoles() {
  const supabase = await createSupabaseServer();
  
  const { data, error } = await supabase
    .from("user_roles")
    .select("*");
  
  if (error) throw error;
  
  return data;
}

export async function assignUserRole(payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = userRoleSchema.parse(payload);

  const { data, error } = await supabase
    .from("user_roles")
    .insert({
      ...parsed,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  // Sincronizar con app_metadata
  if (parsed.role) {
    await supabase.auth.admin.updateUserById(parsed.user_id, {
      app_metadata: { role: parsed.role },
    });
  }

  return data;
}

export async function deleteUserRole(id: string) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from("user_roles")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return { success: true };
}
