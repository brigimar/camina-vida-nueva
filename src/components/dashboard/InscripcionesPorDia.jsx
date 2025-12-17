"use client";

import "@/lib/chart";
import { Line } from "react-chartjs-2";
import { useList } from "@refinedev/core";
import { Inscripcion } from "@/types";

export default function InscripcionesPorDia() {
  // ✅ 1. Obtener inscripciones con refine
  const inscripciones = useList<Inscripcion>({
    resource: "inscripciones",
  });

  const inscripcionesData = inscripciones.data?.data ?? [];

  // ✅ 2. Conteo por día usando sesiones.fecha
  const conteo: Record<string, number> = {};

  inscripcionesData.forEach((i: any) => {
    const fechaRaw = i.sesiones?.fecha;
    if (!fechaRaw) return;

    // ✅ Normalizamos fecha (solo YYYY-MM-DD)
    const fecha = fechaRaw.includes("T")
      ? fechaRaw.split("T")[0]
      : fechaRaw;

    conteo[fecha] = (conteo[fecha] || 0) + 1;
  });

  // ✅ 3. Si no hay datos, mostrar placeholder
  if (Object.keys(conteo).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Inscripciones por día</h2>
        <p className="text-gray-500 text-sm">No hay inscripciones registradas.</p>
      </div>
    );
  }

  // ✅ 4. Datos para ChartJS
  const data = {
    labels: Object.keys(conteo),
    datasets: [
      {
        label: "Inscripciones por día",
        data: Object.values(conteo),
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Inscripciones por día</h2>
      <Line data={data} />
    </div>
  );
}
