"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { Circuito } from "@/types";

interface CircuitoFormProps {
  initialData?: Partial<Circuito>;
  circuitoId?: string;
}

export default function CircuitoForm({
  initialData,
  circuitoId,
}: CircuitoFormProps) {
  const supabase = createSupabaseClient();

  const [nombre, setNombre] = useState(initialData?.nombre ?? "");
  const [localidad, setLocalidad] = useState(initialData?.localidad ?? "");
  const [distancia, setDistancia] = useState(initialData?.distancia_km ?? "");
  const [nivel, setNivel] = useState(initialData?.nivel ?? "Inicial");
  const [estado, setEstado] = useState(initialData?.estado ?? "activo");
  const [activo, setActivo] = useState(initialData?.activo ?? true);
  const [imagenUrl, setImagenUrl] = useState(initialData?.imagen_url ?? "");
  const [subiendo, setSubiendo] = useState(false);

  // ✅ Upload al bucket Circuitos
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setSubiendo(true);

      const filePath = `${circuitoId ?? "temp"}-${Date.now()}.${file.name.split(".").pop()}`;

      const { error: uploadError } = await supabase.storage
        .from("Circuitos")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        setSubiendo(false);
        return;
      }

      const { data } = supabase.storage
        .from("Circuitos")
        .getPublicUrl(filePath);
      setImagenUrl(data.publicUrl);
      setSubiendo(false);
    } catch (err) {
      console.error(err);
      setSubiendo(false);
    }
  };

  // ✅ Guardar circuito (crear o editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nombre,
      localidad,
      distancia_km: Number(distancia),
      nivel,
      estado,
      activo,
      imagen_url: imagenUrl,
    };

    if (circuitoId) {
      // ✅ Modo edición
      await supabase.from("circuitos").update(payload).eq("id", circuitoId);
    } else {
      // ✅ Modo creación
      await supabase.from("circuitos").insert(payload);
    }

    window.location.href = "/dashboard/circuitos";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-6"
    >
      <h2 className="text-2xl font-bold">
        {circuitoId ? "Editar circuito" : "Crear circuito"}
      </h2>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="Parque Central"
          required
        />
      </div>

      {/* Localidad */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Localidad
        </label>
        <input
          type="text"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="Ciudad"
          required
        />
      </div>

      {/* Distancia */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Distancia (km)
        </label>
        <input
          type="number"
          step="0.1"
          value={distancia}
          onChange={(e) => setDistancia(e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="3.5"
          required
        />
      </div>

      {/* Nivel */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nivel</label>
        <select
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option>Inicial</option>
          <option>Intermedio</option>
          <option>Avanzado</option>
        </select>
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="archivado">Archivado</option>
        </select>
      </div>

      {/* Activo */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={activo}
          onChange={(e) => setActivo(e.target.checked)}
        />
        <span className="text-sm text-gray-700">Circuito activo</span>
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Imagen del circuito
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mt-1"
        />
        {subiendo && (
          <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>
        )}
        {imagenUrl && (
          <img
            src={imagenUrl}
            alt="Preview"
            className="mt-3 w-full h-48 object-cover rounded"
          />
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        {circuitoId ? "Guardar cambios" : "Crear circuito"}
      </button>
    </form>
  );
}
