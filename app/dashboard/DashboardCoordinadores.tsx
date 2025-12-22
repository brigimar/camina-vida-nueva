"use client";

import { useCoordinadores } from "@/hooks/useCoordinadores";
import { Database } from "@/types/supabase";

type CoordinadorRow = Database["public"]["Tables"]["coordinadores"]["Row"];

export default function DashboardCoordinadores() {
  const { data, loading } = useCoordinadores();

  if (loading) return <p>Cargando coordinadores...</p>;

  return (
    <div>
      <h1>Coordinadores</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {(data ?? []).map((c: CoordinadorRow) => (
            <tr key={c.id}>
              <td>
                {c.nombre && c.apellido
                  ? `${c.nombre} ${c.apellido}`
                  : c.nombre || "—"}
              </td>
              <td>{c.dni || "—"}</td>
              <td>{c.email || "—"}</td>
              <td>{c.estado || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
