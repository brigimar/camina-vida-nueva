'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PlansAnimated() {
  return (
    <section id="planes" className="bg-gray-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Elegí tu plan</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { name: "Básico", price: "$5.000/mes", desc: "1 caminata semanal" },
          { name: "Popular", price: "$9.000/mes", desc: "3 caminatas semanales", highlight: true },
          { name: "Premium", price: "$12.000/mes", desc: "5 caminatas semanales" },
        ].map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className={`bg-white p-8 rounded-2xl shadow-lg text-center ${plan.highlight ? "border-4 border-green-600 transform scale-105" : ""}`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-extrabold text-green-700 mb-4">{plan.price}</p>
              <p className="text-gray-600 mb-6">{plan.desc}</p>
              <Link href="/inscripcion">
                <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl w-full transition-colors">
                  Elegir plan
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}