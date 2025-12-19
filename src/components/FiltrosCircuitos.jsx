'use client';
import { useState, useEffect } from 'react';
import { Filter, RefreshCw, Search } from 'lucide-react';

// 🔧 Función de normalización
function normalizarHorarios(horarios) {
  if (Array.isArray(horarios)) {
    return horarios.map(h => h.toString().trim()).filter(Boolean);
  }
  if (typeof horarios === 'string') {
    return horarios
      .split(',')
      .map(h => h.toString().trim())
      .filter(Boolean);
  }
  return [];
}

export default function FiltrosCircuitos({ circuitos, onFiltrar }) {
  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const diasUnicos = [...new Set(
    circuitos
      .flatMap(c => Array.isArray(c.dias) ? c.dias : (c.dias?.split(',') || []))
      .map(d => d.toString().trim())
      .filter(Boolean)
  )].sort();

  const horariosUnicos = [...new Set(
    circuitos.flatMap(c => normalizarHorarios(c.horarios))
  )].sort();

  const localidadesUnicas = [...new Set(
    circuitos.map(c => c.localidad).filter(Boolean)
  )].sort();

  useEffect(() => {
    const filtrados = circuitos.filter((c) => {
      const coincideDia = diaSeleccionado
        ? (Array.isArray(c.dias) ? c.dias : (c.dias?.split(',') || []))
            .map(d => d.toString().trim())
            .includes(diaSeleccionado)
        : true;

      const coincideHorario = horarioSeleccionado
        ? normalizarHorarios(c.horarios).includes(horarioSeleccionado)
        : true;

      const coincideLocalidad = localidadSeleccionada
        ? c.localidad?.toLowerCase() === localidadSeleccionada.toLowerCase()
        : true;

      const texto = busqueda.trim().toLowerCase();
      const coincideTexto = texto
        ? [c.nombre, c.descripcion, c.alias, c.localidad]
            .filter(Boolean)
            .some(campo => campo.toLowerCase().includes(texto))
        : true;

      return coincideDia && coincideHorario && coincideLocalidad && coincideTexto;
    });

    onFiltrar(filtrados);
  }, [diaSeleccionado, horarioSeleccionado, localidadSeleccionada, busqueda, circuitos, onFiltrar]);

  const limpiarFiltros = () => {
    setDiaSeleccionado('');
    setHorarioSeleccionado('');
    setLocalidadSeleccionada('');
    setBusqueda('');
    onFiltrar(circuitos);
  };

  return (
    <section className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="text-indigo-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">
            Filtros
          </h3>
        </div>

        <span className="text-sm text-gray-500">
          {circuitos.length} circuitos
        </span>
      </div>

      {/* Búsqueda */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar por nombre, alias o descripción"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     focus:border-indigo-500 transition"
        />
      </div>

      {/* Selectores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <FiltroSelect
          label="Día"
          value={diaSeleccionado}
          onChange={setDiaSeleccionado}
          opciones={diasUnicos}
          placeholder="Todos los días"
        />
        <FiltroSelect
          label="Horario"
          value={horarioSeleccionado}
          onChange={setHorarioSeleccionado}
          opciones={horariosUnicos}
          placeholder="Todos los horarios"
        />
        <FiltroSelect
          label="Localidad"
          value={localidadSeleccionada}
          onChange={setLocalidadSeleccionada}
          opciones={localidadesUnicas}
          placeholder="Todas las localidades"
        />
      </div>

      {/* Acciones */}
      <div className="flex justify-end">
        <button
          onClick={limpiarFiltros}
          className="flex items-center gap-2 px-4 py-2 text-sm
                     bg-gray-100 text-gray-700 rounded-xl
                     hover:bg-gray-200 transition"
        >
          <RefreshCw size={15} />
          Limpiar filtros
        </button>
      </div>
    </section>
  );
}

function FiltroSelect({ label, value, onChange, opciones, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300
                   bg-white focus:outline-none focus:ring-2
                   focus:ring-indigo-500 focus:border-indigo-500 transition"
      >
        <option value="">{placeholder}</option>
        {opciones.map(op => (
          <option key={`${label}-${op}`} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
