"use client";

import { MapPin, CalendarCheck, Ticket } from "lucide-react";

export default function ComoFuncionaCaminaVida() {
  const pasos = [
    {
      id: 1,
      titulo: "Encontrá tu circuito",
      descripcion: "Explorá las caminatas disponibles cerca de tu ubicación. Filtrá por barrio, intensidad y tipo de experiencia.",
      icon: <MapPin size={24} className="text-[#FF5C35]" strokeWidth={1.5} />,
    },
    {
      id: 2,
      titulo: "Elegí día y hora",
      descripcion: "Seleccioná el momento que mejor se adapte a tu rutina. Contamos con grupos por la mañana, tarde y ediciones especiales.",
      icon: <CalendarCheck size={24} className="text-[#FF5C35]" strokeWidth={1.5} />,
    },
    {
      id: 3,
      titulo: "Reservá y caminá",
      descripcion: "Asegurá tu lugar con un clic, recibí los detalles del punto de encuentro y presentate para disfrutar la experiencia.",
      icon: <Ticket size={24} className="text-[#FF5C35]" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="px-6 py-24 bg-[#FFFBF7]">
      <div className="max-w-7xl mx-auto">
        
        {/* Título Estilo OllaApp */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">
            Cómo funciona
          </h2>
          <div className="w-16 h-1 bg-[#FF5C35] mx-auto rounded-full" />
        </div>

        {/* Grid de Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pasos.map((paso) => (
            <div 
              key={paso.id} 
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] border border-orange-50/50 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500"
            >
              {/* Círculo del Icono */}
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {paso.icon}
              </div>

              {/* Contenido */}
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {paso.titulo}
              </h3>
              <p className="text-slate-500 leading-relaxed font-light">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Botón de Acción Inferior (Opcional) */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-[#FF5C35] font-bold hover:gap-3 transition-all">
            Comenzar a explorar circuitos 
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}