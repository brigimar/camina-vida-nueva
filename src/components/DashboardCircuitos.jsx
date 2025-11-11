'use client';

import { useEffect, useState } from 'react';
import { RefreshCcw, ExternalLink } from 'lucide-react';

export default function DashboardCircuitos() {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch('/api/vista_sesiones_caminatas');
      if (!res.ok) throw new Error('Error al cargar los datos');
      const data = await res.json();
      setSesiones(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  }

  async function syncCircuitos() {
    try {
      setSyncing(true);
      const res = await fetch('/api/sync-circuitos');
      if (!res.ok) throw new Error('Error al sincronizar');
      await fetchData();
      alert('✅ Sincronización completa');
    } catch (err) {
      console.error(err);
      alert('❌ Error al sincronizar');
    } finally {
      setSyncing(false);
    }
  }

  const colorEstado = (estado) => {
    switch (estado) {
      case 'válido':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'incompleto':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'excedido':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Cargando datos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard de Circuitos</h1>
        <button
          onClick={syncCircuitos}
          disabled={syncing}
          className={`flex items-center gap-2 bg-[#00B884] hover:bg-[#00a477] text-white px-4 py-2 rounded-lg shadow transition ${
            syncing ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          <RefreshCcw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Sincronizando...' : 'Sincronizar circuitos'}
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Circuito</th>
              <th className="px-4 py-2 text-left">Día</th>
              <th className="px-4 py-2 text-left">Horario</th>
              <th className="px-4 py-2 text-center">Inscriptos</th>
              <th className="px-4 py-2 text-center">Cupo restante</th>
              <th className="px-4 py-2 text-center">Estado</th>
              <th className="px-4 py-2 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{s.circuito}</td>
                <td className="px-4 py-2">{s.dia}</td>
                <td className="px-4 py-2">{s.horario}</td>
                <td className="px-4 py-2 text-center">{s.cantidad_inscriptos}</td>
                <td className="px-4 py-2 text-center">{s.cupo_restante}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-1 border rounded-full text-xs font-medium ${colorEstado(
                      s.estado_cupo
                    )}`}
                  >
                    {s.estado_cupo}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#64748B] border border-gray-200 px-3 py-1 rounded hover:text-[#00B884] hover:border-[#00B884] transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Notion
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Sin enlace</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
