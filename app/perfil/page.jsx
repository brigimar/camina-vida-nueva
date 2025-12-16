"use client";

import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Cargando perfil...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Mi Perfil</h1>

        <div style={styles.avatar}>
          {user.email[0].toUpperCase()}
        </div>

        <div style={styles.info}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.app_metadata?.role}</p>
        </div>

        <button style={styles.button} onClick={() => logout()}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
  },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#0070f3",
    color: "white",
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 20px",
    fontWeight: "bold",
  },
  info: {
    textAlign: "left",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
};
