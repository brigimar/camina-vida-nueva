export const dynamic = 'force-dynamic';

import SesionesListClient from './components/SesionesListClient';
import { Sesion, Circuito } from '@/types';
import { createSupabaseServer } from '@/lib/supabaseServer';

export default async function SesionesPage() {
  let initialSesiones: Sesion[] = [];
  let initialCircuitos: Circuito[] = [];
  try {
    const supabase = await createSupabaseServer();
    const sRes = await supabase.from('sesiones').select('*').limit(200);
    if (sRes.error) throw sRes.error;
    initialSesiones = sRes.data ?? [];

    const cRes = await supabase.from('circuitos').select('*').limit(200);
    if (cRes.error) throw cRes.error;
    initialCircuitos = cRes.data ?? [];
  } catch (err) {
    console.error('Error fetching sesiones/circuitos:', err);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sesiones</h1>

        <a href="/dashboard/sesiones/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Crear sesión</a>
      </div>

      <SesionesListClient initialSesiones={initialSesiones} initialCircuitos={initialCircuitos} />
    </div>
  );
}
