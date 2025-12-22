"use client";

import useSWR from "swr";

interface CaminataHoy {
  id: string;
  hora: string;
  circuito_nombre: string;
  coordinador_nombre: string;
  inscriptos_confirmados: number;
  ocupacion: number;
  riesgo: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AgendaHoy() {
  const { data, error, isLoading } = useSWR<CaminataHoy[]>(
    "/api/dashboard/hoy",
    fetcher,
    {
      refreshInterval: 60000, // refresco cada minuto en UI
    },
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar</p>;
  if (!data) return <p>No hay datos disponibles</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Caminatas de hoy</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Hora
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Circuito
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Coordinador
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Inscriptos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Ocupación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Riesgo
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((caminata) => (
            <tr key={caminata.id}>
              <td className="px-6 py-4">{caminata.hora}</td>
              <td className="px-6 py-4">{caminata.circuito_nombre}</td>
              <td className="px-6 py-4">{caminata.coordinador_nombre}</td>
              <td className="px-6 py-4">{caminata.inscriptos_confirmados}</td>
              <td className="px-6 py-4">
                {Math.round(caminata.ocupacion * 100)}%
              </td>
              <td className="px-6 py-4">{caminata.riesgo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
