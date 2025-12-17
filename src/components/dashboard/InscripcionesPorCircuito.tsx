"use client";

import "@/lib/chart";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Circuito, Inscripcion } from "@/types";

export default function InscripcionesPorCircuito() {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);

  useEffect(() => {
    fetch('/api/inscripciones?limit=100')
      .then(r => r.json())
      .then(d => setInscripciones(d?.data ?? d ?? []))
      .catch(() => setInscripciones([]));

    fetch('/api/circuitos?limit=100')
      .then(r => r.json())
      .then(response => setCircuitos(response?.data?.data ?? []))
      .catch(() => setCircuitos([]));
  }, []);

  const inscripcionesData = inscripciones;
  
  // Extraer IDs de circuitos desde el join correcto: inscripciones -> sesiones -> circuitos
  const circuitoIds = [...new Set(
    inscripcionesData
      .map((i: any) => i.sesiones?.circuitos?.id)
      .filter(Boolean)
  )];
  
  const circuitosData = circuitos.filter(c => circuitoIds.includes(c.id));

  const circuitosMap = Object.fromEntries(
    circuitosData.map((c) => [c.id, c.nombre])
  );

  const conteo: Record<string, number> = {};
  inscripcionesData.forEach((i: any) => {
    // Acceder al nombre a través del join correcto
    const nombre = i.sesiones?.circuitos?.nombre || "Desconocido";
    conteo[nombre] = (conteo[nombre] || 0) + 1;
  });

  if (Object.keys(conteo).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Inscripciones por circuito</h2>
        <p className="text-gray-500 text-sm">No hay inscripciones registradas.</p>
      </div>
    );
  }

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
