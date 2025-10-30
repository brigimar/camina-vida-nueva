'use client';
import { motion } from 'framer-motion';

export default function TestimonialsAnimated({ testimonios }) {
  return (
    <section id="testimonios" className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros caminantes</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonios.slice(0, 2).map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-lg italic text-gray-700">“{t.testimonio}”</p>
              <p className="mt-4 font-medium text-right">— {t.nombre}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}