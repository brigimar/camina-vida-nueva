"use client";

import { memo, useCallback } from "react";
import { trackMetric } from "@/lib/metricsHelper";

// ✅ Memoized component para optimizar renderizado del grid
const CircuitoFlyerCard = memo(function CircuitoFlyerCard({
  id,
  nombre,
  imagen_url,
  distancia_km,
  localidad,
  coordinadores = [],
  tiempo,
  pasos,
  precio,
  categoria,
}) {
  // ✅ Handler para registrar click event
  const handleCardClick = useCallback(() => {
    trackMetric("click", {
      circuito_id: id,
      categoria: categoria || null,
    });
  }, [id, categoria]);

  const categoriaStyles = {
    terapeuticas: "bg-emerald-600",
    saludables: "bg-blue-500",
    fitness: "bg-red-500",
    aventura: "bg-yellow-600",
    premium: "bg-purple-600",
  };

  return (
    <article
      className="bg-white rounded-3xl overflow-hidden shadow-xl mb-6 transition-transform active:scale-95 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Imagen */}
      <div className="relative h-60 w-full">
        {imagen_url ? (
          <img
            src={imagen_url}
            alt={nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Chip categoría */}
        {categoria && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold shadow ${categoriaStyles[categoria]}`}
          >
            {categoria}
          </div>
        )}

        {/* Precio */}
        {precio && (
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white text-lg font-extrabold shadow-lg">
            ${precio}
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-900">{nombre}</h2>

        <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
          <i className="fas fa-map-marker-alt"></i>
          {localidad}
        </p>

        <p className="text-gray-700 text-sm mt-3 leading-relaxed">
          Un recorrido para reconectar con tu bienestar, moverte con energía y
          disfrutar del aire libre.
        </p>

        {/* Métricas */}
        <div className="flex justify-around border-t border-gray-200 mt-4 pt-4">
          <div className="text-center">
            <i className="fas fa-ruler-horizontal text-emerald-700 text-2xl mb-1"></i>
            <div className="font-bold text-gray-800">{distancia_km} km</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Distancia
            </div>
          </div>

          <div className="text-center">
            <i className="fas fa-clock text-emerald-700 text-2xl mb-1"></i>
            <div className="font-bold text-gray-800">{tiempo ?? "—"}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Tiempo
            </div>
          </div>

          <div className="text-center">
            <i className="fas fa-shoe-prints text-emerald-700 text-2xl mb-1"></i>
            <div className="font-bold text-gray-800">{pasos ?? "—"}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Pasos
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Coordinadores */}
      {coordinadores && coordinadores.length > 0 && (
        <div className="flex justify-start items-center px-5 py-4 bg-slate-50 border-t border-gray-200">
          <div className="flex -space-x-3">
            {coordinadores.map((c, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 text-white font-bold flex items-center justify-center border-4 border-white"
              >
                {typeof c === "string" ? c.charAt(0).toUpperCase() : "?"}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
});

CircuitoFlyerCard.displayName = "CircuitoFlyerCard";

export default CircuitoFlyerCard;
