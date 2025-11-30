import supabase from '@/lib/supabase';
import { getCircuitos } from '@/lib/notion';

export async function GET() {
  try {
    // 1. Obtener circuitos desde Supabase
    const { data: circuitosSupabase, error: supabaseError } = await supabase
      .from('circuitos')
      .select('*');

    if (supabaseError) throw new Error(supabaseError.message);

    // 2. Obtener circuitos enriquecidos desde Notion
    const circuitosNotion = await getCircuitos();
    if (!Array.isArray(circuitosNotion)) throw new Error('No se pudo obtener datos desde Notion');

    // 3. Fusionar ambos conjuntos
    const fusionados = circuitosSupabase.map(c => {
      const extra = circuitosNotion.find(n => n.nombre === c.nombre);

      return {
        id: c.id,
        nombre: c.nombre,
        horario: c.horario,
        cupoActual: c.cupoActual || 0,
        localidad: extra?.localidad || null,
        estado: extra?.estado || null,
        dias: extra?.dias || null,
        descripcion: extra?.descripcion || null,
        alias: extra?.alias || null,
        distancia: extra?.distancia || null,
        foto: extra?.foto || null,
        url: extra?.url || null,
      };
    });

    // 4. Devolver respuesta
    return new Response(JSON.stringify({ success: true, data: fusionados }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
