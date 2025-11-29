"use client";

import { FaArrowRight } from "react-icons/fa";

// Secciones principales
import HeroSection from "@/components/evento/sections/HeroSection";
import BenefitsSection from "@/components/evento/sections/BenefitsSection";
import MethodSection from "@/components/evento/sections/MethodSection";
import VideoEventFlex from "@/components/evento/sections/VideoEventFlex";
import SocialProof from "@/components/evento/sections/SocialProof";
import CaminaVidaSocial from "@/components/evento/sections/CaminaVidaSocial";
import EventDetails from "@/components/evento/sections/EventDetails";

// Conversión
import CountdownTimer from "@/components/evento/conversion/CountdownTimer";
import TrustBadges from "@/components/evento/conversion/TrustBadges";

// UI y formularios
import FloatingWhatsApp from "@/components/evento/ui/FloatingWhatsApp";
import InscripcionForm from "@/components/evento/forms/InscripcionForm";

export default function EventoPage() {
  const EVENT_DATE = "2025-12-13T09:00:00-03:00";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-cyan-50">
      {/* Hero principal */}
      <HeroSection />

      {/* Detalles del evento */}
      <EventDetails />

      {/* Beneficios terapéuticos */}
      <BenefitsSection />

      {/* Métodos */}
      <MethodSection />

      {/* Video + Detalles */}
      <VideoEventFlex />

      {/* Cuenta regresiva */}
      <CountdownTimer targetDate={EVENT_DATE} />

      {/* Trusted Badges */}
      <TrustBadges />

      {/* Testimonios */}
      <SocialProof />

      {/* Redes sociales */}
      <CaminaVidaSocial />

      {/* CTA Final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="text-2xl italic text-gray-700 mb-8 max-w-3xl mx-auto">
          “Una oportunidad para caminar, sanar y compartir vida.”
        </blockquote>
        <div className="bg-emerald-50 rounded-xl p-8 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <FloatingWhatsApp />
            <button
              onClick={() =>
                document.querySelector("#reserva")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex flex-col items-center justify-center gap-2 
                         bg-gradient-to-r from-orange-500 to-red-500 
                         hover:from-orange-600 hover:to-red-600 
                         text-white font-extrabold text-lg 
                         py-4 px-8 rounded-full shadow-xl 
                         transform hover:scale-105 transition-all duration-300"
            >
              🚶‍♀️ ¡Reservá tu lugar ahora!
              <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Cupos limitados — confirmación inmediata
          </p>
        </div>
      </section>

      {/* Formulario de inscripción */}
      <InscripcionForm />
    </div>
  );
}
