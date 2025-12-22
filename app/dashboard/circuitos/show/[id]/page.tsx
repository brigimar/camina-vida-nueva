export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createSupabaseServer } from "@/lib/supabase";

export default async function CircuitosShowPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const supabase = await createSupabaseServer();
  const { data: circuito } = await supabase
    .from("circuitos")
    .select("*")
    .eq("id", id)
    .single();
  if (!circuito) throw new Error("Circuito no encontrado");

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{circuito.nombre}</h1>
          <p className="text-gray-600">{circuito.descripcion}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/circuitos/edit/${circuito.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar
          </Link>
          <Link
            href="/dashboard/circuitos"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Volver
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Principal */}
        <div>
          <h2 className="text-xl font-bold mb-4">Información</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Localidad</p>
              <p className="font-medium">{circuito.localidad || "-"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Distancia</p>
              <p className="font-medium">{circuito.distancia_km} km</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Punto de Encuentro</p>
              <p className="font-medium">{circuito.punto_encuentro || "-"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Dificultad</p>
              <p className="font-medium">{circuito.dificultad || "-"}</p>
            </div>
            {circuito.duracion_minutos && (
              <div>
                <p className="text-gray-600 text-sm">Duración</p>
                <p className="font-medium">
                  {circuito.duracion_minutos} minutos
                </p>
              </div>
            )}
            {circuito.cupo_maximo && (
              <div>
                <p className="text-gray-600 text-sm">Cupo Máximo</p>
                <p className="font-medium">{circuito.cupo_maximo} personas</p>
              </div>
            )}
          </div>
        </div>

        {/* Coordinador */}
        <div>
          <h2 className="text-xl font-bold mb-4">Coordinador</h2>
          <div className="space-y-3">
            {circuito.coordinador_nombre && (
              <div>
                <p className="text-gray-600 text-sm">Nombre</p>
                <p className="font-medium">{circuito.coordinador_nombre}</p>
              </div>
            )}
            {circuito.coordinador_foto && (
              <div>
                <p className="text-gray-600 text-sm mb-2">Foto</p>
                <Image
                  src={circuito.coordinador_foto}
                  alt={circuito.coordinador_nombre || "Coordinador"}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Localización */}
      {(circuito.lat || circuito.lng) && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Localización</h2>
          <div className="grid grid-cols-2 gap-4">
            {circuito.lat && (
              <div>
                <p className="text-gray-600 text-sm">Latitud</p>
                <p className="font-medium font-mono">{circuito.lat}</p>
              </div>
            )}
            {circuito.lng && (
              <div>
                <p className="text-gray-600 text-sm">Longitud</p>
                <p className="font-medium font-mono">{circuito.lng}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Días de Operación */}
      {circuito.dias && circuito.dias.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Días de Operación</h2>
          <div className="flex flex-wrap gap-2">
            {circuito.dias.map((dia) => (
              <span
                key={dia}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {dia}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Qué Llevar */}
      {circuito.que_llevar && circuito.que_llevar.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Qué Llevar</h2>
          <ul className="list-disc list-inside space-y-1">
            {circuito.que_llevar.map((item) => (
              <li key={item} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Estado */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Estado</h2>
        <p className="mb-2">
          <span className="text-gray-600 text-sm">Estado:</span>{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              circuito.estado === "activo"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {circuito.estado || "Desconocido"}
          </span>
        </p>
        <p>
          <span className="text-gray-600 text-sm">Activo:</span>{" "}
          <span
            className={
              circuito.activo
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {circuito.activo ? "Sí" : "No"}
          </span>
        </p>
      </div>

      {/* Días y horarios */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Días y horarios</h2>
        <p className="text-gray-600">
          {circuito.dias?.join(", ") || "No especificado"}
        </p>
        <p className="text-gray-600">
          {circuito.horarios?.join(", ") || "No especificado"}
        </p>
      </div>

      {/* Ubicación */}
      {circuito.lat && circuito.lng && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Ubicación</h2>
          <iframe
            width="100%"
            height="300"
            className="rounded-lg"
            title="Mapa del circuito"
            src={`https://www.google.com/maps?q=${circuito.lat},${circuito.lng}&z=15&output=embed`}
          />
        </div>
      )}
    </div>
  );
}
