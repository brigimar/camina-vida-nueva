import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inscripciones')
      .select(`
        id,
        nombre,
        edad,
        whatsapp,
        localidad,
        fecha,
        estado,
        notificado_director,
        circuito_id,
        circuitos (
          id,
          NombreCircuito,
          Localidad
        )
      `)
      .order('fecha', { ascending: false });

    if (error) {
      return Response.json({ error: 'Error al obtener inscriptos' }, { status: 500 });
    }

    const inscriptos = data.map(i => {
      const circuitoNombre = i.circuitos?.NombreCircuito ?? '—';
      const mensaje = `Nuevo inscripto:\nNombre: ${i.nombre ?? '—'}\nEdad: ${i.edad ?? '—'}\nWhatsApp: ${i.whatsapp ?? '—'}\nCircuito: ${circuitoNombre}`;
      const enlaceWhatsApp = `https://wa.me/5491151501147?text=${encodeURIComponent(mensaje)}`;

      return {
        id: i.id,
        nombre: i.nombre ?? '—',
        edad: i.edad ?? null,
        whatsapp: i.whatsapp ?? '—',
        localidad: i.localidad ?? i.circuitos?.Localidad ?? '—',
        fecha: i.fecha,
        estado: i.estado ?? '—',
        circuito_id: i.circuito_id,
        circuitoNombre,
        enlaceWhatsApp,
        notificado_director: i.notificado_director ?? false
      };
    });

    return Response.json(inscriptos, { status: 200 });
  } catch (err) {
    console.error('❌ Error interno:', err);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
