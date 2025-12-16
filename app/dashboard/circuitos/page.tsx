import Link from "next/link";
import { Circuito } from "@/types";
import CircuitosListClient from "./components/CircuitosListClient";
import { createSupabaseServer } from "@/lib/supabaseServer";

export const dynamic = 'force-dynamic';

export default async function CircuitosPage() {
  let circuitos: Circuito[] = [];
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from('circuitos').select('*').limit(100);
    if (error) throw error;
    circuitos = data ?? [];
  } catch (error) {
    console.error('Error fetching circuitos:', error);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Circuitos</h1>
        <Link
          href="/dashboard/circuitos/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Crear Circuito
        </Link>
      </div>

      {/* Pass circuitos to client component for interactivity */}
      <CircuitosListClient initialCircuitos={circuitos} />
    </div>
  );
}
