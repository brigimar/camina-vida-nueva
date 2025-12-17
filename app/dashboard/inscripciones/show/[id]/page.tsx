export const dynamic = 'force-dynamic';

import { Inscripcion, Circuito } from '@/types';
import Image from 'next/image';

interface Props {
  params: { id: string };
}

export default async function InscripcionesShow({ params }: Props) {
  const { id } = params;
  const supabase = await (await import('@/lib/supabaseServer')).createSupabaseServer();

  // Fetch inscripción con join correcto: inscripciones -> sesiones -> circuitos
  const res = await supabase
    .from('inscripciones')
    .select('*, sesiones(*, circuitos(nombre))')
    .eq('id', id)
    .single();
  if (res.error) throw new Error(res.error.message);
  const ins: any = res.data;
  if (!ins) throw new Error('Inscripción no encontrada');

  // Acceso a circuito a través del join
  const circuito = ins.sesiones?.circuitos ?? null;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Inscripción</h1>

      <p><strong>Nombre:</strong> {ins.nombre} {ins.apellido}</p>
      <p><strong>Email:</strong> {ins.email}</p>
      <p><strong>WhatsApp:</strong> {ins.whatsapp || '—'}</p>

      <p className="mt-4">
        <strong>Circuito:</strong> {circuito?.nombre || '—'}
      </p>

      <p><strong>Sesión:</strong> {ins.sesiones?.fecha || '—'}</p>

      <p className="mt-4">
        <strong>Estado:</strong> {ins.estado}
      </p>
    </div>
  );
}
