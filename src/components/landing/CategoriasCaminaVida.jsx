"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoriasEstiloOlla() {
  const scrollRef = useRef(null);

  const categorias = [
    {
      id: "terapeuticas",
      titulo: "Terapéuticas",
      img: "/img1.webp",
    },
    {
      id: "saludables",
      titulo: "Saludables",
      img: "/img2.webp",
    },
    {
      id: "fitness",
      titulo: "Fitness",
      img: "/img3.webp",
    },
    {
      id: "aventura",
      titulo: "Aventura",
      img: "/img4.webp",
    },
    {
      id: "premium",
      titulo: "Premium",
      img: "/img5.webp",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 320; // Ancho de tarjeta + gap
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-[#FFFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera Editorial */}
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
              Encontrá tu ritmo
            </h2>
            <p className="text-slate-500 font-light text-lg italic">
              Categorías diseñadas para conectar con tu bienestar.
            </p>
          </div>
          
          {/* Controles de Navegación Estilo Premium */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll("left")} 
              className="p-4 rounded-full border border-orange-100 bg-white text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all shadow-sm active:scale-90"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scroll("right")} 
              className="p-4 rounded-full border border-orange-100 bg-white text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all shadow-sm active:scale-90"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Contenedor del Swipe */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-10 pt-2 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="snap-center min-w-[280px] md:min-w-[320px] h-[450px] relative rounded-[3rem] overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-700"
            >
              {/* Imagen de fondo desde /public */}
              <img
                src={cat.img}
                alt={cat.titulo}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Overlay gradiente tipo OllaApp */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Contenido de la Tarjeta */}
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-[#FF5C35] text-xs font-bold uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  Explorar
                </span>
                <h3 className="text-white text-3xl font-bold tracking-tight mb-2">
                  {cat.titulo}
                </h3>
                {/* Línea decorativa CSS */}
                <div className="w-12 h-1 bg-[#FF5C35] rounded-full group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>

        {/* Indicador visual para móvil */}
        <div className="md:hidden flex justify-center mt-4">
          <div className="h-1 w-20 bg-orange-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF5C35] w-1/3 animate-pulse" />
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