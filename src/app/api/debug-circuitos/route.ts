import { NextResponse } from 'next/server';
import { fetchCircuitosFromNotion } from '@/lib/notion';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: '❌ Variables de entorno faltantes' }, { status: 500 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const notionCircuitos = await fetchCircuitosFromNotion();

    const { data: supabaseCircuitos, error } = await supabase
      .from('vista_circuitos_completa')
      .select('*');

    if (error) {
      return NextResponse.json({ error: '❌ Error desde Supabase: ' + error.message }, { status: 500 });
    }

    // Detectar circuitos sin match
    const idsSupabase = new Set(supabaseCircuitos.map((s) => String(s.id)));
    const sinMatch = notionCircuitos.filter((n) => !idsSupabase.has(String(n.id)));

    return NextResponse.json({
      notion: notionCircuitos,
      supabase: supabaseCircuitos,
      sinMatch: sinMatch.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        localidad: c.localidad,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: '❌ Error inesperado: ' + err.message }, { status: 500 });
  }
}
