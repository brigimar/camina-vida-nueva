export const dynamic = 'force-dynamic';

import { Inscripcion } from '@/types';
import InscripcionForm from '../../components/InscripcionForm';

interface EditProps {
  params: { id: string };
}

export default async function InscripcionesEdit({ params }: EditProps) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const res = await fetch(`${baseUrl}/api/inscripciones/${id}`, { cache: 'no-store' });
  const data = await res.json();
  const ins: Inscripcion = data?.data ?? data;

  if (!ins) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Inscripción</h1>
      <InscripcionForm initialData={ins} inscripcionId={id} />
    </div>
  );
}
