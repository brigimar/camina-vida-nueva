"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inscripcion, Circuito } from '@/types';

interface Props {
  initialData?: Partial<Inscripcion>;
  inscripcionId?: string;
}

export default function InscripcionForm({ initialData, inscripcionId }: Props) {
  const [form, setForm] = useState<Partial<Inscripcion>>(initialData || {});
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/circuitos?limit=100')
      .then((r) => r.json())
      .then((d) => setCircuitos(d?.data ?? d ?? []))
      .catch(() => setCircuitos([]));
  }, []);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const method = inscripcionId ? 'PUT' : 'POST';
    const url = inscripcionId ? `/api/inscripciones/${inscripcionId}` : '/api/inscripciones';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    router.push('/dashboard/inscripciones');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-xl">
      <div className="grid grid-cols-1 gap-4">
        <input name="nombre" value={(form.nombre as string) || ''} onChange={handleChange} placeholder="Nombre" className="input" />
        <input name="apellido" value={(form.apellido as string) || ''} onChange={handleChange} placeholder="Apellido" className="input" />
        <input name="email" value={(form.email as string) || ''} onChange={handleChange} placeholder="Email" className="input" />
        <input name="telefono" value={(form.telefono as string) || ''} onChange={handleChange} placeholder="Teléfono" className="input" />

        <select name="circuito_id" value={(form.circuito_id as any) ?? ''} onChange={handleChange} className="input">
          <option value="">Seleccionar circuito</option>
          {circuitos.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <input name="fecha" type="date" value={(form.fecha as string)?.split('T')?.[0] ?? ''} onChange={handleChange} className="input" />

        <select name="estado" value={(form.estado as string) || 'pendiente'} onChange={handleChange} className="input">
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">{inscripcionId ? 'Guardar cambios' : 'Crear'}</button>
    </form>
  );
}
