// components/HeroAnimated.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroAnimated() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
  className="relative w-full min-h-[80dvh] flex items-center justify-center text-center px-4"
  style={{
    backgroundColor: '#123524', // verde base
    backgroundImage: "url('/hero-bg.webp')",
    backgroundSize: 'cover', // ajusta al rectángulo
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay', // combina el verde y la imagen
    backgroundAttachment: 'scroll', // o 'fixed' si querés efecto parallax
    color: 'white',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.8s ease-out',
  }}
  aria-label="Caminatas Saludables: Tu medicina camina"
>
  <div
    className="max-w-4xl mx-auto space-y-6 bg-black/30 p-6 rounded-2xl"
    style={{
      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'transform 0.6s ease-out 0.2s, opacity 0.6s ease-out 0.2s',
      opacity: isVisible ? 1 : 0,
    }}
  >
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
      Sembrá pasos y Cosechá Vida!
    </h1>
    <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
      Una experiencia terapéutica que integra movimiento, estiramiento, respiración y meditación
      para mejorar tu salud física, emocional y social.
    </p>
    <Link
      href="#planes"
      className="inline-block px-6 py-3 bg-white text-[#123524] font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
      aria-label="Ver nuestros planes"
    >
      Conocé nuestros planes
    </Link>
  </div>
</section>

  );
}
