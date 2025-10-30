'use client';
import { motion } from 'framer-motion';
import { StretchHorizontal, Wind, Footprints, BrainCircuit, UsersRound } from 'lucide-react';

const steps = [
  { title: "Estiramientos", icon: StretchHorizontal, color: "text-blue-600" },
  { title: "Respiración", icon: Wind, color: "text-green-600" },
  { title: "Caminata", icon: Footprints, color: "text-orange-600" },
  { title: "Meditación", icon: BrainCircuit, color: "text-purple-600" },
  { title: "Cierre en grupo", icon: UsersRound, color: "text-red-600" },
];

export default function MethodLucide() {
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
            <step.icon className={`mb-3 ${step.color}`} size={40} />
            <p className="text-lg font-semibold text-gray-800">{step.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}