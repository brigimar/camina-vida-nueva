export const dynamic = 'force-dynamic';

import InscripcionesPorCircuito from "@/components/dashboard/InscripcionesPorCircuito";
import InscripcionesPorDia from "@/components/dashboard/InscripcionesPorDia";
import { Circuito, Inscripcion, Sesion } from "@/types";
import { createSupabaseServer } from "@/lib/supabaseServer";

interface CardProps {
  title: string;
  value: number;
}

export default async function DashboardHome() {
  const supabase = await createSupabaseServer();

  const cRes = await supabase.from('circuitos').select('*').limit(100);
  if (cRes.error) throw new Error(cRes.error.message);
  const circuitos = (cRes.data ?? []) as Circuito[];

  // Fetch inscripciones con join correcto: inscripciones -> sesiones -> circuitos
  const iRes = await supabase
    .from('inscripciones')
    .select('*, sesiones(*, circuitos(nombre))')
    .eq('estado', 'activo')
    .limit(100);
  if (iRes.error) throw new Error(iRes.error.message);
  const inscripciones = (iRes.data ?? []) as Inscripcion[];

  const sRes = await supabase.from('sesiones').select('*').limit(100);
  if (sRes.error) throw new Error(sRes.error.message);
  const sesiones = (sRes.data ?? []) as Sesion[];

  const circuitosActivos = circuitos.filter((c) => c.estado === "activo").length || 0;
  const totalInscripciones = inscripciones.length || 0;

  const hoy = new Date().toISOString().split("T")[0];
  const inscripcionesHoy = inscripciones.filter((i) => i.fecha?.startsWith(hoy)).length || 0;

  const sesionesProgramadas = sesiones.filter((s) => s.estado === "programada").length || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Resumen</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Circuitos activos" value={circuitosActivos} />
        <Card title="Inscripciones totales" value={totalInscripciones} />
        <Card title="Inscripciones hoy" value={inscripcionesHoy} />
        <Card title="Sesiones programadas" value={sesionesProgramadas} />
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InscripcionesPorCircuito />
        <InscripcionesPorDia />
      </div>
    </div>
  );
}

function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col">
      <span className="text-gray-500 text-sm">{title}</span>
      <span className="text-3xl font-bold mt-2">{value}</span>
    </div>
  );
}

