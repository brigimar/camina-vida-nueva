"use client";

import { useState } from "react";
import { Circuito } from "@/types";
import { useCircuitos } from "@/hooks/useCircuitos";
import CircuitosFilters from "./CircuitosFilters";

interface Pagination {
  page: number;
  pages: number;
  limit: number;
  total: number;
}

interface UseCircuitosResult {
  data: Circuito[];
  pagination: Pagination | null;
  loading: boolean;
}

export default function CircuitosTable() {
  const [filters, setFilters] = useState({});
  const { data, pagination, loading } = useCircuitos(filters) as UseCircuitosResult;

  return (
    <div>
      <CircuitosFilters onChange={setFilters} />

      {loading && <p>Cargando...</p>}

      {!loading && (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Localidad</th>
              <th>Distancia</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {(data || []).map((c: Circuito) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.localidad}</td>
                <td>{c.distancia_km} km</td>
                <td>{c.activo ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {pagination && (
        <p className="mt-4 text-sm text-gray-600">
          Página {pagination.page} de {pagination.pages}
        </p>
      )}
    </div>
  );
}
