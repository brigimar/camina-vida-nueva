"use client";

import "@/lib/chart";
import { Bar } from "react-chartjs-2";
import { useList, useMany } from "@refinedev/core";
import { Circuito, Inscripcion } from "@/types";

export default function InscripcionesPorCircuito() {
  // ✅ 1. Obtener inscripciones
  const inscripciones = useList<Inscripcion>({
    resource: "inscripciones",
  });

  const inscripcionesData = inscripciones.data?.data ?? [];

  // ✅ 2. Obtener IDs únicos de circuitos
  const circuitoIds = [...new Set(inscripcionesData.map((i) => i.circuito_id))];

  // ✅ 3. Obtener circuitos relacionados
  const circuitosQuery = useMany<Circuito>({
    resource: "circuitos",
    ids: circuitoIds,
    queryOptions: { enabled: circuitoIds.length > 0 },
  });

  const circuitosData = circuitosQuery.data?.data ?? [];

  // ✅ 4. Mapa id → nombre
  const circuitosMap = Object.fromEntries(
    circuitosData.map((c) => [c.id, c.nombre])
  );

  // ✅ 5. Conteo de inscripciones por circuito
  const conteo: Record<string, number> = {};

  inscripcionesData.forEach((i) => {
    const nombre = circuitosMap[i.circuito_id] || "Desconocido";
    conteo[nombre] = (conteo[nombre] || 0) + 1;
  });

  // ✅ 6. Si no hay datos, mostrar placeholder
  if (Object.keys(conteo).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Inscripciones por circuito</h2>
        <p className="text-gray-500 text-sm">No hay inscripciones registradas.</p>
      </div>
    );
  }

  // ✅ 7. Datos para ChartJS
  const data = {
    labels: Object.keys(conteo),
    datasets: [
      {
        label: "Inscripciones",
        data: Object.values(conteo),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Inscripciones por circuito</h2>
      <Bar data={data} />
    </div>
  );
}
