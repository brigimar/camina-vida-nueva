'use client';
import { motion } from 'framer-motion';
import { HeartPulse, Users, CheckCircle } from 'lucide-react';

export default function BenefitsAnimated() {
  const benefits = [
    { title: "Reduce la ansiedad", desc: "Respirá mejor y bajá el estrés con prácticas simples.", icon: HeartPulse },
    { title: "Fortalece tus articulaciones", desc: "Mejora dolores de rodilla y espalda con movimiento suave.", icon: Users },
    { title: "Conectá con otros", desc: "Caminá acompañado y generá nuevos vínculos saludables.", icon: CheckCircle },
  ];

  return (
    <section id="beneficios" className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Beneficios para vos</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <b.icon className="mx-auto text-green-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}