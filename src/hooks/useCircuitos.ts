"use client";

import { useEffect, useState } from "react";

export function useCircuitos(params = {}) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryString = new URLSearchParams(params).toString();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/circuitos?${queryString}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data ?? []);
        setPagination(json.pagination ?? null);
      })
      .finally(() => setLoading(false));
  }, [queryString]);

  return { data, pagination, loading };
}
