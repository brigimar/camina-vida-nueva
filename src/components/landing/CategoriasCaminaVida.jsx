"use client";

import { useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Leaf, 
  Activity, 
  Zap, 
  Mountain, 
  Sparkles 
} from "lucide-react";

export default function CategoriasCaminaVida() {
  const scrollRef = useRef(null);

  const categorias = [
    {
      id: "terapeuticas",
      titulo: "Caminatas Terapéuticas",
      icon: <Leaf className="text-emerald-600" size={32} strokeWidth={1.5} />,
      descripcion: "Bienestar emocional, reducción de estrés y mindfulness en movimiento.",
    },
    {
      id: "saludables",
      titulo: "Caminatas Saludables",
      icon: <Activity className="text-blue-500" size={32} strokeWidth={1.5} />,
      descripcion: "Actividad física accesible para crear hábito y constancia.",
    },
    {
      id: "fitness",
      titulo: "Caminatas Fitness",
      icon: <Zap className="text-orange-500" size={32} strokeWidth={1.5} />,
      descripcion: "Ritmo más intenso para mejorar condición física y quemar calorías.",
    },
    {
      id: "aventura",
      titulo: "Caminatas de Aventura",
      icon: <Mountain className="text-stone-600" size={32} strokeWidth={1.5} />,
      descripcion: "Exploración de parques, reservas y senderos especiales.",
    },
    {
      id: "premium",
      titulo: "Caminatas Premium",
      icon: <Sparkles className="text-amber-500" size={32} strokeWidth={1.5} />,
      descripcion: "Experiencias únicas: amanecer, música, fotografía, brunch y más.",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-6 py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado con estilo editorial */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-widest uppercase text-xs">Experiencias</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
            Encuentra tu ritmo
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Propuestas diseñadas para conectar con la naturaleza y mejorar tu bienestar físico y mental.
          </p>
        </div>

        {/* Contenedor del Slider */}
        <div className="relative px-2 md:px-4">
          
          {/* Flecha Izquierda - Estilo Minimal */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 hidden lg:flex p-3 rounded-full bg-white shadow-md text-slate-400 hover:text-emerald-600 hover:shadow-xl transition-all duration-300 border border-slate-100"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categorias.map((c) => (
              <div
                key={c.id}
                className="snap-center min-w-[300px] md:min-w-[350px] flex-shrink-0 p-10 bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group"
              >
                {/* Icono con fondo suave */}
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                  {c.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
                  {c.titulo}
                </h3>

                <p className="text-slate-500 leading-relaxed text-base">
                  {c.descripcion}
                </p>

                <div className="mt-8 flex items-center text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explorar circuitos 
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Flecha Derecha - Estilo Minimal */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 hidden lg:flex p-3 rounded-full bg-white shadow-md text-slate-400 hover:text-emerald-600 hover:shadow-xl transition-all duration-300 border border-slate-100"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* Indicador visual móvil */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-emerald-500"></div>
          </div>
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