"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sesion, Circuito } from "@/types";

interface Props {
  initialData?: Partial<Sesion>;
  sesionId?: string;
}

export default function SesionForm({ initialData, sesionId }: Props) {
  const [form, setForm] = useState<Partial<Sesion>>(initialData || {});
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/circuitos?limit=100")
      .then((r) => r.json())
      .then((response) => setCircuitos(response?.data?.data ?? []))
      .catch(() => setCircuitos([]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = sesionId ? "PUT" : "POST";
    const url = sesionId ? `/api/sesiones/${sesionId}` : "/api/sesiones";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error?.message || "Error guardando sesión");
      }

      setSuccess(sesionId ? "Sesión actualizada" : "Sesión creada");
      setTimeout(() => router.push("/dashboard/sesiones"), 1000);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow max-w-xl"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <select
          name="circuito_id"
          value={form.circuito_id ?? ""}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Seleccionar circuito</option>
          {circuitos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <input
          name="fecha"
          type="date"
          value={(form.fecha as string)?.split("T")?.[0] ?? ""}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          name="horario"
          type="time"
          value={(form.horario as string) || ""}
          onChange={handleChange}
          placeholder="Horario (ej: 08:00)"
          className="input"
          required
        />

        <input
          name="cupo"
          type="number"
          value={form.cupo ?? ""}
          onChange={handleChange}
          placeholder="Cupo"
          className="input"
          required
        />

        <select
          name="estado"
          value={(form.estado as string) || "programada"}
          onChange={handleChange}
          className="input"
        >
          <option value="programada">Programada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
        {sesionId ? "Guardar cambios" : "Crear"}
      </button>
    </form>
  );
}
