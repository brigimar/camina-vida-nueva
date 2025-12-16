import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";
import { getOperacion } from "@/services/operacion.service";

export async function GET() {
  const supabase = await createSupabaseServer();

  // Obtener perfil del usuario
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("rol, coordinador_id")
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Perfil no encontrado" }, { status: 401 });
  }

  const { rol, coordinador_id } = profile;

  // Roles permitidos
  const rolesPermitidos = ["admin", "coordinador", "atencion"];

  if (!rolesPermitidos.includes(rol)) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const data = await getOperacion(rol, coordinador_id);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=900, stale-while-revalidate=120",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
