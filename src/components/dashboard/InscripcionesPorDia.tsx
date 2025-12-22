"use client";

import "@/lib/chart";
import { Line } from "react-chartjs-2";
import { useInscriptos } from "@/hooks/useInscriptos";
import { Database } from "@/types/supabase";

type InscripcionRow = Database["public"]["Tables"]["inscripciones"]["Row"];

export default function InscripcionesPorDia() {
  const { data: inscripcionesData = [], loading } = useInscriptos();

  if (loading) return <p>Cargando inscripciones...</p>;

  const conteo: Record<string, number> = {};

  inscripcionesData.forEach((i: InscripcionRow) => {
    const fechaRaw = i.sesiones?.fecha;
    if (!fechaRaw) return;

    const fecha = fechaRaw.includes("T") ? fechaRaw.split("T")[0] : fechaRaw;
    conteo[fecha] = (conteo[fecha] || 0) + 1;
  });

  if (Object.keys(conteo).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Inscripciones por día</h2>
        <p className="text-gray-500 text-sm">
          No hay inscripciones registradas.
        </p>
      </div>
    );
  }

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
