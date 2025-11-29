// src/app/components/sections/MethodSection.tsx

'use client';

import { motion } from 'framer-motion';
import {
  FaDumbbell,           // ✅ Disponible
  FaLungs,              // ✅ Disponible
  FaPersonWalking,      // ✅ Disponible
  FaHandsPraying,       // ✅ Alternativa estable (antes: FaPray)
  FaPeopleGroup,        // ✅ Disponible
} from 'react-icons/fa6';

const steps = [
  {
    title: 'Estiramientos',
    description: 'Activamos el cuerpo con movimientos suaves y conscientes.',
    icon: <FaDumbbell className="text-2xl text-green-600" />,
  },
  {
    title: 'Respiración',
    description: 'Conectamos con el ritmo interno para relajar y enfocar.',
    icon: <FaLungs className="text-2xl text-blue-600" />,
  },
  {
    title: 'Caminata',
    description: 'Recorremos circuitos guiados al aire libre, en grupo.',
    icon: <FaPersonWalking className="text-2xl text-amber-600" />,
  },
  {
    title: 'Meditación',
    description: 'Integramos la experiencia con calma y atención plena.',
    icon: <FaHandsPraying className="text-2xl text-purple-600" />,
  },
  {
    title: 'Cierre en grupo',
    description: 'Compartimos sensaciones y fortalecemos vínculos positivos.',
    icon: <FaPeopleGroup className="text-2xl text-emerald-600" />,
  },
];

export default function MethodSection() {
  return (
    <section id="metodo" className="py-16 px-4 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            Nuestro método
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Pasos simples, resultados reales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
                ease: 'easeOut',
                type: 'spring',
                stiffness: 120,
              }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-sm group cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mb-4 p-3 rounded-full bg-gradient-to-br from-blue-50 to-green-50 group-hover:from-green-100 group-hover:to-blue-100 transition-colors duration-300"
              >
                {step.icon}
              </motion.div>

              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}