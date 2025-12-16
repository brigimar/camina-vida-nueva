import { createSupabaseServer } from "@/lib/supabaseServer";
import { circuitoSchema } from "@/lib/validators/circuitoSchema";

// ✅ LISTAR CON FILTRO, PAGINACIÓN Y BÚSQUEDA
export async function getCircuitosAdvanced({
  page = 1,
  limit = 10,
  estado = "todos",
  search = "",
}) {
  const supabase = await createSupabaseServer();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("circuitos")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (estado === "activo") {
    query = query.eq("activo", true);
  }

  if (search) {
    query = query.or(
      `nombre.ilike.%${search}%,descripcion.ilike.%${search}%,localidad.ilike.%${search}%,punto_encuentro.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  return {
    data,
    total: count,
    page,
    limit,
    pages: Math.ceil((count || 0) / limit),
  };
}

// ✅ OBTENER UNO POR ID
export async function getCircuitoById(id: string) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("circuitos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ✅ CREAR CIRCUITO
export async function createCircuito(payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = circuitoSchema.parse(payload);

  const { data, error } = await supabase
    .from("circuitos")
    .insert(parsed)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ✅ ACTUALIZAR CIRCUITO
export async function updateCircuito(id: string, payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = circuitoSchema.partial().parse(payload);

  const { data, error } = await supabase
    .from("circuitos")
    .update({
      ...parsed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ✅ DELETE REAL (soft-delete + auditoría)
export async function deleteCircuito(id: string) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("circuitos")
    .update({
      estado: "inactivo",
      activo: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
