export default function CategoriasCaminaVida() {
  const categorias = [
    {
      id: "terapeuticas",
      titulo: "Caminatas Terapéuticas",
      emoji: "🌿",
      descripcion: "Bienestar emocional, reducción de estrés y mindfulness en movimiento.",
    },
    {
      id: "saludables",
      titulo: "Caminatas Saludables",
      emoji: "🟦",
      descripcion: "Actividad física accesible para crear hábito y constancia.",
    },
    {
      id: "fitness",
      titulo: "Caminatas Fitness",
      emoji: "🔥",
      descripcion: "Ritmo más intenso para mejorar condición física y quemar calorías.",
    },
    {
      id: "aventura",
      titulo: "Caminatas de Aventura",
      emoji: "🌄",
      descripcion: "Exploración de parques, reservas y senderos especiales.",
    },
    {
      id: "premium",
      titulo: "Caminatas Premium",
      emoji: "⭐",
      descripcion: "Experiencias únicas: amanecer, música, fotografía, brunch y más.",
    },
  ];

  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Tipos de Caminatas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categorias.map((c) => (
          <div
            key={c.id}
            className="p-6 bg-emerald-50 rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-3">{c.emoji}</div>
            <h3 className="text-xl font-semibold text-emerald-700">{c.titulo}</h3>
            <p className="text-gray-600 mt-2 text-sm">{c.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
