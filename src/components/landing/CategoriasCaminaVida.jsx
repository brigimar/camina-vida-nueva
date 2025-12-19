"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CategoriasCaminaVida() {
  const scrollRef = useRef(null);

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-6 py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Tipos de Caminatas
            </h2>
            <p className="text-gray-600 max-w-xl">
              Diseñamos diferentes experiencias para que encuentres el ritmo que mejor se adapte a tu estilo de vida.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-4 rounded-full bg-white border border-gray-200 text-emerald-700 shadow-sm hover:bg-emerald-600 hover:text-white transition-all"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-4 rounded-full bg-white border border-gray-200 text-emerald-700 shadow-sm hover:bg-emerald-600 hover:text-white transition-all"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="hidden md:block min-w-[1px]" />

            {categorias.map((c) => (
              <div
                key={c.id}
                className="snap-center min-w-[280px] md:min-w-[320px] flex-shrink-0 p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 text-left group/card"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover/card:scale-110 transition-transform duration-300">
                  {c.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{c.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{c.descripcion}</p>
                <div className="w-10 h-1 bg-emerald-500 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity" />
              </div>
            ))}
            
            <div className="min-w-[20px] flex-shrink-0" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-50 to-transparent hidden md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-50 to-transparent hidden md:block" />
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest animate-pulse">
            Desliza para explorar →
          </span>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}