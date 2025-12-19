"use client";

import { memo, useMemo } from "react";

// ✅ Componente de copy emocional memoizado
const CircuitosCopyEmocional = memo(function CircuitosCopyEmocional({
  search,
  categoria,
  barrio,
  dia,
  horario,
  countResultados,
  totalSinFiltros,
}) {
  // ✅ Determinar si hay filtros activos
  const tieneFiltros = search || categoria || barrio || dia || horario;

  // ✅ Lógica de copy memoizada
  const copy = useMemo(() => {
    // Caso 1: Sin filtros + muchos resultados
    if (!tieneFiltros && totalSinFiltros > 50) {
      return {
        titulo: "¡Bienvenido a nuestros circuitos!",
        mensaje:
          "Más de 100 caminos te están esperando. Probá filtrar por barrio o por momento del día.",
        estilo: "bg-gradient-to-r from-emerald-50 to-cyan-50 border-l-4 border-emerald-500",
      };
    }

    // Caso 2: Con filtros + cero resultados
    if (tieneFiltros && countResultados === 0) {
      return {
        titulo: "No encontramos match exacto",
        mensaje:
          "No encontramos circuitos con esa combinación. Probá cambiar el día o el horario — lo importante es empezar de a poco.",
        estilo: "bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500",
      };
    }

    // Caso 3: Con filtros + algunos resultados (1-20)
    if (tieneFiltros && countResultados > 0 && countResultados <= 20) {
      return {
        titulo: "¡Perfecto!",
        mensaje: `Encontramos ${countResultados} circuito${countResultados !== 1 ? "s" : ""} que encaja${countResultados !== 1 ? "n" : ""} con lo que buscás. Son un gran punto de partida.`,
        estilo: "bg-gradient-to-r from-violet-50 to-pink-50 border-l-4 border-violet-500",
      };
    }

    // Caso 4: Con un solo filtro (categoría)
    if (categoria && !search && !barrio && !dia && !horario) {
      const categoriaMessages = {
        saludables: {
          titulo: "Circuitos Saludables",
          mensaje: "Ideal para empezar suave y construir hábito.",
          estilo: "bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500",
        },
        terapeuticas: {
          titulo: "Circuitos Terapéuticos",
          mensaje:
            "Pensadas para acompañar procesos físicos o emocionales.",
          estilo: "bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-600",
        },
        fitness: {
          titulo: "Circuitos Fitness",
          mensaje: "Para cuando querés subir una marcha.",
          estilo: "bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500",
        },
        aventura: {
          titulo: "Circuitos Aventura",
          mensaje: "Para quienes buscan algo distinto.",
          estilo: "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500",
        },
        premium: {
          titulo: "Circuitos Premium",
          mensaje: "Experiencias especiales para momentos especiales.",
          estilo: "bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500",
        },
      };

      return (
        categoriaMessages[categoria] || {
          titulo: "Circuitos seleccionados",
          mensaje: "Encontramos circuitos que te pueden interesar.",
          estilo: "bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-400",
        }
      );
    }

    // Caso por defecto: Con filtros + muchos resultados
    if (tieneFiltros && countResultados > 20) {
      return {
        titulo: "¡Muchas opciones!",
        mensaje: `Tenemos ${countResultados} circuitos disponibles. Seguí explorando o ajustá los filtros.`,
        estilo: "bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500",
      };
    }

    // Default
    return {
      titulo: "Nuestros Circuitos",
      mensaje: "Seleccioná los que más te atraigan.",
      estilo: "bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-400",
    };
  }, [tieneFiltros, countResultados, totalSinFiltros, categoria, search, barrio, dia, horario]);

  return (
    <div
      className={`rounded-lg p-6 mb-8 shadow-sm transition-all ${copy.estilo}`}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">{copy.titulo}</h2>
      <p className="text-gray-700 text-base leading-relaxed">{copy.mensaje}</p>
    </div>
  );
});

CircuitosCopyEmocional.displayName = "CircuitosCopyEmocional";

export default CircuitosCopyEmocional;
