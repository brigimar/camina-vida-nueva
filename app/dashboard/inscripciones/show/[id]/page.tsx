export const dynamic = 'force-dynamic';

import { Inscripcion } from '@/types';
import { createSupabaseServer } from '@/lib/supabaseServer';

interface Props {
  params: { id: string };
}

export default async function InscripcionesShow({ params }: Props) {
  const { id } = params;

  const supabase = await createSupabaseServer();

  // ✅ Fetch seguro (sin throw)
  const res = await supabase
    .from('inscripciones')
    .select('*, sesiones(*, circuitos(nombre))')
    .eq('id', id)
    .single();

  if (res.error) {
    console.error('❌ Supabase error (inscripción):', res.error);
  }

  const ins: any =
    res.data && typeof res.data === 'object' ? res.data : null;

  // ✅ Si no existe, no romper SSR
  if (!ins || !ins.id) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Inscripción</h1>
        <p className="text-red-600">No se encontró la inscripción.</p>
      </div>
    );
  }

  const circuito = ins.sesiones?.circuitos ?? null;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Inscripción</h1>

      <p>
        <strong>Nombre:</strong> {ins.nombre}
      </p>

      <p>
        <strong>Email:</strong> {ins.email}
      </p>

      <p>
        <strong>WhatsApp:</strong> {ins.whatsapp || '—'}
      </p>

      <p className="mt-4">
        <strong>Circuito:</strong> {circuito?.nombre || '—'}
      </p>

      <p>
        <strong>Sesión:</strong>{' '}
        {ins.sesiones?.fecha
          ? new Date(ins.sesiones.fecha).toLocaleDateString()
          : '—'}
      </p>

      <p className="mt-4">
        <strong>Estado:</strong> {ins.estado}
      </p>
    </div>
  );
}
