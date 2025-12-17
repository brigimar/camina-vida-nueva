import { useState, useEffect } from "react";

export function useUserRoles() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user-roles")
      .then((res) => res.json())
      .then((res) => {
        // ✅ Parseado correcto: el endpoint retorna { data: [...] }
        const roles = res?.data?.data ?? res?.data ?? [];
        setData(Array.isArray(roles) ? roles : []);
      })
      .catch((err) => {
        console.error("Error fetching user roles:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
