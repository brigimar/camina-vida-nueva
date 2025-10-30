'use client';
import { motion } from 'framer-motion';

const steps = [
  { title: "Estiramientos", emoji: "🧘‍♂️" },
  { title: "Respiración", emoji: "🌬️" },
  { title: "Caminata", emoji: "🚶‍♀️" },
  { title: "Meditación", emoji: "🧠" },
  { title: "Cierre en grupo", emoji: "👥" },
];

export default function MethodAnimated() {
  return (
    <section id="metodo" className="bg-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Nuestro método en 5 pasos</h2>
      <div className="grid md:grid-cols-5 gap-6 text-center">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Emoji más suave */}
            <div className="text-[50px] mb-3 opacity-70">
              {step.emoji}
            </div>
            
            {/* Texto */}
            <p className="text-lg font-semibold text-gray-800">{step.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}