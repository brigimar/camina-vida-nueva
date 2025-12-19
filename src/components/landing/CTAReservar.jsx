"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function CTAReservar() {
  return (
    <section className="px-6 py-24 bg-[#FFFBF7]">
      <div className="max-w-6xl mx-auto">
        {/* Contenedor Principal Estilo "Banner" */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center shadow-2xl shadow-slate-200">
          
          {/* Decoración de fondo sutil (gradiente de luz) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FF5C35]/20 via-transparent to-transparent opacity-40" />

          <div className="relative z-10 space-y-8">
            {/* Tag superior */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-[0.3em]">
                <Sparkles size={14} className="text-[#FF5C35]" />
                Tu momento es ahora
              </span>
            </div>

            {/* Título GIGANTE */}
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] max-w-4xl mx-auto">
              ¿Listo para dar tu <br />
              <span className="italic text-[#FF5C35]">primer paso?</span>
            </h2>

            {/* Descripción */}
            <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Unite a nuestra comunidad y descubrí cómo una caminata consciente puede transformar tu salud y tu humor. 
              <span className="text-white font-medium block mt-2">Reservá tu clase de prueba gratuita hoy mismo.</span>
            </p>

            {/* Botón de Acción Grande */}
            <div className="pt-8">
              <button className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#FF5C35] text-white rounded-3xl font-bold text-xl shadow-xl shadow-[#FF5C35]/20 hover:bg-white hover:text-[#FF5C35] hover:scale-105 transition-all duration-500">
                Reservar clase gratis
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </div>

            {/* Info adicional sutil */}
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest pt-4">
              Sin compromisos • Cupos limitados por grupo
            </p>
          </div>

          {/* Elementos decorativos abstractos (SVG IA Style) */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#FF5C35] rounded-full blur-[120px] opacity-20" />
        </div>
      </div>
    </section>
  );
}