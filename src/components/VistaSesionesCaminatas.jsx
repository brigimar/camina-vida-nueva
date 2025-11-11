'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function VistaSesionesCaminatas() {
  const [sesiones, setSesiones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarSesiones() {
      setCargando(true);
      const { data, error } = await supabase
        .from('vista_sesiones_caminatas')
        .select('circuito, dia, horario, cantidad_inscriptos, estado_cupo, cupo_disponible, fecha_formateada');

      if (error) {
        console.error('❌ Error al cargar sesiones:', error.message);
        setSesiones([]);
        setCargando(false);
        return;
      }

      setSesiones(data);
      setCargando(false);
    }

    cargarSesiones();
  }, []);

  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-700 text-center">🚶‍♀️ Sesiones de Caminatas Programadas</h3>

      {cargando ? (
        <p className="text-center text-gray-500">Cargando sesiones…</p>
      ) : sesiones.length === 0 ? (
        <p className="text-center text-gray-500">No hay sesiones activas registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sesiones.map((s, i) => (
            <div
              key={`${s.circuito}-${s.dia}-${s.horario}-${i}`}
              className={`p-4 rounded-xl shadow border transition-all duration-300 ${
                s.estado_cupo === 'válido'
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : s.estado_cupo === 'incompleto'
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  : 'bg-red-50 border-red-300 text-red-800'
              }`}
            >
              <p className="font-semibold text-lg">{s.circuito}</p>
              <p className="text-sm">{s.dia} – {s.horario}</p>
              <p className="text-sm italic text-gray-600">📅 {s.fecha_formateada}</p>
              <div className="mt-2 space-y-1">
                <p>👥 Inscriptos: <strong>{s.cantidad_inscriptos}</strong></p>
                <p>🎯 Cupo disponible: <strong>{s.cupo_disponible}</strong></p>
                <p>📌 Estado: <strong>{s.estado_cupo}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
