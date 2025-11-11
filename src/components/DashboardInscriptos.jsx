// src/components/DashboardInscriptos.jsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import supabase from '@/lib/supabase';

export default function DashboardInscriptos() {
  const [inscriptos, setInscriptos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [notificandoId, setNotificandoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarInscripciones = async () => {
      setCargando(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('vista_inscriptos_dashboard')
          .select(`
            id,
            nombre,
            dni,
            edad,
            dia,
            horario,
            whatsapp,
            estado,
            notificado_director,
            circuito_id,
            circuitonombre,
            localidad,
            cuporestante,
            disponible
          `)
          .order('circuitonombre', { ascending: true })
          .order('id', { ascending: false });

        if (error) throw error;
        setInscriptos(data || []);
      } catch (err) {
        console.error('Error al cargar inscriptos:', err);
        setError('No se pudieron cargar las inscripciones.');
      } finally {
        setCargando(false);
      }
    };

    cargarInscripciones();
  }, []);

  // Agrupar por circuito y filtrar por nombre
  const inscriptosPorCircuito = useMemo(() => {
    const filtrados = inscriptos.filter(i =>
      !filtroNombre.trim() || i.nombre?.toLowerCase().includes(filtroNombre.toLowerCase())
    );

    const grupos = {};
    filtrados.forEach(i => {
      const nombreCircuito = i.circuitonombre || 'Sin circuito';
      if (!grupos[nombreCircuito]) grupos[nombreCircuito] = [];
      grupos[nombreCircuito].push(i);
    });

    return Object.entries(grupos).sort(([a], [b]) => a.localeCompare(b));
  }, [inscriptos, filtroNombre]);

  const notificar = async (inscripto) => {
    setNotificandoId(inscripto.id);

    const mensaje = `Nuevo inscripto:
Nombre: ${inscripto.nombre ?? '—'}
Edad: ${inscripto.edad ?? '—'}
Circuito: ${inscripto.circuitonombre ?? '—'}
Día: ${inscripto.dia ?? '—'}
Horario: ${inscripto.horario ?? '—'}
WhatsApp: ${inscripto.whatsapp ?? '—'}`;

    const enlaceWhatsApp = `https://wa.me/5491157577039?text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsApp, '_blank');

    try {
      const { error: errorActualizar } = await supabase
        .from('inscripciones')
        .update({ notificado_director: true })
        .eq('id', inscripto.id);

      if (!errorActualizar) {
        const { data: nuevosDatos, error } = await supabase
          .from('vista_inscriptos_dashboard')
          .select(`
            id,
            nombre,
            dni,
            edad,
            dia,
            horario,
            whatsapp,
            estado,
            notificado_director,
            circuito_id,
            circuitonombre,
            localidad,
            cuporestante,
            disponible
          `)
          .order('circuitonombre', { ascending: true })
          .order('id', { ascending: false });

        if (!error) setInscriptos(nuevosDatos || []);
      }
    } catch (err) {
      console.error('❌ Error en notificación:', err);
    } finally {
      setNotificandoId(null);
    }
  };

  if (error) {
    return (
      <section id="inscriptos" className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800">👥 Inscriptos</h2>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          ❌ {error}
        </div>
      </section>
    );
  }

  return (
    <section id="inscriptos" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">👥 Inscriptos por Circuito</h2>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full text-sm font-medium">
          🔔 {inscriptos.filter(i => !i.notificado_director).length} sin notificar
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-verde"
      />

      {cargando ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          Cargando inscripciones...
        </div>
      ) : inscriptosPorCircuito.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          No hay inscripciones para mostrar.
        </div>
      ) : (
        <div className="space-y-8">
          {inscriptosPorCircuito.map(([circuitonombre, lista]) => (
            <div key={circuitonombre} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{circuitonombre}</h3>
                  <p className="text-sm text-gray-600">{lista.length} inscripto(s)</p>
                </div>
                {typeof lista[0]?.cuporestante === 'number' && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lista[0].cuporestante <= 0
                        ? 'bg-red-100 text-red-800'
                        : lista[0].cuporestante <= 5
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {lista[0].cuporestante <= 0 ? 'Cupo lleno' : `${lista[0].cuporestante} cupos`}
                  </span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="px-4 py-3 text-left">Nombre</th>
                      <th className="px-4 py-3 text-left">Edad</th>
                      <th className="px-4 py-3 text-left">Día</th>
                      <th className="px-4 py-3 text-left">Horario</th>
                      <th className="px-4 py-3 text-left">WhatsApp</th>
                      <th className="px-4 py-3 text-left">Notificado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {lista.map((i) => (
                      <tr key={i.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{i.nombre || '—'}</td>
                        <td className="px-4 py-3">{i.edad ?? '—'}</td>
                        <td className="px-4 py-3">{i.dia || '—'}</td>
                        <td className="px-4 py-3">{i.horario || '—'}</td>
                        <td className="px-4 py-3">
                          {i.whatsapp ? (
                            <a
                              href={`https://wa.me/549${i.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              {i.whatsapp}
                            </a>
                          ) : '—'}
                        </td>
                        <td className="px-4 py-3">
                          {i.notificado_director ? (
                            <span className="text-green-600 text-xl">✅</span>
                          ) : (
                            <button
                              onClick={() => notificar(i)}
                              disabled={notificandoId === i.id}
                              className="bg-[#00B884] text-white px-3 py-1 rounded text-xs hover:bg-[#00966e] disabled:opacity-50 transition"
                            >
                              {notificandoId === i.id ? 'Enviando...' : 'Notificar'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
