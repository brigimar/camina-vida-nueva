import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase";

export async function GET() {
  const supabase = await createSupabaseServer();

  // Consulta directa a la vista materializada
  const { data, error } = await supabase.from("vm_caminatas_hoy").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Cache-control: refresco cada 15 min
  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=900, stale-while-revalidate=60",
    },
  });
}
