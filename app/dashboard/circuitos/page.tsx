import Link from "next/link";
import { createSupabaseServer } from '@/lib/supabaseServer'

export default async function CircuitosPage() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("circuitos")
    .select("*")
    .order("nombre", { ascending: true });

  const circuitos = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Circuitos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {circuitos.map((circuito) => (
          <Link
            key={circuito.id}
            href={`/dashboard/circuitos/${circuito.id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Imagen */}
            {circuito.imagen_url ? (
              <img
                src={circuito.imagen_url}
                alt={circuito.nombre}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                Sin imagen
              </div>
            )}

            {/* Info */}
            <div className="p-4">
              <h2 className="text-xl font-bold">{circuito.nombre}</h2>
              <p className="text-gray-600 text-sm">{circuito.localidad}</p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                  {circuito.nivel ?? "Sin nivel"}
                </span>

                <span className="text-sm text-gray-700">
                  {circuito.distancia_km} km
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
