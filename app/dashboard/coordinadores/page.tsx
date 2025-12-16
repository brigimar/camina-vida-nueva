export const dynamic = 'force-dynamic';

import CoordinadoresListClient from "./components/CoordinadoresListClient";
import { Coordinador } from "@/types";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function CoordinadoresPage() {
  let initialCoordinadores: Coordinador[] = [];
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from('coordinadores').select('*').limit(100);
    if (error) throw error;
    initialCoordinadores = data ?? [];
  } catch (err) {
    console.error('Error fetching coordinadores:', err);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coordinadores</h1>

        <a
          href="/dashboard/coordinadores/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Crear coordinador
        </a>
      </div>

      <CoordinadoresListClient initialCoordinadores={initialCoordinadores} />
    </div>
  );
}
