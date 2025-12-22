"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { circuitoSchema } from "@/lib/validators/circuitoSchema";

export default function CircuitoForm({ initialData, onSubmit, disabled }) {
  const safeDefaults = initialData
    ? {
        ...initialData,
        descripcion: initialData.descripcion ?? undefined,
        coordinador_nombre: initialData.coordinador_nombre ?? undefined,
        coordinador_foto: initialData.coordinador_foto ?? undefined,
        que_llevar: initialData.que_llevar ?? undefined,
        dificultad: initialData.dificultad ?? undefined,
        tiempo_estimado: initialData.tiempo_estimado ?? undefined,
        dias: initialData.dias ?? undefined,
        horarios: initialData.horarios ?? undefined,
      }
    : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: safeDefaults,
    resolver: zodResolver(circuitoSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          {...register("nombre")}
          className="border p-2 w-full"
          disabled={disabled}
        />
        {errors.nombre && (
          <p className="text-red-600 text-sm">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          {...register("descripcion")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Localidad</label>
        <input
          {...register("localidad")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Distancia (km)</label>
        <input
          type="number"
          step="0.1"
          {...register("distancia_km")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Punto de encuentro</label>
        <input
          {...register("punto_encuentro")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Estado</label>
        <input
          {...register("estado")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Coordinador</label>
        <input
          {...register("coordinador_nombre")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Foto del coordinador (URL)
        </label>
        <input
          {...register("coordinador_foto")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Qué llevar</label>
        <input
          {...register("que_llevar")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Dificultad</label>
        <input
          {...register("dificultad")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Tiempo estimado</label>
        <input
          {...register("tiempo_estimado")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Días</label>
        <input
          {...register("dias")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Horarios</label>
        <input
          {...register("horarios")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Activo</label>
        <input type="checkbox" {...register("activo")} disabled={disabled} />
      </div>

      <div>
        <label className="block text-sm font-medium">Cupo máximo</label>
        <input
          type="number"
          {...register("cupo_maximo")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Duración (minutos)</label>
        <input
          type="number"
          {...register("duracion_minutos")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Nivel</label>
        <input
          {...register("nivel")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Categoría</label>
        <input
          {...register("categoria")}
          className="border p-2 w-full"
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={disabled}
      >
        {disabled ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
