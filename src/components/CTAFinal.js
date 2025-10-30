'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTAFinal() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-6"
      >
        ¿Listo para tu primera caminata?
      </motion.h2>
      <Link href="/inscripcion">
        <button className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
          Reservar gratis ahora
        </button>
      </Link>
    </section>
  );
}