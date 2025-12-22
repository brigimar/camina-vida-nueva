import { createSupabaseServer } from "@/lib/supabase";

export async function getIngresos({ mes }: { mes?: string }) {
  const supabase = createSupabaseServer();

  let query = supabase.from("vm_ingresos_por_circuito_mes").select("*");

  if (mes) {
    query = query.eq("mes", mes);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}
