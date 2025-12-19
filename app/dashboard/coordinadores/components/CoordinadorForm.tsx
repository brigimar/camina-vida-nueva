"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Coordinador } from "@/types";
import { subirFotoStaff } from "@/lib/subirFotoStaff";

interface CoordinadorFormProps {
  initialData?: Partial<Coordinador>;
  coordinadorId?: string;
}

export default function CoordinadorForm({
  initialData,
  coordinadorId,
}: CoordinadorFormProps) {
  const [form, setForm] = useState<any>(initialData || {});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await subirFotoStaff(file);
      setForm({ ...form, foto: url });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const method = coordinadorId ? "PUT" : "POST";
    const url = coordinadorId
      ? `/api/coordinadores/${coordinadorId}`
      : `/api/coordinadores`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error?.message || "Error guardando coordinador");
      }

      setSuccess(coordinadorId ? "Coordinador actualizado" : "Coordinador creado");
      setTimeout(() => {
        window.location.href = "/dashboard/coordinadores";
      }, 1000);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-xl space-y-4">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>}

      <input
        name="nombre"
        value={(form.nombre as string) || ""}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full input"
        required
      />

      <input
        name="apellido"
        value={(form.apellido as string) || ""}
        onChange={handleChange}
        placeholder="Apellido"
        className="w-full input"
        required
      />

      <input
        name="dni"
        value={(form.dni as string) || ""}
        onChange={handleChange}
        placeholder="DNI"
        className="w-full input"
        required
      />

      <input
        name="telefono"
        value={(form.telefono as string) || ""}
        onChange={handleChange}
        placeholder="Teléfono"
        className="w-full input"
      />

      <input
        name="email"
        type="email"
        value={(form.email as string) || ""}
        onChange={handleChange}
        placeholder="Email"
        className="w-full input"
      />

      <div>
        <label className="block text-sm font-medium mb-2">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full"
        />
      </div>

      {form.foto && (
        <Image
          src={form.foto as string}
          alt="Foto coordinador"
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded"
        />
      )}

      <textarea
        name="bio"
        value={(form.bio as string) || ""}
        onChange={handleChange}
        placeholder="Biografía"
        className="w-full input"
        rows={4}
      />

      <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        {coordinadorId ? "Guardar cambios" : "Crear coordinador"}
      </button>
    </form>
  );
}
