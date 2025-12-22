"use client";

import { useEffect, useState } from "react";
export default function DashboardResumen() {
  const [data, setData] = useState({
    admins: 0,
    coordinadores: 0,
    inscriptos: 0,
    circuitos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumen();
  }, []);

  const fetchResumen = async () => {
    try {
      const res = await fetch("/api/dashboard/resumen");
      if (!res.ok) throw new Error("Failed to fetch resumen");
      const result = await res.json();
      setData(result.data || {});
    } catch (error) {
      console.error("Error fetching resumen:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="bg-blue-100 p-4 rounded">
        <p className="text-gray-700">Admins</p>
        <p className="text-2xl font-bold">{data.admins}</p>
      </div>
      <div className="bg-green-100 p-4 rounded">
        <p className="text-gray-700">Coordinadores</p>
        <p className="text-2xl font-bold">{data.coordinadores}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded">
        <p className="text-gray-700">Inscriptos</p>
        <p className="text-2xl font-bold">{data.inscriptos}</p>
      </div>
      <div className="bg-purple-100 p-4 rounded">
        <p className="text-gray-700">Circuitos</p>
        <p className="text-2xl font-bold">{data.circuitos}</p>
      </div>
    </div>
  );
}
