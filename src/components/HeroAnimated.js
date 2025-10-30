'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroAnimated() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20 px-6 text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Tu medicina camina</h1>
        <p className="max-w-2xl mx-auto text-lg mb-6 opacity-90">
          Caminatas guiadas con estiramientos, respiración y meditación. Más de 500 personas ya mejoraron su salud física y mental.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inscripcion">
            <button className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-lg text-lg transition-all duration-300 transform hover:scale-105">
              Probar gratis hoy
            </button>
          </Link>
          <Link href="#planes">
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-2xl text-lg transition-all duration-300">
              Ver planes
            </button>
          </Link>
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-10"></div>
    </section>
  );
}