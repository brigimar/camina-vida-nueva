"use client";
import { motion } from "framer-motion";
import { FaWalking, FaArrowRight } from "react-icons/fa";

export default function HeroSection() {
  const handleBooking = () => {
    document.querySelector("#reserva")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative min-h-screen md:h-[70vh] flex items-center justify-center text-white overflow-hidden">
      {/* Imagen de fondo difuminada */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/gentevienecaminando.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>


      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pb-12 mt-32">
        {/* Ícono animado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-4"
        >
          <FaWalking className="h-12 w-12 text-emerald-200" />
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        >
          Caminata Terapéutica en Palermo
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl font-light mb-8 italic"
        >
          “Tu salud en movimiento.”
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto"
        >
          <p className="text-lg text-white">
  Este{" "}
  <span className="relative font-bold text-green-400 underline decoration-wavy animate-pulse drop-shadow-[0_0_6px_#22c55e]">
    13 de diciembre
  </span>{" "}
  te invitamos a participar de una experiencia diferente: una caminata saludable grupal en Palermo, y guiada por profesionales.
</p>


          <button
            onClick={handleBooking}
            className="group bg-white text-emerald-700 hover:bg-emerald-50 
                       font-bold py-3 px-8 rounded-full text-lg shadow-lg 
                       transition-transform transform hover:scale-105 inline-flex items-center gap-2"
          >
            ¡Reservá ahora!
            <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
          </button>
        </motion.div>
      </div>
    </header>
  );
}
