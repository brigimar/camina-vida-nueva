'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CalendarDays, Clock, Map, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CircuitoGrid({
  circuitos = [],
  mostrarBotonReserva = false,
  renderCardContent,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {circuitos.map((c, index) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group bg-white rounded-[3rem] overflow-hidden border border-orange-50/50 shadow-[0_10px_45px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
          >
            {/* Contenedor de Imagen */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={c.foto || '/images/circuitos/default.jpg'}
                alt={c.nombre}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FF5C35] shadow-sm">
                  {c.categoria || 'Caminata'}
                </span>
              </div>
            </div>

            {/* Cuerpo de la Tarjeta */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-[#FF5C35] mb-3">
                <MapPin size={14} strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {c.localidad}
                </span>
              </div>

              <h3 className="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-[#FF5C35] transition-colors">
                {c.nombre}
              </h3>

              {/* Info Grid - Estilo Minimalista */}
              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-3 text-slate-500 text-sm font-light">
                  <CalendarDays size={16} className="text-orange-200" />
                  <span>{Array.isArray(c.dias) ? c.dias.join(', ') : 'Sábados y Domingos'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm font-light">
                  <Clock size={16} className="text-orange-200" />
                  <span>{Array.isArray(c.horarios) ? c.horarios.join(', ') : '09:00 hs'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm font-light">
                  <Map size={16} className="text-orange-200" />
                  <span className="truncate">{c.punto_encuentro || 'Punto a coordinar'}</span>
                </div>
              </div>

              {/* Contenido Extra (Precio u otros) */}
              {renderCardContent && (
                <div className="mb-6 pt-4 border-t border-orange-50">
                  {renderCardContent(c)}
                </div>
              )}

              {/* Botón de Acción Estilo OllaApp */}
              <Link 
                href={`/circuitos/${c.id}`}
                className="w-full py-4 bg-[#FFFBF7] border border-orange-100 text-[#FF5C35] rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-[#FF5C35] group-hover:text-white transition-all duration-300"
              >
                Ver experiencia
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}