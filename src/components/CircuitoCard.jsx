'use client';
import { useState } from 'react';
import InscripcionModal from './InscripcionModal';

export default function CircuitoCard({ circuito, mostrarBotonReserva = false }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const {
    id,
    nombre,
    alias,
    localidad,
    descripcion,
    distancia,
    dias,
    horarios,
    punto_encuentro,
    foto,
    cupo_total,
    estado
  } = circuito;

  // Normalización de días
  const diasArray = Array.isArray(dias)
    ? dias
    : typeof dias === 'string'
    ? dias.split(',').map(d => d.trim())
    : [];

  // Normalización de horarios
  const horariosArray = Array.isArray(horarios)
    ? horarios
    : typeof horarios === 'string'
    ? horarios.split(',').map(h => h.trim())
    : Array.isArray(horarios?.options)
    ? horarios.options.map(o => (typeof o === 'string' ? o : o?.name)).filter(Boolean)
    : [];

  const puedeInscribirse = estado !== false;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col transition hover:shadow-lg">
      <img
        src={foto || '/images/circuitos/default.jpg'}
        alt={nombre}
        className="w-full h-40 object-cover rounded-t-xl mb-4"
      />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800">{nombre || '—'}</h3>
          <span className="bg-[#F1FDF7] text-[#00B884] text-xs font-bold px-2 py-1 rounded-full">
            {cupo_total ?? 0}
          </span>
        </div>

        {alias && <p className="text-xs text-gray-500">🏷️ Alias: {alias}</p>}
        {descripcion && <p className="text-sm text-gray-600 italic">"{descripcion}"</p>}
        <p className="text-sm text-[#64748B]">📏 {distancia ? `${distancia} m` : 'Distancia no definida'}</p>
        <p className="text-sm text-[#64748B]">
          📅 {diasArray.length > 0 ? diasArray.join(', ') : 'Días no definidos'}
        </p>
        <p className="text-sm text-[#64748B]">
          🕒 {horariosArray.length > 0 ? horariosArray.join(', ') : 'Horarios no definidos'}
        </p>
        <p className="text-xs text-[#64748B]">
          📍 {punto_encuentro || '⚠️ Punto de encuentro faltante'}
        </p>

        {!puedeInscribirse && (
          <p className="text-xs text-red-600">⚠️ Este circuito está inactivo</p>
        )}

        {mostrarBotonReserva && puedeInscribirse && (
          <div className="pt-2">
    <button
      className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition"
      onClick={() => setMostrarFormulario(true)}
    >
      Sumarme
    </button>
  </div>
        )}
      </div>

      {mostrarFormulario && (
        <InscripcionModal
          circuitoId={id}              // ✅ UUID real
          nombreCircuito={nombre}
          onClose={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}