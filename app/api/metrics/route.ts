import { createSupabaseServer } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, categoria, count = 1, source = "web", circuito_id } = body;

    const supabase = await createSupabaseServer();

    // ✅ Insertar métrica en tabla
    const res = await supabase.from("metrics_circuitos").insert([
      {
        type,
        categoria: categoria || null,
        circuito_id: circuito_id || null,
        count,
        source,
        created_at: new Date().toISOString(),
      },
    ]);

    if (res.error) {
      console.error("Error inserting metric:", res.error);
      return new Response(JSON.stringify({ error: res.error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data: res.data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Metrics API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
