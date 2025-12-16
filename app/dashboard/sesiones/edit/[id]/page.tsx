export const dynamic = 'force-dynamic';

import { Sesion } from '@/types';
import SesionForm from '../../components/SesionForm';

interface Props { params: { id: string } }

export default async function SesionesEdit({ params }: Props) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const res = await fetch(`${baseUrl}/api/sesiones/${id}`, { cache: 'no-store' });
  const data = await res.json();
  const sesion: Sesion = data?.data ?? data;

  if (!sesion) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Sesión</h1>
      <SesionForm initialData={sesion} sesionId={id} />
    </div>
  );
}
