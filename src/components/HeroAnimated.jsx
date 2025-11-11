'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroAnimated() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // evita el render SSR hasta que el cliente monte
    return <div className="min-h-[80dvh] bg-[#123524]" />;
  }

  return (
    <section
      className="relative w-full min-h-[80dvh] flex items-center justify-center text-center px-4 overflow-hidden"
      style={{
        backgroundColor: '#123524',
        color: 'white',
        transition: 'opacity 0.8s ease-out',
      }}
      aria-label="Caminatas Saludables: Tu medicina camina"
    >
      <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
        style={{
          backgroundImage: "url('/images/grupo.webp')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 85%',
          backgroundSize: '95%',
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Sembrá pasos y Cosechá Vida!
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
          Una experiencia terapéutica que integra movimiento, estiramiento, respiración y meditación.
        </p>
        <Link
          href="#planes"
          className="inline-block px-6 py-3 bg-white text-[#123524] font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
        >
          Conocé nuestros planes
        </Link>
      </div>
    </section>
  );
}
