'use client';
import { useState, useEffect } from 'react';

export default function FiltroCaminatas({ circuitos, onFiltrar }) {
  const [filtroLocalidad, setFiltroLocalidad] = useState('');
  const [filtroDias, setFiltroDias] = useState([]);
  const [filtroHorario, setFiltroHorario] = useState('');

  // Opciones únicas
  const localidades = [...new Set(circuitos.map(c => c.Localidad).filter(Boolean))];

  const diasUnicos = [
    ...new Set(
      circuitos.flatMap(c => {
        if (Array.isArray(c.Dias)) return c.Dias;
        if (typeof c.Dias === 'string') return c.Dias.split(',').map(s => s.trim());
        return [];
      })
    )
  ];

  const horariosUnicos = [
    ...new Set(
      circuitos.flatMap(c => {
        if (Array.isArray(c.Horarios)) return c.Horarios;
        if (typeof c.Horarios === 'string') return c.Horarios.split(',').map(s => s.trim());
        return [];
      })
    )
  ];

  // Filtrado
  useEffect(() => {
    const filtrados = circuitos.filter(c => {
      const diasArray = Array.isArray(c.Dias) ? c.Dias : (typeof c.Dias === 'string' ? c.Dias.split(',').map(s=>s.trim()) : []);
      const horariosArray = Array.isArray(c.Horarios) ? c.Horarios : (typeof c.Horarios === 'string' ? c.Horarios.split(',').map(s=>s.trim()) : []);

      return (
        (!filtroLocalidad || c.Localidad === filtroLocalidad) &&
        (filtroDias.length === 0 || diasArray.some(d => filtroDias.includes(d))) &&
        (!filtroHorario || horariosArray.includes(filtroHorario))
      );
    });
    onFiltrar(filtrados);
  }, [filtroLocalidad, filtroDias, filtroHorario, circuitos, onFiltrar]);

  // Toggle botones días
  const toggleDia = (dia) => setFiltroDias(prev => prev.includes(dia) ? prev.filter(d=>d!==dia) : [...prev, dia]);

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-start md:items-center flex-wrap">
      {/* Localidad */}
      <select
        value={filtroLocalidad}
        onChange={e => setFiltroLocalidad(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      >
        <option value="">Todas las localidades</option>
        {localidades.map(loc => <option key={loc} value={loc}>{loc}</option>)}
      </select>

      {/* Días */}
      <div className="flex flex-wrap gap-2">
        {diasUnicos.map(dia => (
          <button
            key={dia}
            onClick={() => toggleDia(dia)}
            className={`px-4 py-2 rounded-full text-sm border shadow-sm transition ${
              filtroDias.includes(dia)
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {dia}
          </button>
        ))}
      </div>

      {/* Horario */}
      <select
        value={filtroHorario}
        onChange={e => setFiltroHorario(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
      >
        <option value="">Todos los horarios</option>
        {horariosUnicos.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
    </div>
  );
}
