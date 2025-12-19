"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Menu, X, ChevronDown, Activity, Zap, Mountain, 
  Sparkles, Map, Heart, Calendar, Wind, Sun, Compass 
} from "lucide-react";

export default function HeaderCaminaVida() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = `transition-colors duration-300 font-medium text-[13px] lg:text-sm ${
    scrolled ? "text-slate-600 hover:text-[#FF5C35]" : "text-white hover:text-orange-200"
  }`;

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-[#FFFBF7]/95 backdrop-blur-md py-2 shadow-sm border-b border-orange-50" 
          : "bg-transparent py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          
          {/* BLOQUE IZQUIERDO: LOGO (Movido aquí para no tapar el centro) */}
          <div className="flex-none pr-10">
            <Link href="/" className="block transition-all duration-500 transform hover:scale-105">
              <Image 
                src="/logo.webp" 
                alt="Logo Camina Vida" 
                width={scrolled ? 60 : 80} 
                height={scrolled ? 60 : 80} 
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* BLOQUE CENTRAL: Navegación */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            <div
              className="relative"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={() => setOpenMega(false)}
            >
              <button className={`flex items-center gap-1.5 py-4 ${navLinkStyle}`}>
                Categorías de Caminatas
                <ChevronDown size={14} className={`transition-transform duration-300 ${openMega ? "rotate-180" : ""}`} />
              </button>

              {/* MEGA MENU COMPLETO (Todas las categorías) */}
              <div className={`absolute left-0 top-full transition-all duration-300 ${
                openMega ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              }`}>
                <div className="w-[750px] bg-white shadow-2xl rounded-[2.5rem] p-10 grid grid-cols-3 gap-10 border border-orange-50">
                  
                  {/* Bienestar e Impacto */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold mb-6">Bienestar</h4>
                    <Link href="/circuitos?categoria=terapeuticas" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Heart size={18} className="text-orange-200 group-hover:text-[#FF5C35]" />
                      <span className="text-sm font-serif italic">Terapéuticas</span>
                    </Link>
                    <Link href="/circuitos?categoria=meditativas" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Wind size={18} className="text-blue-200 group-hover:text-blue-500" />
                      <span className="text-sm font-serif italic">Meditativas</span>
                    </Link>
                    <Link href="/circuitos?categoria=saludables" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Activity size={18} className="text-emerald-200 group-hover:text-emerald-500" />
                      <span className="text-sm font-serif italic">Saludables</span>
                    </Link>
                  </div>

                  {/* Intensidad y Aventura */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold mb-6">Intensidad</h4>
                    <Link href="/circuitos?categoria=fitness" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Zap size={18} className="text-yellow-200 group-hover:text-yellow-500" />
                      <span className="text-sm font-serif italic">Fitness / Cardio</span>
                    </Link>
                    <Link href="/circuitos?categoria=aventura" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Mountain size={18} className="text-stone-300 group-hover:text-stone-600" />
                      <span className="text-sm font-serif italic">Aventura Alta</span>
                    </Link>
                    <Link href="/circuitos?categoria=exploracion" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Compass size={18} className="text-slate-300 group-hover:text-slate-800" />
                      <span className="text-sm font-serif italic">Exploración</span>
                    </Link>
                  </div>

                  {/* Especiales */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold mb-6">Especiales</h4>
                    <Link href="/circuitos?categoria=premium" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Sparkles size={18} className="text-amber-300 group-hover:text-amber-500" />
                      <span className="text-sm font-serif italic font-bold">Experiencias Premium</span>
                    </Link>
                    <Link href="/circuitos?categoria=grupales" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <Sun size={18} className="text-orange-200 group-hover:text-orange-500" />
                      <span className="text-sm font-serif italic">Sociales / Grupos</span>
                    </Link>
                    <hr className="border-orange-50 my-2" />
                    <Link href="/circuitos" className="flex items-center gap-3 text-[#FF5C35] font-bold hover:translate-x-1 transition-transform">
                      <Map size={18} />
                      <span className="text-xs uppercase tracking-tighter">Ver Mapa Completo</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/#beneficios" className={navLinkStyle}>Beneficios</Link>
            <Link href="/#metodo" className={navLinkStyle}>Nuestro Método</Link>
          </nav>

          {/* BLOQUE DERECHO: Acciones */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#planes" className={navLinkStyle}>Planes</Link>
            <Link
              href="/reservar/1"
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold transition-all duration-300 active:scale-95 ${
                scrolled 
                  ? "bg-[#FF5C35] text-white shadow-lg shadow-orange-100 hover:bg-[#e44d2a]" 
                  : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-[#FF5C35]"
              }`}
            >
              <Calendar size={16} />
              Reservar
            </Link>
          </div>

          {/* MÓVIL TRIGGER */}
          <div className="md:hidden flex-1 flex justify-end">
            <button 
              onClick={() => setOpenMobile(true)} 
              className={`p-2 transition-colors ${scrolled ? "text-slate-800" : "text-white"}`}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE ASIDE (Sin cambios, ya funciona bien) */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-[#FFFBF7] shadow-2xl z-[70] p-10 transform transition-transform duration-500 ease-out ${
          openMobile ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-between items-center mb-12">
          <Image src="/logo.webp" alt="Logo" width={60} height={60} />
          <button onClick={() => setOpenMobile(false)} className="text-slate-400 hover:text-[#FF5C35]">
            <X size={32} />
          </button>
        </div>
        <nav className="flex flex-col gap-8 text-2xl font-serif">
          <Link href="/circuitos" onClick={() => setOpenMobile(false)} className="text-slate-800 italic">Caminatas</Link>
          <Link href="/#beneficios" onClick={() => setOpenMobile(false)} className="text-slate-800 italic">Beneficios</Link>
          <Link href="/#metodo" onClick={() => setOpenMobile(false)} className="text-slate-800 italic">Método</Link>
          <Link href="/#planes" onClick={() => setOpenMobile(false)} className="text-slate-800 italic">Planes</Link>
        </nav>
        <Link
          href="/reservar/1"
          onClick={() => setOpenMobile(false)}
          className="block mt-16 px-6 py-5 bg-[#FF5C35] text-white rounded-[2rem] font-bold text-center shadow-xl shadow-orange-100"
        >
          Reservar ahora
        </Link>
      </aside>
    </>
  );
}