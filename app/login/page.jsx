"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    // Usamos fetch pero enviamos cookies para que el Set-Cookie del servidor
    // sea aceptado por el navegador. Si el endpoint devuelve una redirección
    // (303), navegamos manualmente a la URL final para que la página cargue.
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
      credentials: "include",
      redirect: "follow",
    });

    if (!res.ok) {
      // solo intentamos leer JSON si realmente hay un error
      try {
        const data = await res.json();
        setError(data.error || "Error de login");
      } catch {
        setError("Error de login");
      }
      return;
    }

    // Si el fetch siguió una redirección, navegamos al URL final para
    // que el navegador cargue /dashboard y use las cookies que el servidor
    // pudo haber seteado.
    if (res.redirected) {
      window.location.href = res.url;
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Entrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
