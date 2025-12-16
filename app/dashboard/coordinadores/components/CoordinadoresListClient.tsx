"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coordinador } from "@/types";

interface Props {
  initialCoordinadores: Coordinador[];
}

export default function CoordinadoresListClient({ initialCoordinadores }: Props) {
  const [coordinadores, setCoordinadores] = useState<Coordinador[]>(
    initialCoordinadores || []
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Borrar este coordinador?")) return;
    setLoadingId(id);

    const res = await fetch(`/api/coordinadores/${id}`, { method: "DELETE" });

    if (res.ok) {
      setCoordinadores((prev) => prev.filter((c) => c.id !== id));
    } else {
      // Optionally show an error
      console.error("Error borrando coordinador");
    }

    setLoadingId(null);
  };

  if (!coordinadores) return <p>Cargando...</p>;

  return (
    <table className="w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Foto</th>
          <th className="p-3">Nombre</th>
          <th className="p-3">Bio</th>
          <th className="p-3">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {(coordinadores || []).map((coord) => (
          <tr key={coord.id} className="border-t">
            <td className="p-3">
              {coord.foto ? (
                <Image
                  src={coord.foto}
                  alt={coord.nombre}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200" />
              )}
            </td>

            <td className="p-3">{coord.nombre}</td>
            <td className="p-3 text-gray-600">{coord.bio || "—"}</td>

            <td className="p-3 flex gap-3">
              <Link
                href={`/dashboard/coordinadores/show/${coord.id}`}
                className="text-blue-600"
              >
                Ver
              </Link>

              <Link
                href={`/dashboard/coordinadores/edit/${coord.id}`}
                className="text-green-600"
              >
                Editar
              </Link>

              <button
                onClick={() => handleDelete(coord.id)}
                className="text-red-600"
                disabled={loadingId === coord.id}
              >
                {loadingId === coord.id ? "Borrando..." : "Borrar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
