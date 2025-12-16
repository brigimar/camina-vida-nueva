export const dynamic = 'force-dynamic';

import { Inscripcion, Circuito } from '@/types';
import Image from 'next/image';

interface Props {
  params: { id: string };
}

export default async function InscripcionesShow({ params }: Props) {
  const { id } = params;
  const supabase = await (await import('@/lib/supabaseServer')).createSupabaseServer();

  const res = await supabase.from('inscripciones').select('*').eq('id', id).single();
  if (res.error) throw new Error(res.error.message);
  const ins: Inscripcion = res.data;
  if (!ins) throw new Error('Inscripción no encontrada');

  const cRes = await supabase.from('circuitos').select('*').eq('id', ins.circuito_id).single();
  if (cRes.error) throw new Error(cRes.error.message);
  const circuito: Circuito = cRes.data;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Inscripción</h1>

      <p><strong>Nombre:</strong> {ins.nombre} {ins.apellido}</p>
      <p><strong>Email:</strong> {ins.email}</p>
      <p><strong>Teléfono:</strong> {ins.telefono || '—'}</p>

      <p className="mt-4">
        <strong>Circuito:</strong> {circuito?.nombre || '—'}
      </p>

      <p><strong>Fecha:</strong> {new Date(ins.fecha).toLocaleString()}</p>

      <p className="mt-4">
        <strong>Estado:</strong> {ins.estado}
      </p>
    </div>
  );
}
