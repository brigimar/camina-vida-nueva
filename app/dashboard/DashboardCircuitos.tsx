"use client";

import { useState } from "react";
import { useCircuitos } from "@/hooks/useCircuitos";
import { Database } from "@/types/supabase";

type CircuitoRow = Database["public"]["Tables"]["circuitos"]["Row"];

export default function DashboardCircuitos() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("todos");

  const { data, meta, loading } = useCircuitos({
    page,
    limit: 10,
    search,
    estado,
  }) as {
    data: CircuitoRow[];
    meta: { page: number; pages: number };
    loading: boolean;
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Gestión de Circuitos</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="activo">Activos</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Localidad</th>
            <th>Distancia</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td>{c.localidad}</td>
              <td>{c.distancia_km} km</td>
              <td>{c.activo ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {meta && (
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </button>

          <span>
            Página {meta.page} de {meta.pages}
          </span>

          <button
            disabled={page === meta.pages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
