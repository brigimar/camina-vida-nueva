"use client";

import { useState, ChangeEvent } from "react";

interface CircuitosFiltersProps {
  onChange: (filters: {
    q: string;
    localidad: string;
    dificultad: string;
    activo: string;
  }) => void;
}

export default function CircuitosFilters({ onChange }: CircuitosFiltersProps) {
  const [filters, setFilters] = useState({
    q: "",
    localidad: "",
    dificultad: "",
    activo: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    onChange(updated);
  };

  return (
    <div className="flex gap-4 mb-4">

      <input
        name="q"
        placeholder="Buscar..."
        className="border p-2"
        onChange={handleChange}
      />

      <select name="localidad" className="border p-2" onChange={handleChange}>
        <option value="">Localidad</option>
        <option value="San Isidro">San Isidro</option>
        <option value="Tigre">Tigre</option>
      </select>

      <select name="dificultad" className="border p-2" onChange={handleChange}>
        <option value="">Dificultad</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <select name="activo" className="border p-2" onChange={handleChange}>
        <option value="">Estado</option>
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </select>

    </div>
  );
}
