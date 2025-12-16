import { createSupabaseServer } from "@/lib/supabaseServer";

export async function getAlertas({
  rol,
  coordinadorId,
  activas = true,
  tipo,
  severidad,
  circuitoId
}: {
  rol: string;
  coordinadorId?: string;
  activas?: boolean;
  tipo?: string;
  severidad?: string;
  circuitoId?: string;
}) {
  const supabase = await createSupabaseServer();

  let query = supabase
    .from("alertas")
    .select("*")
    .order("created_at", { ascending: false });

  // Filtrar por estado (activas por defecto)
  if (activas) query = query.eq("activa", true);

  // Filtros opcionales
  if (tipo) query = query.eq("tipo", tipo);
  if (severidad) query = query.eq("severidad", severidad);
  if (circuitoId) query = query.eq("circuito_id", circuitoId);

  // Coordinador: solo alertas de sus sesiones
  if (rol === "coordinador" && coordinadorId) {
    query = query.eq("coordinador_id", coordinadorId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}
