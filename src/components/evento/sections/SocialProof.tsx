"use client";
import { motion } from "framer-motion";

const testimonials = [
  "“Caminar en grupo me devolvió la energía y la alegría.”",
  "“Sentí más confianza y motivación al compartir la experiencia.”",
  "“La caminata me ayudó a reducir el estrés y conectar con otros.”",
];

export default function SocialProof() {
  return (
    <section id="testimonios" className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-2xl font-bold text-green-800 mb-8"
      >
        Testimonios
      </motion.h2>

      <div className="space-y-6 max-w-2xl mx-auto">
        {testimonials.map((quote, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3, duration: 0.8 }}
            className="text-gray-700 italic text-lg"
          >
            {quote}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
