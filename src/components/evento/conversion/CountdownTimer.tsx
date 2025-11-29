// src/app/components/conversion/CountdownTimer.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string; // ISO 8601 con zona horaria, ej. '2025-12-13T09:00:00-03:00'
}

const FlipUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-14 h-16 md:w-16 md:h-20 overflow-hidden bg-emerald-600/10 rounded-xl flex items-center justify-center border border-emerald-300/60">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="text-2xl md:text-3xl font-extrabold text-emerald-900"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="mt-2 text-xs md:text-sm font-medium text-emerald-800">
      {label}
    </span>
  </div>
);

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [isClient, setIsClient] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    hasEnded: boolean;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  } | null>(null);

  // Activa renderizado en cliente tras hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Lógica de cuenta regresiva (solo en cliente)
  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        return { hasEnded: true };
      }

      return {
        hasEnded: false,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    // Inicializa y actualiza cada segundo
    setTimeLeft(calculateTimeLeft());
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isClient, targetDate]);

  // Placeholder durante SSR o antes de hidratación → previene errores de hidratación
  if (!isClient || timeLeft === null) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-emerald-200 shadow-sm">
        <p className="text-center text-emerald-800 mb-5 font-semibold text-lg">
          ⏳ Últimos cupos disponibles
        </p>
        <div className="flex justify-center space-x-3 md:space-x-4">
          {['Días', 'Hrs', 'Min', 'Seg'].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-14 h-16 md:w-16 md:h-20 bg-emerald-200/50 rounded-xl animate-pulse" />
              <span className="mt-2 text-xs md:text-sm font-medium text-emerald-700 opacity-0">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Estado final: evento iniciado
  if (timeLeft.hasEnded) {
    return (
      <div className="bg-emerald-100 rounded-2xl p-6 mb-8 max-w-md mx-auto border border-emerald-300">
        <p className="text-center text-emerald-900 font-bold text-lg">
          🎉 ¡La caminata ya está en curso!
        </p>
        <p className="text-center text-emerald-800 mt-2 text-sm">
          Gracias por ser parte de esta experiencia.
        </p>
      </div>
    );
  }

  // Renderizado final en cliente
  return (
    <div className="bg-emerald-50 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-emerald-200 shadow-sm">
      <p className="text-center text-emerald-800 mb-5 font-semibold text-lg">
        ⏳ Últimos cupos disponibles
      </p>
      <div className="flex justify-center space-x-3 md:space-x-4">
        <FlipUnit value={timeLeft.days!} label="Días" />
        <FlipUnit value={timeLeft.hours!} label="Hrs" />
        <FlipUnit value={timeLeft.minutes!} label="Min" />
        <FlipUnit value={timeLeft.seconds!} label="Seg" />
      </div>
    </div>
  );
}