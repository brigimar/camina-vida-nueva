"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoriasEstiloOlla() {
  const scrollRef = useRef(null);

  const categorias = [
    { id: "terapeuticas", titulo: "Terapéuticas", img: "/img1.webp" },
    { id: "saludables", titulo: "Saludables", img: "/img3.webp" },
    { id: "fitness", titulo: "Fitness", img: "/img2.webp" },
    { id: "aventura", titulo: "Aventura", img: "/img5.webp" },
    { id: "premium", titulo: "Premium", img: "/img4.webp" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Calculamos el desplazamiento basado en el ancho visible para que sea fluido
      const scrollAmount = clientWidth * 0.8; 
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-[#FFFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera más compacta */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
              Encontrá tu <span className="italic text-[#FF5C35]">ritmo</span>
            </h2>
            <p className="text-slate-500 font-light text-sm italic">
              Conectá con tu bienestar.
            </p>
          </div>
          
          {/* Controles de Navegación: Visibles en todo momento */}
          <div className="flex gap-2">
            <button 
              onClick={() => scroll("left")} 
              className="p-3 rounded-full border border-orange-100 bg-white text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all shadow-sm active:scale-90"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")} 
              className="p-3 rounded-full border border-orange-100 bg-white text-[#FF5C35] hover:bg-[#FF5C35] hover:text-white transition-all shadow-sm active:scale-90"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Contenedor del Swipe: Altura reducida */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x snap-mandatory"
        >
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="snap-center min-w-[240px] md:min-w-[280px] h-[350px] relative rounded-[2.5rem] overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img
                src={cat.img}
                alt={cat.titulo}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2">
                  {cat.titulo}
                </h3>
                <div className="w-8 h-1 bg-[#FF5C35] rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}