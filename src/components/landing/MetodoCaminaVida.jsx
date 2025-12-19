export default function MetodoCaminaVida() {
  const pasos = [
    { titulo: "Estiramientos", descripcion: "Movimientos suaves para preparar el cuerpo." },
    { titulo: "Respiración", descripcion: "Técnicas para relajar y oxigenar." },
    { titulo: "Caminata", descripcion: "Ejercicio moderado y consciente." },
    { titulo: "Meditación", descripcion: "Atención plena para el bienestar." },
    { titulo: "Cierre en grupo", descripcion: "Reflexión y conexión con otros." },
  ];

  return (
    <section className="px-6 py-16 bg-emerald-50">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Nuestro método
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {pasos.map((p, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <h3 className="text-xl font-semibold text-emerald-700">{p.titulo}</h3>
            <p className="text-gray-600 mt-2">{p.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
