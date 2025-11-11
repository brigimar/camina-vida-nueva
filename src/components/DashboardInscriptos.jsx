'use client';
import { useState, useEffect, useMemo } from 'react';
import supabase from '@/lib/supabase';

export default function DashboardInscriptos() {
  const [inscriptos, setInscriptos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [notificandoId, setNotificandoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const CUPO_MAX = 15;
  const CUPO_MIN = 7;

  useEffect(() => {
    const cargarInscripciones = async () => {
      setCargando(true);
      try {
        const { data, error } = await supabase
          .from('vista_inscriptos_dashboard')
          .select(`
            id,
            nombre,
            edad,
            dni,
            whatsapp,
            dia,
            horario,
            estado,
            notificado_director,
            circuito_id,
            circuitonombre,
            localidad
          `)
          .order('circuitonombre', { ascending: true });

        if (error) throw error;
        setInscriptos(data || []);
      } catch (err) {
        console.error('❌ Error al cargar inscriptos:', err);
        setError('No se pudieron cargar las inscripciones.');
      } finally {
        setCargando(false);
      }
    };

    cargarInscripciones();
  }, []);

  // Agrupación por circuito y luego por sesión (día + horario)
  const inscriptosAgrupados = useMemo(() => {
    const filtrados = inscriptos.filter(i =>
      !filtroNombre.trim() || i.nombre?.toLowerCase().includes(filtroNombre.toLowerCase())
    );

    const grupos = {};

    filtrados.forEach(i => {
      const circuito = i.circuitonombre || 'Sin circuito';
      const sesionKey = `${i.dia} ${i.horario}h`;

      if (!grupos[circuito]) grupos[circuito] = {};
      if (!grupos[circuito][sesionKey]) grupos[circuito][sesionKey] = [];
      grupos[circuito][sesionKey].push(i);
    });

    return grupos;
  }, [inscriptos, filtroNombre]);

  const notificar = async (inscripto) => {
    setNotificandoId(inscripto.id);

    const mensaje = `Nuevo inscripto:
Nombre: ${inscripto.nombre}
Edad: ${inscripto.edad ?? '—'}
Circuito: ${inscripto.circuitonombre}
Día: ${inscripto.dia}
Horario: ${inscripto.horario}h
WhatsApp: ${inscripto.whatsapp ?? '—'}`;

    const enlaceWhatsApp = `https://wa.me/5491157577039?text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsApp, '_blank');

    await supabase.from('inscripciones')
      .update({ notificado_director: true })
      .eq('id', inscripto.id);

    setNotificandoId(null);
  };

  if (error) {
    return <div className="bg-red-100 text-red-800 p-4 rounded-lg">❌ {error}</div>;
  }

  return (
    <section id="inscriptos" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">👣 Inscriptos por Circuito y Sesión</h2>
        <div className="text-sm text-gray-600">
          Cupo máximo: <b>{CUPO_MAX}</b> | mínimo: <b>{CUPO_MIN}</b>
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-verde"
      />

      {cargando ? (
        <div className="p-6 text-gray-500 bg-white rounded-xl shadow">Cargando inscripciones...</div>
      ) : Object.keys(inscriptosAgrupados).length === 0 ? (
        <div className="p-6 text-gray-500 bg-white rounded-xl shadow">No hay inscripciones.</div>
      ) : (
        Object.entries(inscriptosAgrupados).map(([circuito, sesiones]) => (
          <div key={circuito} className="bg-white rounded-xl shadow border overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h3 className="font-bold text-lg text-gray-800">{circuito}</h3>
              <p className="text-sm text-gray-600">{Object.keys(sesiones).length} sesiones activas</p>
            </div>

            <div className="divide-y divide-gray-100">
              {Object.entries(sesiones).map(([sesion, lista]) => {
                const cupoRestante = CUPO_MAX - lista.length;
                return (
                  <div key={sesion} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">{sesion}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        cupoRestante <= 0
                          ? 'bg-red-100 text-red-800'
                          : cupoRestante < 5
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {cupoRestante <= 0
                          ? 'Cupo lleno'
                          : `${cupoRestante} libres / ${CUPO_MAX}`}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600 font-semibold">
                          <tr>
                            <th className="px-4 py-2 text-left">Nombre</th>
                            <th className="px-4 py-2">Edad</th>
                            <th className="px-4 py-2">WhatsApp</th>
                            <th className="px-4 py-2">Notificado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lista.map((i) => (
                            <tr key={i.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{i.nombre}</td>
                              <td className="px-4 py-2 text-center">{i.edad ?? '—'}</td>
                              <td className="px-4 py-2 text-center">
                                {i.whatsapp ? (
                                  <a
                                    href={`https://wa.me/549${i.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    {i.whatsapp}
                                  </a>
                                ) : '—'}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {i.notificado_director ? (
                                  <span className="text-green-600 text-xl">✅</span>
                                ) : (
                                  <button
                                    onClick={() => notificar(i)}
                                    disabled={notificandoId === i.id}
                                    className="bg-[#00B884] text-white px-3 py-1 rounded text-xs hover:bg-[#00966e] disabled:opacity-50"
                                  >
                                    {notificandoId === i.id ? '...' : 'Notificar'}
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
