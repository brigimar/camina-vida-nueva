"use client";

import "@/lib/chart";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Inscripcion } from "@/types";

export default function InscripcionesPorDia() {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);

  useEffect(() => {
    fetch('/api/inscripciones?limit=100')
      .then(r => r.json())
      .then(d => setInscripciones(d?.data ?? d ?? []))
      .catch(() => setInscripciones([]));
  }, []);

  const inscripcionesData = inscripciones;

  const conteo: Record<string, number> = {};

  inscripcionesData.forEach((i) => {
    if (!i.fecha) return;
    const fecha = i.fecha.includes("T") ? i.fecha.split("T")[0] : i.fecha;
    conteo[fecha] = (conteo[fecha] || 0) + 1;
  });

  if (Object.keys(conteo).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Inscripciones por día</h2>
        <p className="text-gray-500 text-sm">No hay inscripciones registradas.</p>
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
