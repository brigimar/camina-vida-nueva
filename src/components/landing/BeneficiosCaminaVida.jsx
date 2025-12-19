export default function BeneficiosCaminaVida() {
  const beneficios = [
    {
      titulo: "Menos dolor articular",
      descripcion: "Estiramientos y movimientos suaves que alivian el dolor.",
    },
    {
      titulo: "Circulación y corazón",
      descripcion: "Ejercicio moderado que mejora la salud cardiovascular.",
    },
    {
      titulo: "Baja ansiedad y estrés",
      descripcion: "Respiración y meditación para la tranquilidad.",
    },
    {
      titulo: "Comunidad y compromiso",
      descripcion: "Caminamos en grupo con compromiso y alegría.",
    },
  ];

  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Beneficios reales, respaldados por la experiencia
      </h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Más que una caminata: una experiencia terapéutica integral para tu cuerpo, mente y emociones.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {beneficios.map((b, i) => (
          <div
            key={i}
            className="p-6 bg-emerald-50 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-emerald-700">{b.titulo}</h3>
            <p className="text-gray-700 mt-2">{b.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
