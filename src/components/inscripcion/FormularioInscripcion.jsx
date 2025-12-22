"use client";

import { useState } from "react";

export default function FormularioInscripcion({ circuito, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    circuito_id: circuito.id,
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const res = await fetch("/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "Error al inscribirse");
      } else {
        setMensaje("✅ Inscripción realizada con éxito");
        setTimeout(() => onSuccess?.(), 1200);
      }
    } catch (e) {
      console.error(e);
      setMensaje("Error inesperado");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        placeholder="Nombre"
        className="w-full border px-3 py-2 rounded"
        onChange={handleChange}
        required
      />

      <input
        name="apellido"
        placeholder="Apellido"
        className="w-full border px-3 py-2 rounded"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full border px-3 py-2 rounded"
        onChange={handleChange}
        required
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        className="w-full border px-3 py-2 rounded"
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Enviando..." : "Inscribirme"}
      </button>

      {mensaje && <p className="text-center text-sm mt-2">{mensaje}</p>}
    </form>
  );
}
