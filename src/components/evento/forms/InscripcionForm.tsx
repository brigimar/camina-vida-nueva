"use client";
import { useState } from "react";

export default function InscripcionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    whatsapp: "",
    horario: "mañana",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/evento/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Inscripción enviada con éxito");
        setFormData({ nombre: "", edad: "", whatsapp: "", horario: "mañana" });
        if (onSuccess) onSuccess();
      } else {
        const error = await res.json();
        setMessage("❌ Error: " + (error.error ?? "Error al enviar inscripción"));
      }
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reserva" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Reserva tu lugar
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formData.edad}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <select
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition"
          >
            {loading ? "Enviando..." : "Confirmar reserva"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
