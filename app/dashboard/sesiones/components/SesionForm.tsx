"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sesion, Circuito } from '@/types';

interface Props {
  initialData?: Partial<Sesion>;
  sesionId?: string;
}

export default function SesionForm({ initialData, sesionId }: Props) {
  const [form, setForm] = useState<Partial<Sesion>>(initialData || {});
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
    const method = sesionId ? 'PUT' : 'POST';
    const url = sesionId ? `/api/sesiones/${sesionId}` : '/api/sesiones';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    router.push('/dashboard/sesiones');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-xl">
      <div className="grid grid-cols-1 gap-4">
        <select name="circuito_id" value={(form.circuito_id as any) ?? ''} onChange={handleChange} className="input">
          <option value="">Seleccionar circuito</option>
          {circuitos.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <input name="fecha" type="date" value={(form.fecha as string)?.split('T')?.[0] ?? ''} onChange={handleChange} className="input" />
        <input name="horario" value={(form.horario as string) || ''} onChange={handleChange} placeholder="Horario (ej: 08:00)" className="input" />
        <input name="cupo" type="number" value={(form.cupo as any) ?? ''} onChange={handleChange} placeholder="Cupo" className="input" />

        <select name="estado" value={(form.estado as string) || 'programada'} onChange={handleChange} className="input">
          <option value="programada">Programada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">{sesionId ? 'Guardar cambios' : 'Crear'}</button>
    </form>
  );
}
