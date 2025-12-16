"use client";

import { useUsuarios } from "@/hooks/useUsuarios";

export default function DashboardUsuarios() {
  const { data, loading } = useUsuarios();

  async function cambiarRol(user_id, role) {
    await fetch("/api/user-roles", {
      method: "POST",
      body: JSON.stringify({ user_id, role }),
    });
    location.reload();
  }

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h1>Usuarios</h1>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select
                  defaultValue={u.role}
                  onChange={(e) => cambiarRol(u.id, e.target.value)}
                >
                  <option value="admin">admin</option>
                  <option value="coordinador">coordinador</option>
                  <option value="inscripto">inscripto</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
