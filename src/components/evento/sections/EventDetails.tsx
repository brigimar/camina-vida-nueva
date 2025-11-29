"use client";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

const details = [
  {
    icon: <FaCalendarAlt className="inline mr-2 text-emerald-600 h-6 w-6" />,
    text: "Sábado 13 de diciembre de 2025 — 9:00hs y 15hs",
  },
  {
    icon: <FaMapMarkerAlt className="inline mr-2 text-emerald-600 h-6 w-6" />,
    text: "Bosques de Palermo — Lago de las Regatas",
  },
  {
    icon: <FaMoneyBillWave className="inline mr-2 text-emerald-600 h-6 w-6" />,
    text: "Arancel: $6.000 (incluye coordinación y materiales)",
  },
];

export default function EventDetails() {
  return (
    <section className="bg-green-50 py-12 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-xl font-semibold text-green-900 mb-6"
      >
        Detalles del evento
      </motion.h2>

      <div className="space-y-4 text-gray-800 text-lg">
        {details.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-2 bg-white/70 rounded-lg px-4 py-2 shadow-sm"
          >
            {item.icon}
            <span>{item.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
