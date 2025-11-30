import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  const [{ data: circuitos, error: errorCirc }, { data: inscripciones, error: errorInsc }] = await Promise.all([
    supabase.from('vista_circuitos_completa').select('id, NombreCircuito, Localidad, cupo_restante'),
    supabase.from('inscripciones').select('id, nombre, dni, circuito_id, fecha')
  ]);

  if (errorCirc || errorInsc) {
    return new Response(
      JSON.stringify({
        error: {
          circuitos: errorCirc?.message || null,
          inscripciones: errorInsc?.message || null
        }
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      inscripciones: inscripciones || [],
      circuitos: circuitos || []
    }),
    { status: 200 }
  );
}
