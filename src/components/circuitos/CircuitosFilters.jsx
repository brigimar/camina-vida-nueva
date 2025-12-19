"use client";

import { memo } from "react";

// ✅ Memoized component para prevenir re-renders innecesarios
const CircuitosFilters = memo(function CircuitosFilters({
  search,
  onSearchChange,
  categoria,
  onCategoriaChange,
  barrio,
  onBarrioChange,
  dia,
  onDiaChange,
  horario,
  onHorarioChange,
}) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow space-y-4">

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar circuito..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition"
      />

      {/* SELECTORES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* CATEGORÍA */}
        <select
          value={categoria}
          onChange={(e) => onCategoriaChange(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition"
        >
          <option value="">Todas las categorías</option>
          <option value="saludables">Saludables</option>
          <option value="terapeuticas">Terapéuticas</option>
          <option value="fitness">Fitness</option>
          <option value="aventura">Aventura</option>
          <option value="premium">Premium</option>
        </select>

        {/* BARRIO */}
        <select
          value={barrio}
          onChange={(e) => onBarrioChange(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition"
        >
          <option value="">Todos los barrios</option>
          <option value="Palermo">Palermo</option>
          <option value="Recoleta">Recoleta</option>
          <option value="Belgrano">Belgrano</option>
          <option value="Caballito">Caballito</option>
          <option value="San Telmo">San Telmo</option>
        </select>

        {/* DÍA */}
        <select
          value={dia}
          onChange={(e) => onDiaChange(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition"
        >
          <option value="">Todos los días</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>

        {/* HORARIO */}
        <select
          value={horario}
          onChange={(e) => onHorarioChange(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none transition"
        >
          <option value="">Todos los horarios</option>
          <option value="mañana">Mañana (6–12)</option>
          <option value="tarde">Tarde (12–18)</option>
          <option value="noche">Noche (18–23)</option>
        </select>

      </div>
    </div>
  );
});

CircuitosFilters.displayName = "CircuitosFilters";

export default CircuitosFilters;
