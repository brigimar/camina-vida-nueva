'use client';

import Image from 'next/image';

export default function HeroCaminaVida() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-camina-vida.jpg" // ⬅️ cambiá por tu imagen
          alt="Personas caminando al aire libre"
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY VARIABLE */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-emerald-900/70
            via-emerald-800/50
            to-white/80
          "
        />
      </div>

      {/* CONTENIDO */}
      <div className="text-center px-6 pt-24 pb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow">
          Camina Vida
        </h1>

        <p className="text-2xl md:text-3xl font-semibold text-emerald-100 mt-3 drop-shadow">
          Sembrá pasos y cosechá vida
        </p>

        <p className="text-emerald-50/90 mt-6 text-lg leading-relaxed max-w-2xl mx-auto drop-shadow">
          Una experiencia terapéutica que integra movimiento, estiramiento,
          respiración y meditación.
        </p>

        <div className="mt-10">
          <a
            href="#planes"
            className="
              inline-block
              px-10 py-4
              bg-emerald-600
              text-white
              font-semibold
              rounded-xl
              shadow-lg
              hover:bg-emerald-700
              transition
            "
          >
            Conocé nuestros planes
          </a>
        </div>
      </div>
    </section>
  );
}
