"use client";

import { useInscriptos } from "@/hooks/useInscriptos";
import { Database } from "@/types/supabase";

type InscripcionRow = Database["public"]["Tables"]["inscripciones"]["Row"];

export default function DashboardInscriptos() {
  const { data, loading } = useInscriptos();

  if (loading) return <p>Cargando inscriptos...</p>;

  return (
    <div>
      <h1>Inscriptos</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Circuito</th>
            <th>Sesión</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {(data ?? []).map((i: InscripcionRow) => (
            <tr key={i.id}>
              <td>{i.nombre || "—"}</td>
              <td>{i.email || "—"}</td>
              <td>{i.sesiones?.circuitos?.nombre || "—"}</td>
              <td>
                {i.sesiones?.fecha
                  ? new Date(i.sesiones.fecha).toLocaleDateString()
                  : "—"}
              </td>
              <td>{i.estado || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
