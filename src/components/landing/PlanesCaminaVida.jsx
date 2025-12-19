"use client";

import { Check, ArrowRight } from "lucide-react";

export default function PlanesCaminaVida() {
  const planes = [
    { 
      nombre: "Inicio", 
      frase: "Para dar el primer paso",
      descripcion: "1 caminata semanal",
      detalles: ["Acceso a circuitos locales", "Guía profesional", "Grupo de WhatsApp"],
      destacado: false
    },
    { 
      nombre: "Constancia", 
      frase: "Nuestro plan más elegido",
      descripcion: "3 caminatas semanales",
      detalles: ["Todos los circuitos", "Talleres de respiración", "Prioridad en reservas", "Kit de bienvenida"],
      destacado: true
    },
    { 
      nombre: "Transformación", 
      frase: "Un cambio de vida total",
      descripcion: "Pase libre ilimitado",
      detalles: ["Acceso total", "Sesión 1 a 1 mensual", "Eventos premium", "Invitado gratis al mes"],
      destacado: false
    },
  ];

  return (
    <section id="planes" className="px-6 py-24 bg-[#FFFBF7]">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera */}
        <div className="text-center mb-20">
          <span className="text-[#FF5C35] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">
            Membresías
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
            Elegí tu ritmo de <span className="italic text-[#FF5C35]">bienestar</span>
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto">
            Planes flexibles diseñados para adaptarse a tu rutina y objetivos de salud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {planes.map((p, i) => (
            <div
              key={i}
              className={`relative p-10 rounded-[3rem] transition-all duration-500 flex flex-col ${
                p.destacado 
                  ? "bg-white shadow-[0_20px_60px_-15px_rgba(255,92,53,0.15)] border-2 border-[#FF5C35] scale-105 z-10" 
                  : "bg-white/50 border border-orange-100 shadow-sm hover:shadow-md"
              }`}
            >
              {p.destacado && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF5C35] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Recomendado
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-3xl font-serif text-slate-900 mb-2">{p.nombre}</h3>
                <p className="text-[#FF5C35] text-sm font-medium italic">{p.frase}</p>
              </div>

              <div className="mb-8">
                <p className="text-slate-800 font-bold text-xl">{p.descripcion}</p>
                <div className="w-10 h-1 bg-orange-100 mt-2 rounded-full" />
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {p.detalles.map((detalle, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm font-light">
                    <Check size={16} className="text-[#FF5C35] mt-0.5" />
                    {detalle}
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  p.destacado 
                    ? "bg-[#FF5C35] text-white shadow-lg shadow-orange-200 hover:bg-[#e44d2a]" 
                    : "bg-[#FFFBF7] text-[#FF5C35] border border-orange-100 hover:border-[#FF5C35]"
                }`}
              >
                Consultar valor
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-slate-400 text-sm italic font-light">
          * Todos los planes incluyen seguro médico y coordinación profesional.
        </p>
      </div>
    </section>
  );
}