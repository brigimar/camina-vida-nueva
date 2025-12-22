import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase";
import { getAlertas } from "@/services/alertas.service";

export async function GET(req: Request) {
  const supabase = await createSupabaseServer();

  // Obtener perfil del usuario
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("rol, coordinador_id")
    .single();

  if (profileError || !profile) {
    return NextResponse.json(
      { error: "Perfil no encontrado" },
      { status: 401 },
    );
  }

  const { rol, coordinador_id } = profile;

  // Roles permitidos
  const rolesPermitidos = ["admin", "coordinador", "atencion"];

  if (!rolesPermitidos.includes(rol)) {
    return NextResponse.json([], { status: 200 });
  }

  // Leer query params
  const { searchParams } = new URL(req.url);

  const activas = searchParams.get("activas") !== "false"; // default true
  const tipo = searchParams.get("tipo") ?? undefined;
  const severidad = searchParams.get("severidad") ?? undefined;
  const circuitoId = searchParams.get("circuito_id") ?? undefined;

  try {
    const data = await getAlertas({
      rol,
      coordinadorId: coordinador_id,
      activas,
      tipo,
      severidad,
      circuitoId,
    });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=600, stale-while-revalidate=120",
      },
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
