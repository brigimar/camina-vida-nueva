import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase";

interface Props {
  params: { id: string };
}

export default async function CircuitoDetailPage({ params }: Props) {
  const supabase = await createSupabaseServer();

  const { data: circuito } = await supabase
    .from("circuitos")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!circuito) {
    return (
      <div className="p-6 bg-white rounded-xl shadow max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-2">Circuito no encontrado</h2>
        <p className="text-gray-600">No pudimos cargar este circuito.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Imagen grande estilo flyer */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        {circuito.imagen_url ? (
          <img
            src={circuito.imagen_url}
            alt={circuito.nombre}
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenido tipo flyer */}
      <div className="bg-white p-8 rounded-xl shadow space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {circuito.nombre}
          </h1>
          <p className="text-gray-600 text-lg mt-1">{circuito.localidad}</p>
        </div>

        {/* Badges tipo flyer */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            Nivel: {circuito.nivel ?? "Sin nivel"}
          </span>

          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {circuito.distancia_km} km
          </span>

          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
            Estado: {circuito.estado}
          </span>

          {circuito.activo && (
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
              Activo
            </span>
          )}
        </div>

        {/* Botón para editar */}
        <div className="pt-4">
          <Link
            href={`/dashboard/circuitos/edit/${circuito.id}`}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Editar circuito
          </Link>
        </div>
      </div>
    </div>
  );
}
