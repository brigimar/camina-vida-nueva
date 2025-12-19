"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Menu, X, ChevronDown, Activity, Zap, Mountain, 
  Sparkles, Map, Heart, Calendar 
} from "lucide-react";

export default function HeaderCaminaVida() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para cambiar el fondo del header al hacer scroll
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
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* BLOQUE IZQUIERDO: Navegación */}
          <nav className="hidden md:flex flex-1 items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={() => setOpenMega(false)}
            >
              <button className={`flex items-center gap-1.5 ${navLinkStyle}`}>
                Categorías
                <ChevronDown size={14} className={`transition-transform duration-300 ${openMega ? "rotate-180" : ""}`} />
              </button>

              {/* MEGA MENU: Estilo OllaApp (Burbuja) */}
              <div className={`absolute left-0 top-full pt-4 transition-all duration-300 ${
                openMega ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              }`}>
                <div className="w-[600px] bg-white shadow-2xl rounded-[2.5rem] p-8 grid grid-cols-3 gap-8 border border-orange-50">
                  {/* Bienestar */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Bienestar</h4>
                    <Link href="/circuitos?categoria=terapeuticas" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <div className="p-2 rounded-xl bg-orange-50 text-[#FF5C35] group-hover:bg-[#FF5C35] group-hover:text-white transition-all">
                        <Heart size={16} />
                      </div>
                      <span className="text-sm font-serif italic">Terapéuticas</span>
                    </Link>
                  </div>

                  {/* Actividad */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Actividad</h4>
                    <Link href="/circuitos?categoria=fitness" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Zap size={16} />
                      </div>
                      <span className="text-sm font-serif italic">Fitness</span>
                    </Link>
                  </div>

                  {/* Explorar */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Explorar</h4>
                    <Link href="/circuitos" className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] transition group">
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <Sparkles size={16} />
                      </div>
                      <span className="text-sm font-serif italic font-bold">Ver todos</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/#beneficios" className={navLinkStyle}>Beneficios</Link>
            <Link href="/#metodo" className={navLinkStyle}>Método</Link>
          </nav>

          {/* BLOQUE CENTRAL: LOGO (Crece/Achica con scroll) */}
          <div className="flex-none px-4">
            <Link href="/" className="block transition-all duration-500 transform hover:scale-105">
              <Image 
                src="/logo.webp" 
                alt="Logo Camina Vida" 
                width={scrolled ? 70 : 90} 
                height={scrolled ? 70 : 90} 
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* BLOQUE DERECHO: Acciones */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
            <Link href="/circuitos" className={navLinkStyle}>Circuitos</Link>
            <Link href="/#planes" className={navLinkStyle}>Planes</Link>
            <Link
              href="/reservar/1"
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold transition-all duration-300 active:scale-95 ${
                scrolled 
                  ? "bg-[#FF5C35] text-white shadow-lg shadow-orange-100 hover:bg-[#e44d2a]" 
                  : "bg-white text-[#FF5C35] hover:bg-orange-50"
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

      {/* MOBILE ASIDE: Adaptado al estilo Crema/Coral */}
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
          <Link href="/#beneficios" onClick={() => setOpenMobile(false)} className="text-slate-800 italic">Beneficios</Link>
          <Link href="/#metodo" onClick={() => setOpenMobile(false)} className="text-slate-800 italic">Método</Link>
          <Link href="/circuitos" onClick={() => setOpenMobile(false)} className="text-slate-800 italic">Circuitos</Link>
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