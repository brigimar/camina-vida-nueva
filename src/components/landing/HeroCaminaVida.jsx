'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function HeroCaminaVida() {
  return (
    <section className="relative isolate min-h-[90dvh] flex items-center justify-center overflow-hidden">
      {/* IMAGEN DE FONDO (Mismo nombre conservado) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/gente.webp"
          alt="Personas caminando al aire libre"
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY ESTILO PREMIUM: Gradiente más sutil para resaltar la tipografía */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-slate-900/60
            via-slate-900/40
            to-brand-crema/90
          "
        />
      </div>

      {/* CONTENIDO EDITORIAL */}
      <div className="text-center px-6 max-w-5xl mx-auto mt-12">
        {/* Tag Superior */}
        <span className="inline-block text-[#FF5C35] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 animate-fadeInUp">
          Sembrá pasos, cosechá vida
        </span>

        {/* Título Principal con Fuente Serif */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] drop-shadow-sm animate-fadeInUp">
          Un espacio para <br />
          <span className="italic text-[#FF5C35]">recibir vida</span>
        </h1>

        {/* Bajada que condensa los beneficios */}
        <p className="mt-8 text-lg md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fadeInUp">
          Ganar **salud**, compartir el camino **con otros** y reconectar con tu bienestar integral a través del movimiento consciente.
        </p>

        {/* Botones de Acción */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeInUp">
          <a
            href="#planes"
            className="px-12 py-5 bg-[#FF5C35] text-white font-bold rounded-2xl shadow-xl shadow-orange-900/20 hover:bg-[#e44d2a] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Comenzar ahora
          </a>
          <a
            href="#metodo"
            className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all w-full sm:w-auto"
          >
            Nuestro método
          </a>
        </div>

        {/* Indicador de Scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce-slow">
          <ArrowDown size={24} />
        </div>
      </div>
    </section>
  );
}