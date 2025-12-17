import { useState, useEffect } from "react";

export function useInscriptos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inscripciones")
      .then((res) => res.json())
      .then((res) => {
        // ✅ Parseado correcto: el endpoint retorna { data: [...] }
        const inscripciones = res?.data?.data ?? res?.data ?? [];
        setData(Array.isArray(inscripciones) ? inscripciones : []);
      })
      .catch((err) => {
        console.error("Error fetching inscriptos:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
