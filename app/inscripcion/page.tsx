export const dynamic = 'force-dynamic';

import CircuitoView from "@/components/home/CircuitoView";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function InscripcionPage({ searchParams }) {
  const circuitoId = searchParams?.circuito;

  if (!circuitoId) {
    return (
      <div className="p-10 text-center text-red-600">
        Falta el parámetro <strong>circuito</strong>.
      </div>
    );
  }

  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("circuitos")
      .select("*")
      .eq("id", circuitoId)
      .single();

    if (error || !data) {
      return (
        <div className="p-10 text-center text-red-600">
          No se pudo cargar el circuito.
        </div>
      );
    }

    return (
      <main className="min-h-screen bg-white">
        <CircuitoView circuito={data} />
      </main>
    );
  } catch (err) {
    console.error("Error loading circuito:", err);
    return (
      <div className="p-10 text-center text-red-600">No se pudo cargar el circuito.</div>
    );
  }
}
