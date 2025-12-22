import { createSupabaseServer } from "@/lib/supabase";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import { circuitoSchema } from "@/lib/validators/circuitoSchema";
import { requireUser } from "@/lib/auth/authorize";

interface PostgrestError {
  message: string;
  code?: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const supabase = await createSupabaseServer();

    // ✅ Parámetros de paginación
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const offset = (page - 1) * limit;

    // ✅ Parámetros de búsqueda y filtros NUEVOS
    const q = searchParams.get("q");
    const categoria = searchParams.get("categoria");
    const barrio = searchParams.get("barrio");
    const sort = searchParams.get("sort") ?? "nombre";
    const order = searchParams.get("order") ?? "asc";

    let query = supabase
      .from("circuitos")
      .select("*, sesiones(*)", { count: "exact" })
      .eq("activo", true)
      .order(sort, { ascending: order === "asc" })
      .range(offset, offset + limit - 1);

    // ✅ Búsqueda por nombre/descripción/localidad/punto_encuentro
    if (q) {
      query = query.or(
        `nombre.ilike.%${q}%,descripcion.ilike.%${q}%,localidad.ilike.%${q}%,punto_encuentro.ilike.%${q}%`,
      );
    }

    // ✅ Filtros por categoría
    if (categoria) query = query.eq("categoria", categoria);

    // ✅ Filtros por barrio/localidad
    if (barrio) query = query.eq("barrio", barrio);

    // ✅ Nota: Los filtros de día y horario se aplican client-side en CircuitosListado
    // porque necesitan buscar dentro del array de sesiones

    const { data, count, error } = await query;

    if (error) throw error;

    return ok({
      data,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (e) {
    const error = e as PostgrestError;
    console.error("GET /api/circuitos error:", error);
    return errorResponse(error);
  }
}

export async function POST(req: Request) {
  try {
    await requireUser();
    const supabase = await createSupabaseServer();
    const body = await req.json();
    const payload = circuitoSchema.parse(body);

    const { data, error } = await supabase
      .from("circuitos")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;

    return ok(data, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
