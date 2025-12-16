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
  const [form, setForm] = useState<Partial<Coordinador>>(initialData || {});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await subirFotoStaff(file);
    setForm({ ...form, foto: url });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const method = coordinadorId ? "PUT" : "POST";
    const url = coordinadorId
      ? `/api/coordinadores/${coordinadorId}`
      : `/api/coordinadores`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.href = "/dashboard/coordinadores";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        value={(form.nombre as string) || ""}
        onChange={handleChange}
        className="input"
      />

      <input type="file" accept="image/*" onChange={handleImage} />

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
        value={form.bio}
        onChange={handleChange}
        className="input"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  );
}
