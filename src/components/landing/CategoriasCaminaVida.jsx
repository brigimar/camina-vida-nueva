'use client';

export default function CategoriasCaminaVida() {
  const categorias = [
    {
      id: 'terapeuticas',
      titulo: 'Caminatas Terapéuticas',
      emoji: '🌿',
      descripcion: 'Bienestar emocional, reducción de estrés y mindfulness en movimiento.',
    },
    {
      id: 'saludables',
      titulo: 'Caminatas Saludables',
      emoji: '🟦',
      descripcion: 'Actividad física accesible para crear hábito y constancia.',
    },
    {
      id: 'fitness',
      titulo: 'Caminatas Fitness',
      emoji: '🔥',
      descripcion: 'Ritmo más intenso para mejorar condición física y quemar calorías.',
    },
    {
      id: 'aventura',
      titulo: 'Caminatas de Aventura',
      emoji: '🌄',
      descripcion: 'Exploración de parques, reservas y senderos especiales.',
    },
    {
      id: 'premium',
      titulo: 'Caminatas Premium',
      emoji: '⭐',
      descripcion: 'Experiencias únicas: amanecer, música, fotografía, brunch y más.',
    },
  ];

  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Tipos de Caminatas
      </h2>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto">
        <div
          className="
            flex gap-6 overflow-x-auto pb-4
            snap-x snap-mandatory
            scroll-smooth
            scrollbar-hide
          "
        >
          {categorias.map((c) => (
            <div
              key={c.id}
              className="
                snap-center
                min-w-[260px]
                md:min-w-[280px]
                lg:min-w-[300px]
                flex-shrink-0
                p-6
                bg-emerald-50
                rounded-2xl
                border border-emerald-100
                shadow-sm
                hover:shadow-lg
                transition
                text-center
              "
            >
              <div className="text-4xl mb-4">{c.emoji}</div>

              <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                {c.titulo}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {c.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Hint visual */}
        <p className="mt-4 text-center text-sm text-gray-400 md:hidden">
          Deslizá para ver más →
        </p>
      </div>
    </section>
  );
}
