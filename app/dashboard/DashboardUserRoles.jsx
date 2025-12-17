"use client";

import { useUserRoles } from "@/hooks/useUserRoles";

export default function DashboardUserRoles() {
  const { data, loading } = useUserRoles();

  if (loading) return <p>Cargando roles de usuarios...</p>;

  return (
    <div>
      <h1>Roles de Usuarios</h1>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Rol</th>
            <th>Asignado</th>
          </tr>
        </thead>

        <tbody>
          {(data ?? []).map((r: any) => (
            <tr key={r.id}>
              <td>{r.user_id || "—"}</td>
              <td>{r.role || "—"}</td>
              <td>{r.created_at ? new Date(r.created_at).toLocaleString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
