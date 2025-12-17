import { useState, useEffect } from "react";

export function useCoordinadores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coordinadores")
      .then((res) => res.json())
      .then((res) => {
        // ✅ Parseado correcto: el endpoint retorna { data: [...] }
        const coordinadores = res?.data?.data ?? res?.data ?? [];
        setData(Array.isArray(coordinadores) ? coordinadores : []);
      })
      .catch((err) => {
        console.error("Error fetching coordinadores:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
