"use client";

import { motion } from "framer-motion";

export default function MetodoCaminaVida() {
  const pasos = [
    { 
      numero: "01",
      titulo: "Estiramientos", 
      descripcion: "Movimientos suaves para preparar el cuerpo y despertar la consciencia física." 
    },
    { 
      numero: "02",
      titulo: "Respiración", 
      descripcion: "Técnicas de pranayama para relajar el sistema nervioso y oxigenar cada célula." 
    },
    { 
      numero: "03",
      titulo: "Caminata", 
      descripcion: "Ejercicio moderado y consciente, conectando el ritmo del corazón con el entorno." 
    },
    { 
      numero: "04",
      titulo: "Meditación", 
      descripcion: "Momentos de silencio y atención plena para integrar el bienestar alcanzado." 
    },
    { 
      numero: "05",
      titulo: "Cierre en grupo", 
      descripcion: "Un espacio de reflexión y conexión humana para terminar la experiencia." 
    },
  ];

  return (
    <section id="metodo" className="px-6 py-24 bg-[#FFFBF7] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera */}
        <div className="mb-20">
          <span className="text-[#FF5C35] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">
            Nuestra Esencia
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
            Un método pensado para <br />
            <span className="italic text-[#FF5C35]">tu equilibrio integral</span>
          </h2>
        </div>

        {/* Contenedor de Pasos */}
        <div className="relative">
          {/* Línea decorativa de fondo (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-orange-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {pasos.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-start lg:items-center lg:text-center"
              >
                {/* Círculo con Número */}
                <div className="w-16 h-16 rounded-full bg-white border border-orange-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-[#FF5C35] group-hover:shadow-lg group-hover:shadow-orange-100 transition-all duration-500">
                  <span className="text-2xl font-serif text-[#FF5C35]">{p.numero}</span>
                </div>

                {/* Contenido */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-[#FF5C35] transition-colors">
                    {p.titulo}
                  </h3>
                  <div className="w-8 h-[2px] bg-orange-200 lg:mx-auto group-hover:w-16 transition-all duration-500" />
                  <p className="text-slate-500 font-light leading-relaxed text-sm">
                    {p.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decoración Inferior */}
        <div className="mt-20 flex justify-center">
          <div className="px-6 py-3 rounded-full bg-orange-50 border border-orange-100">
            <p className="text-[#FF5C35] text-xs font-bold uppercase tracking-widest">
              Experiencia de 120 minutos en total
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}