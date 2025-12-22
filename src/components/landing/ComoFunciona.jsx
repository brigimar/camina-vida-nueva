"use client";
import { MapPin, Calendar, Heart } from "lucide-react";

export default function ComoFunciona() {
  const pasos = [
    {
      id: "01",
      titulo: "Elegí tu circuito",
      desc: "Explorá nuestras caminatas terapéuticas, de fitness o aventura.",
      icon: <MapPin className="text-[#FF5C35]" size={24} />,
    },
    {
      id: "02",
      titulo: "Reservá tu lugar",
      desc: "Seleccioná la fecha que mejor te quede y asegurá tu cupo online.",
      icon: <Calendar className="text-[#FF5C35]" size={24} />,
    },
    {
      id: "03",
      titulo: "Recibí vida",
      desc: "Disfrutá de una experiencia guiada diseñada para tu bienestar.",
      icon: <Heart className="text-[#FF5C35]" size={24} />,
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#FFFBF7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {pasos.map((paso) => (
            <div key={paso.id} className="relative group">
              {/* Número de fondo decorativo */}
              <span className="absolute -top-10 -left-4 text-8xl font-serif italic text-orange-100/50 select-none">
                {paso.id}
              </span>

              <div className="relative z-10">
                <div className="mb-6 inline-flex p-4 bg-white rounded-2xl shadow-sm">
                  {paso.icon}
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-4">
                  {paso.titulo}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {paso.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
