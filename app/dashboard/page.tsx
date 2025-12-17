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

  // ✅ Fetch circuitos (sin throw)
  const cRes = await supabase.from('circuitos').select('*').limit(100);
  const circuitos: Circuito[] = Array.isArray(cRes.data) ? cRes.data : [];

  // ✅ Fetch inscripciones con join correcto
  const iRes = await supabase
    .from('inscripciones')
    .select('*, sesiones(*, circuitos(nombre))')
    .eq('estado', 'activo')
    .limit(100);
  const inscripciones: Inscripcion[] = Array.isArray(iRes.data) ? iRes.data : [];

  // ✅ Fetch sesiones
  const sRes = await supabase.from('sesiones').select('*').limit(100);
  const sesiones: Sesion[] = Array.isArray(sRes.data) ? sRes.data : [];

  // ✅ KPIs seguros
  const circuitosActivos = circuitos.filter((c) => c.estado === "activo").length;
  const totalInscripciones = inscripciones.length;

  // ✅ Contar inscripciones de hoy usando sesiones.fecha
  const hoy = new Date().toISOString().split("T")[0];
  const inscripcionesHoy = inscripciones.filter(
    (i) => i.sesiones?.fecha?.startsWith(hoy)
  ).length;

  const sesionesProgramadas = sesiones.filter(
    (s) => s.estado === "programada"
  ).length;

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
