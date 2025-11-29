"use client";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUserMd } from "react-icons/fa";

const badges = [
  {
    icon: <FaShieldAlt className="h-6 w-6 text-emerald-600" />,
    text: "Coordinadores capacitados",
  },
  {
    icon: <FaUserMd className="h-6 w-6 text-emerald-600" />,
    text: "Profesionales certificados",
  },
];

export default function TrustBadges() {
  return (
    <div className="flex gap-6 justify-center py-6">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.2,
            duration: 0.6,
            type: "spring",
            stiffness: 300,
          }}
          className="flex items-center gap-2 bg-white rounded-lg shadow-md px-4 py-2 border border-emerald-100"
        >
          {badge.icon}
          <span className="text-sm font-medium text-gray-700">{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
