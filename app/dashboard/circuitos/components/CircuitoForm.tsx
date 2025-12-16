"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Circuito } from "@/types";
import { subirImagenCircuito } from "@/lib/subirImagenCircuito";

interface CircuitoFormProps {
  initialData?: Circuito;
  circuitoId?: string;
}

const DIFICULTADES = ["Fácil", "Moderado", "Difícil", "Muy Difícil"];
const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function CircuitoForm({
  initialData,
  circuitoId,
}: CircuitoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.imagen_circuito || ""
  );
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    nombre: initialData?.nombre || "",
    descripcion: initialData?.descripcion || "",
    localidad: initialData?.localidad || "",
    distancia_km: initialData?.distancia_km?.toString() || "",
    punto_encuentro: initialData?.punto_encuentro || "",
    dificultad: initialData?.dificultad || "Moderado",
    tiempo_estimado: initialData?.tiempo_estimado || "",
    duracion_minutos: initialData?.duracion_minutos?.toString() || "",
    cupo_maximo: initialData?.cupo_maximo?.toString() || "",
    lat: initialData?.lat?.toString() || "",
    lng: initialData?.lng?.toString() || "",
    coordinador_nombre: initialData?.coordinador_nombre || "",
    coordinador_foto: initialData?.coordinador_foto || "",
    que_llevar: initialData?.que_llevar || [],
    dias: initialData?.dias || [],
    horarios: initialData?.horarios || [],
    imagen_circuito: initialData?.imagen_circuito || "",
    estado: initialData?.estado || "activo",
    activo: initialData?.activo !== false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload image
    setUploadingImage(true);
    try {
      const url = await subirImagenCircuito(file);
      setForm({ ...form, imagen_circuito: url });
      setError(null);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Error al subir la imagen. Intenta de nuevo.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleArrayChange = (field: "dias" | "que_llevar", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const validateForm = (): boolean => {
    if (!form.nombre.trim()) {
      setError("El nombre es requerido");
      return false;
    }
    if (!form.localidad.trim()) {
      setError("La localidad es requerida");
      return false;
    }
    if (!form.distancia_km || Number(form.distancia_km) <= 0) {
      setError("La distancia debe ser mayor a 0");
      return false;
    }
    if (!form.punto_encuentro.trim()) {
      setError("El punto de encuentro es requerido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Parse numeric fields
      const payload = {
        ...form,
        distancia_km: Number(form.distancia_km),
        duracion_minutos: form.duracion_minutos
          ? Number(form.duracion_minutos)
          : null,
        cupo_maximo: form.cupo_maximo ? Number(form.cupo_maximo) : null,
        lat: form.lat ? Number(form.lat) : null,
        lng: form.lng ? Number(form.lng) : null,
      };

      const method = circuitoId ? "PUT" : "POST";
      const url = circuitoId
        ? `/api/circuitos/${circuitoId}`
        : `/api/circuitos`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || `Error al ${circuitoId ? "actualizar" : "crear"} circuito`
        );
      }

      router.push("/dashboard/circuitos");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre *
        </label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Caminata por la laguna"
          value={form.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          placeholder="Describe el circuito..."
          value={form.descripcion}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Localidad */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Localidad *
        </label>
        <input
          type="text"
          name="localidad"
          placeholder="Ej: San Martín de los Andes"
          value={form.localidad}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Grid: Distancia, Dificultad, Tiempo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Distancia (km) *
          </label>
          <input
            type="number"
            name="distancia_km"
            placeholder="0.0"
            value={form.distancia_km}
            onChange={handleChange}
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Dificultad
          </label>
          <select
            name="dificultad"
            value={form.dificultad}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DIFICULTADES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Duración (minutos)
          </label>
          <input
            type="number"
            name="duracion_minutos"
            placeholder="120"
            value={form.duracion_minutos}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Punto de Encuentro */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Punto de Encuentro *
        </label>
        <input
          type="text"
          name="punto_encuentro"
          placeholder="Ej: Plaza principal"
          value={form.punto_encuentro}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Grid: Lat, Lng, Cupo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Latitud
          </label>
          <input
            type="number"
            name="lat"
            placeholder="-40.1234"
            value={form.lat}
            onChange={handleChange}
            step="0.0001"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Longitud
          </label>
          <input
            type="number"
            name="lng"
            placeholder="-71.1234"
            value={form.lng}
            onChange={handleChange}
            step="0.0001"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Cupo Máximo
          </label>
          <input
            type="number"
            name="cupo_maximo"
            placeholder="20"
            value={form.cupo_maximo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Días */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Días de Operación
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DIAS.map((dia) => (
            <label key={dia} className="flex items-center">
              <input
                type="checkbox"
                checked={form.dias.includes(dia)}
                onChange={() => handleArrayChange("dias", dia)}
                className="mr-2"
              />
              <span className="text-sm">{dia}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Coordinador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre del Coordinador
          </label>
          <input
            type="text"
            name="coordinador_nombre"
            placeholder="Ej: Juan Pérez"
            value={form.coordinador_nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Foto del Coordinador (URL)
          </label>
          <input
            type="url"
            name="coordinador_foto"
            placeholder="https://..."
            value={form.coordinador_foto}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Imagen del Circuito */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Imagen del Circuito
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={uploadingImage}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        {uploadingImage && (
          <p className="text-sm text-blue-600 mt-2">Subiendo imagen...</p>
        )}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
            <Image
              src={imagePreview}
              alt="Preview"
              width={160}
              height={160}
              className="w-40 h-40 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Qué Llevar */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Qué Llevar
        </label>
        <div className="space-y-2">
          {["Agua", "Protector solar", "Gorro", "Zapatos deportivos", "Mochila"].map(
            (item) => (
              <label key={item} className="flex items-center">
                <input
                  type="checkbox"
                  checked={form.que_llevar.includes(item)}
                  onChange={() => handleArrayChange("que_llevar", item)}
                  className="mr-2"
                />
                <span className="text-sm">{item}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Estado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Estado
          </label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="pausado">Pausado</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm">Circuito Activo</span>
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? "Guardando..." : circuitoId ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
