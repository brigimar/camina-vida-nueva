import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();

  const { error } = await supabase
    .from('circuitos')
    .update({
      nombre: body.nombre,
      localidad: body.localidad,
      dias: body.dias,
    })
    .eq('id', body.id);

  return new Response(JSON.stringify({ ok: !error }), {
    status: error ? 500 : 200,
  });
}
