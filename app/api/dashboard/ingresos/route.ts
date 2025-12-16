import { NextResponse } from "next/server";
import { getIngresos } from "@/services/ingresos.service";
import { createSupabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const supabase = await createSupabaseServer();

  // Obtener rol del usuario
  const { data: profile } = await supabase
    .from("profiles")
    .select("rol")
    .single();

  // Solo admin y contabilidad pueden ver ingresos
  if (!profile || !["admin", "contabilidad"].includes(profile.rol)) {
    return NextResponse.json([], { status: 200 });
  }

  // Leer query param ?mes=YYYY-MM
  const { searchParams } = new URL(req.url);
  const mes = searchParams.get("mes") ?? undefined;

  try {
    const data = await getIngresos({ mes });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=300",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
