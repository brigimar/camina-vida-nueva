import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";
import { ok, errorResponse, unauthorized } from "@/lib/utils/respuesta";
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

    // ✅ Parámetros
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const offset = (page - 1) * limit;

    const q = searchParams.get("q");
    const localidad = searchParams.get("localidad");
    const dificultad = searchParams.get("dificultad");
    const activo = searchParams.get("activo");
    const dia = searchParams.get("dia");
    const sort = searchParams.get("sort") ?? "nombre";
    const order = searchParams.get("order") ?? "asc";

    let query = supabase
      .from("circuitos")
      .select("*", { count: "exact" })
      .order(sort, { ascending: order === "asc" })
      .range(offset, offset + limit - 1);

    // ✅ Búsqueda
    if (q) {
      query = query.or(
        `nombre.ilike.%${q}%,descripcion.ilike.%${q}%,localidad.ilike.%${q}%,punto_encuentro.ilike.%${q}%`
      );
    }

    // ✅ Filtros
    if (localidad) query = query.eq("localidad", localidad);
    if (dificultad) query = query.eq("dificultad", dificultad);
    if (activo) query = query.eq("activo", activo === "true");
    if (dia) query = query.contains("dias", [dia]);

    const { data, count, error } = await query;

    if (error) throw error;

    return ok({ data, pagination: { page, limit, total: count, pages: Math.ceil((count || 0) / limit) } });
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

    const { data, error } = await supabase.from("circuitos").insert(payload).select().single();
    if (error) throw error;

    return ok(data, 201);
  } catch (e) {
    return errorResponse(e);
  }
}

