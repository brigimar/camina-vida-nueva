"use client";

import { useEffect, useState } from "react";

export function useCircuitos(params: Record<string, string | number | boolean> = {}) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Crear query string desde los parámetros
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => value)
        .map(([key, value]) => [key, String(value)])
    )
  ).toString();

  useEffect(() => {
    setLoading(true);

    const url = `/api/circuitos${queryString ? `?${queryString}` : ""}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data ?? []);
        setPagination(json.pagination ?? null);
      })
      .catch((err) => {
        console.error("Error fetching circuitos:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [queryString]);

  return { data, pagination, loading };
}
