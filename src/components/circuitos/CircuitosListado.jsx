"use client";

import { useState, useMemo, memo, useCallback, useEffect } from "react";
import CircuitosFilters from "./CircuitosFilters";
import CircuitosGrid from "./CircuitosGrid";
import Paginacion from "./Paginacion";
import CircuitosCopyEmocional from "./CircuitosCopyEmocional";
import { trackMetric, groupCircuitosByCategoria } from "@/lib/metricsHelper";

// ✅ Memoized component para evitar re-renders innecesarios
const CircuitosListado = memo(function CircuitosListado({
  circuitos,
  currentPage = 1,
  totalPages = 1,
}) {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [barrio, setBarrio] = useState("");
  const [dia, setDia] = useState("");
  const [horario, setHorario] = useState("");

  // ✅ Registrar view event al montar (solo una vez)
  useEffect(() => {
    if (circuitos && circuitos.length > 0) {
      // ✅ Agrupar por categoría y enviar eventos
      const grouped = groupCircuitosByCategoria(circuitos);

      Object.entries(grouped).forEach(([cat, count]) => {
        trackMetric("view", {
          categoria: cat,
          count,
        });
      });
    }
  }, []); // ✅ Solo se ejecuta al montar

  // ✅ Callbacks memoizados para evitar recreación en cada render
  const handleSearchChange = useCallback((value) => setSearch(value), []);
  const handleCategoriaChange = useCallback((value) => setCategoria(value), []);
  const handleBarrioChange = useCallback((value) => setBarrio(value), []);
  const handleDiaChange = useCallback((value) => setDia(value), []);
  const handleHorarioChange = useCallback((value) => setHorario(value), []);

  // ✅ Filtrado client-side memoizado
  const filtrados = useMemo(() => {
    return circuitos
      .filter((c) =>
        !search || c.nombre.toLowerCase().includes(search.toLowerCase())
      )
      .filter((c) => !categoria || c.categoria === categoria)
      .filter((c) => !barrio || c.barrio === barrio)
      .filter((c) => {
        if (!dia) return true;
        if (!c.sesiones || c.sesiones.length === 0) return false;
        return c.sesiones.some((s) => s.dia === dia);
      })
      .filter((c) => {
        if (!horario) return true;
        if (!c.sesiones || c.sesiones.length === 0) return false;
        return c.sesiones.some((s) => {
          const hora = parseInt(s.hora?.split(":")[0] || "0");
          if (horario === "mañana") return hora >= 6 && hora < 12;
          if (horario === "tarde") return hora >= 12 && hora < 18;
          if (horario === "noche") return hora >= 18 && hora < 23;
          return false;
        });
      });
  }, [search, categoria, barrio, dia, horario, circuitos]);

  return (
    <div className="space-y-6">
      <CircuitosFilters
        search={search}
        onSearchChange={handleSearchChange}
        categoria={categoria}
        onCategoriaChange={handleCategoriaChange}
        barrio={barrio}
        onBarrioChange={handleBarrioChange}
        dia={dia}
        onDiaChange={handleDiaChange}
        horario={horario}
        onHorarioChange={handleHorarioChange}
      />

      {/* ✅ Copy emocional dinámico según filtros y resultados */}
      <CircuitosCopyEmocional
        search={search}
        categoria={categoria}
        barrio={barrio}
        dia={dia}
        horario={horario}
        countResultados={filtrados.length}
        totalSinFiltros={circuitos.length}
      />

      <CircuitosGrid circuitos={filtrados} />

      {/* ✅ Paginación SSR al pie */}
      <Paginacion currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
});

CircuitosListado.displayName = "CircuitosListado";

export default CircuitosListado;
