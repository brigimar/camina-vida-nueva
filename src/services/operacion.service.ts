import { createSupabaseServer } from "@/lib/supabaseServer";

export async function getOperacion(rol: string, coordinadorId?: string) {
  const supabase = await createSupabaseServer();

  let query = supabase
    .from("vm_caminatas_hoy")
    .select("*");

  // Coordinador: solo sus sesiones
  if (rol === "coordinador" && coordinadorId) {
    query = query.eq("coordinador_id", coordinadorId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}
