"use client";

import { useState } from "react";
import Link from "next/link";
import { Circuito } from "@/types";

export default function CircuitosListClient({
  initialCircuitos,
}: {
  initialCircuitos: Circuito[];
}) {
  const [circuitos, setCircuitos] = useState<Circuito[]>(initialCircuitos);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este circuito?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/circuitos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Error al eliminar circuito");
        return;
      }

      setCircuitos(circuitos.filter((c) => c.id !== id));
      alert("Circuito eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar circuito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      {circuitos.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No hay circuitos registrados</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Localidad</th>
              <th className="p-3">Distancia</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {circuitos.map((circuito) => (
              <tr key={circuito.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{circuito.nombre}</td>
                <td className="p-3">{circuito.localidad || "-"}</td>
                <td className="p-3">{circuito.distancia_km ? `${circuito.distancia_km} km` : "-"}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      circuito.estado === "activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {circuito.estado || "Desconocido"}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <Link
                    href={`/dashboard/circuitos/edit/${circuito.id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(circuito.id)}
                    disabled={loading}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:opacity-50"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
