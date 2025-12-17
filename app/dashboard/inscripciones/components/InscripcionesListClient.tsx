"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Inscripcion, Circuito } from '@/types';

interface Props {
  initialInscripciones: Inscripcion[];
  initialCircuitos?: Circuito[];
}

export default function InscripcionesListClient({ initialInscripciones, initialCircuitos = [] }: Props) {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>(initialInscripciones || []);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Map de circuitos para referencia (del join correcto: inscripciones -> sesiones -> circuitos)
  const circuitosMap = Object.fromEntries(
    (initialInscripciones || [])
      .map((i: any) => [i.sesiones?.circuitos?.id, i.sesiones?.circuitos?.nombre])
      .filter(([id]) => id)
  );

  const handleDelete = async (id: string) => {
    if (!confirm('¿Borrar esta inscripción?')) return;
    setLoadingId(id);

    const res = await fetch(`/api/inscripciones/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setInscripciones((prev) => prev.filter((i) => i.id !== id));
    } else {
      console.error('Error borrando inscripción');
    }

    setLoadingId(null);
  };

  if (!inscripciones) return <p>Cargando...</p>;

  return (
    <table className="w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Nombre</th>
          <th className="p-3">Email</th>
          <th className="p-3">Circuito</th>
          <th className="p-3">Sesión</th>
          <th className="p-3">Estado</th>
          <th className="p-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {inscripciones.map((ins: any) => (
          <tr key={ins.id} className="border-t">
            <td className="p-3">{ins.nombre} {ins.apellido}</td>
            <td className="p-3">{ins.email}</td>
            <td className="p-3">{ins.sesiones?.circuitos?.nombre || '—'}</td>
            <td className="p-3">{ins.sesiones?.fecha ? new Date(ins.sesiones.fecha).toLocaleDateString() : '—'}</td>
            <td className="p-3 capitalize">{ins.estado}</td>
            <td className="p-3 flex gap-3">
              <Link href={`/dashboard/inscripciones/show/${ins.id}`} className="text-blue-600">Ver</Link>
              <Link href={`/dashboard/inscripciones/edit/${ins.id}`} className="text-green-600">Editar</Link>
              <button onClick={() => handleDelete(ins.id)} className="text-red-600" disabled={loadingId === ins.id}>
                {loadingId === ins.id ? 'Borrando...' : 'Borrar'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
