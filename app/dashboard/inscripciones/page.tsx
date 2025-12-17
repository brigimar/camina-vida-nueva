export const dynamic = 'force-dynamic';

import InscripcionesListClient from './components/InscripcionesListClient';
import { Inscripcion, Circuito } from '@/types';
import { createSupabaseServer } from '@/lib/supabaseServer';

export default async function InscripcionesPage() {
  const supabase = await createSupabaseServer();

  // Fetch inscripciones con join correcto: inscripciones -> sesiones -> circuitos
  const iRes = await supabase
    .from('inscripciones')
    .select('*, sesiones(*, circuitos(nombre))')
    .eq('estado', 'activo')
    .limit(100);
  if (iRes.error) throw new Error(iRes.error.message);

  const initialInscripciones: Inscripcion[] = iRes.data ?? [];

  // Fetch circuitos para referencia (si es necesario)
  const cRes = await supabase.from('circuitos').select('*').limit(100);
  if (cRes.error) throw new Error(cRes.error.message);
  const initialCircuitos: Circuito[] = cRes.data ?? [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inscripciones</h1>
        <a
          href="/dashboard/inscripciones/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Crear inscripción
        </a>
      </div>

      <InscripcionesListClient
        initialInscripciones={initialInscripciones}
        initialCircuitos={initialCircuitos}
      />
    </div>
  );
}
