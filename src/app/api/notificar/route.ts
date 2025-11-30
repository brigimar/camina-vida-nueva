import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ success: false, error: 'Falta el ID del inscripto' }, { status: 400 });
    }

    const { error } = await supabase
      .from('inscripciones')
      .update({ notificado_director: true })
      .eq('id', id);

    if (error) {
      console.error('❌ Error al actualizar notificado_director:', error);
      return Response.json({ success: false, error: 'Error al actualizar notificación' }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('🔥 Error inesperado en /api/notificar:', err);
    return Response.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
