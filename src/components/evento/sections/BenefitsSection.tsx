"use client";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaShieldAlt } from "react-icons/fa";

const benefits = [
  {
    icon: <FaLeaf className="h-8 w-8 text-emerald-600" />,
    title: "Bienestar emocional",
    desc: "Caminá acompañado y generá nuevos vínculos saludables.",
  },
  {
    icon: <FaUsers className="h-8 w-8 text-emerald-600" />,
    title: "Grupos reducidos",
    desc: "Máximo 15 personas con 2 coordinadores capacitados.",
  },
  {
    icon: <FaShieldAlt className="h-8 w-8 text-emerald-600" />,
    title: "Reduce la ansiedad",
    desc: "Respirá mejor y bajá el estrés caminando.",
  },
];

export default function BenefitsSection() {
  return (
    
    <section id="beneficios" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            ¿Por qué caminar con nosotros?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Las caminatas están pensadas para personas con sobrepeso, artrosis, ansiedad, depresión, diabetes o problemas cardíacos leves, o simplemente para quienes quieren sentirse mejor acompañados.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg border border-emerald-100 text-center"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
