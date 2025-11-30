import { NextResponse } from "next/server";

function normalizeArray(value: any) {
  if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map(s => s.trim()).filter(Boolean);
  return [];
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ ahora se espera la Promise

  if (!id) {
    return NextResponse.json({ error: "Falta el ID del circuito" }, { status: 400 });
  }

  try {
    const url = `${process.env.SUPABASE_URL}/rest/v1/vista_circuitos_completa?circuito_id=eq.${encodeURIComponent(id)}`;

    const supabaseRes = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        "Content-Type": "application/json",
      },
    });

    if (!supabaseRes.ok) {
      console.error("❌ Supabase error:", supabaseRes.status, await supabaseRes.text());
      return NextResponse.json({ error: "Error al consultar Supabase" }, { status: 502 });
    }

    const resultados = await supabaseRes.json();
    const circuito = Array.isArray(resultados) ? resultados[0] : null;

    if (!circuito) {
      return NextResponse.json({ error: "Circuito no encontrado" }, { status: 404 });
    }

    const opciones_dia = normalizeArray(circuito.Dias);
    const opciones_horario = normalizeArray(circuito.Horarios);

    return NextResponse.json({
      circuito,
      opciones_dia,
      opciones_horario,
    });
  } catch (error) {
    console.error("🚨 Error en /api/caminatas/[id]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
