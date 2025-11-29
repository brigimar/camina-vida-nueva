'use client';
import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white shadow-xl border-t border-orange-600 p-4 z-50 md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-base font-semibold leading-tight">Caminata Palermo</p>
          <p className="text-sm font-light">13 de Diciembre · $6.000</p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-orange-600 hover:bg-orange-100 font-bold py-2 px-4 rounded-full text-sm flex items-center gap-2 transition"
        >
          Reservar ahora
          <FaArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
