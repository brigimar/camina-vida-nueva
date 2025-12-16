"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Sesion, Circuito } from '@/types';

interface Props {
  initialSesiones: Sesion[];
  initialCircuitos?: Circuito[];
}

export default function SesionesListClient({ initialSesiones, initialCircuitos = [] }: Props) {
  const [sesiones, setSesiones] = useState<Sesion[]>(initialSesiones || []);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const circuitosMap = Object.fromEntries((initialCircuitos || []).map((c) => [c.id, c.nombre]));

  const handleDelete = async (id: string) => {
    if (!confirm('¿Borrar esta sesión?')) return;
    setLoadingId(id);

    const res = await fetch(`/api/sesiones/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setSesiones((prev) => prev.filter((s) => s.id !== id));
    } else {
      console.error('Error borrando sesión');
    }

    setLoadingId(null);
  };

  if (!sesiones) return <p>Cargando...</p>;

  return (
    <table className="w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Circuito</th>
          <th className="p-3">Fecha</th>
          <th className="p-3">Horario</th>
          <th className="p-3">Cupo</th>
          <th className="p-3">Estado</th>
          <th className="p-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sesiones.map((s) => (
          <tr key={s.id} className="border-t">
            <td className="p-3">{circuitosMap[s.circuito_id] || '—'}</td>
            <td className="p-3">{new Date(s.fecha).toLocaleDateString()}</td>
            <td className="p-3">{s.horario}</td>
            <td className="p-3">{s.cupo}</td>
            <td className="p-3 capitalize">{s.estado}</td>
            <td className="p-3 flex gap-3">
              <Link href={`/dashboard/sesiones/show/${s.id}`} className="text-blue-600">Ver</Link>
              <Link href={`/dashboard/sesiones/edit/${s.id}`} className="text-green-600">Editar</Link>
              <button onClick={() => handleDelete(s.id)} className="text-red-600" disabled={loadingId === s.id}>
                {loadingId === s.id ? 'Borrando...' : 'Borrar'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
