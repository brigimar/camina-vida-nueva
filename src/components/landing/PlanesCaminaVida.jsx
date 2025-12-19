export default function PlanesCaminaVida() {
  const planes = [
    { nombre: "Inicio", descripcion: "1 caminata semanal" },
    { nombre: "Constancia", descripcion: "3 caminatas semanales" },
    { nombre: "Transformación", descripcion: "5 caminatas semanales" },
  ];

  return (
    <section id="planes" className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Planes Camina Vida
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {planes.map((p, i) => (
          <div
            key={i}
            className="p-8 bg-emerald-50 rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <h3 className="text-2xl font-bold text-emerald-700">{p.nombre}</h3>
            <p className="text-gray-700 mt-3">{p.descripcion}</p>

            <button className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition">
              Consultar valor y disponibilidad
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
