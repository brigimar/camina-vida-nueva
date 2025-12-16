"use client";

import { useInscriptos } from "@/hooks/useInscriptos";

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
            <th>DNI</th>
            <th>Circuito</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {data.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre} {i.apellido}</td>
              <td>{i.dni}</td>
              <td>{i.circuitos?.nombre}</td>
              <td>{i.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
