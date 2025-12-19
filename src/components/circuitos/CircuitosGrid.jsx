"use client";

import { memo } from "react";
import CircuitoFlyerCard from "./CircuitoFlyerCard";

// ✅ Memoized component para prevenir re-renders cuando los circuitos no cambian
const CircuitosGrid = memo(function CircuitosGrid({ circuitos }) {
  // ✅ Mostrar mensaje si no hay resultados
  if (!circuitos || circuitos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No se encontraron circuitos con esos criterios.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
      {circuitos.map((c, index) => (
        <div
          key={c.id}
          className="animate-fadeInUp opacity-0"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <CircuitoFlyerCard
            id={c.id}
            nombre={c.nombre}
            imagen_url={c.imagen_url}
            categoria={c.categoria}
            distancia_km={c.distancia_km}
            localidad={c.localidad}
            coordinadores={c.coordinadores || []}
            tiempo={c.tiempo_estimado}
            pasos={c.pasos}
            precio={c.precio}
          />
        </div>
      ))}
    </div>
  );
});

CircuitosGrid.displayName = "CircuitosGrid";

export default CircuitosGrid;

