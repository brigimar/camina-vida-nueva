"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inscripcion } from "@/types";

interface Sesion {
  id: string;
  fecha: string;
  circuitos?: { nombre: string };
}

interface Props {
  initialData?: Partial<Inscripcion>;
  inscripcionId?: string;
}

export default function InscripcionForm({ initialData, inscripcionId }: Props) {
  const [form, setForm] = useState<Partial<Inscripcion>>(initialData || {});
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/sesiones?limit=100")
      .then((r) => r.json())
      .then((response) => setSesiones(response?.data?.data ?? []))
      .catch(() => setSesiones([]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = inscripcionId ? "PUT" : "POST";
    const url = inscripcionId
      ? `/api/inscripciones/${inscripcionId}`
      : "/api/inscripciones";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData?.error?.message || "Error guardando inscripción",
        );
      }

      setSuccess(
        inscripcionId ? "Inscripción actualizada" : "Inscripción creada",
      );
      setTimeout(() => router.push("/dashboard/inscripciones"), 1000);
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
        <input
          name="nombre"
          value={(form.nombre as string) || ""}
          onChange={handleChange}
          placeholder="Nombre"
          className="input"
          required
        />

        <input
          name="apellido"
          value={(form.apellido as string) || ""}
          onChange={handleChange}
          placeholder="Apellido"
          className="input"
        />

        <input
          name="dni"
          value={(form.dni as string) || ""}
          onChange={handleChange}
          placeholder="DNI"
          className="input"
        />

        <input
          name="email"
          value={(form.email as string) || ""}
          onChange={handleChange}
          placeholder="Email"
          className="input"
          type="email"
        />

        <input
          name="whatsapp"
          value={(form.whatsapp as string) || ""}
          onChange={handleChange}
          placeholder="WhatsApp"
          className="input"
        />

        <input
          name="edad"
          value={(form.edad as number) || ""}
          onChange={handleChange}
          placeholder="Edad"
          className="input"
          type="number"
        />

        {/* ✅ Seleccionar sesión - CAMBIÓ de circuito_id a sesion_id */}
        <select
          name="sesion_id"
          value={(form.sesion_id as string) ?? ""}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Seleccionar sesión</option>
          {sesiones.map((s) => (
            <option key={s.id} value={s.id}>
              {new Date(s.fecha).toLocaleDateString()} -{" "}
              {s.circuitos?.nombre || "Circuito sin nombre"}
            </option>
          ))}
        </select>

        <select
          name="estado"
          value={(form.estado as string) || "activo"}
          onChange={handleChange}
          className="input"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        {inscripcionId ? "Guardar cambios" : "Crear"}
      </button>
    </form>
  );
}
