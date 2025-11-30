import { createClient } from '@supabase/supabase-mjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getDashboardKPIs() {
  const [{ data: circuitos }, { data: inscriptos }] = await Promise.all([
    supabase.from('vista_circuitos_completa').select('id, estado, cupo_restante'),
    supabase.from('inscripciones').select('id')
  ]);

  const totalInscriptos = inscriptos?.length || 0;
  const circuitosActivos = circuitos?.filter(c => c.estado)?.length || 0;
  const cuposDisponibles = circuitos?.reduce((acc, c) => acc + (c.cupo_restante || 0), 0) || 0;

  return { totalInscriptos, circuitosActivos, cuposDisponibles };
}
