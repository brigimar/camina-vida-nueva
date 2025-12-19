"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Leaf, 
  Activity, 
  Zap, 
  Mountain, 
  Sparkles, 
  Map,
  Heart
} from "lucide-react";

export default function HeaderCaminaVida() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openMega, setOpenMega] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
          
          {/* LADO IZQUIERDO: LINKS */}
          <nav className="hidden md:flex flex-1 items-center gap-8 text-slate-600 font-medium text-sm">
            <div
              className="relative"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={() => setOpenMega(false)}
            >
              <button className={`flex items-center gap-1.5 transition ${openMega ? "text-emerald-600" : "hover:text-emerald-600"}`}>
                Categorías
                <ChevronDown size={14} className={`transition-transform duration-300 ${openMega ? "rotate-180" : ""}`} />
              </button>

              {/* MEGA MENU MEJORADO */}
              <div className="absolute left-0 top-full pt-4">
                <div className={`w-[600px] bg-white shadow-2xl rounded-[2rem] p-8 grid grid-cols-3 gap-8 border border-slate-100 transition-all duration-300 ${
                    openMega ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}>
                  
                  <div className="space-y-4">
                    <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-50 pb-2">Bienestar</h4>
                    <Link href="/circuitos?categoria=terapeuticas" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition group text-sm">
                      <Heart size={18} strokeWidth={1.5} className="text-emerald-500 group-hover:scale-110 transition-transform" /> Terapéuticas
                    </Link>
                    <Link href="/circuitos?categoria=saludables" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition group text-sm">
                      <Activity size={18} strokeWidth={1.5} className="text-blue-500 group-hover:scale-110 transition-transform" /> Saludables
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-50 pb-2">Actividad</h4>
                    <Link href="/circuitos?categoria=fitness" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition group text-sm">
                      <Zap size={18} strokeWidth={1.5} className="text-orange-500 group-hover:scale-110 transition-transform" /> Fitness
                    </Link>
                    <Link href="/circuitos?categoria=aventura" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition group text-sm">
                      <Mountain size={18} strokeWidth={1.5} className="text-stone-500 group-hover:scale-110 transition-transform" /> Aventura
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-50 pb-2">Explorar</h4>
                    <Link href="/circuitos?categoria=premium" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition group text-sm">
                      <Sparkles size={18} strokeWidth={1.5} className="text-amber-500 group-hover:scale-110 transition-transform" /> Premium
                    </Link>
                    <Link href="/circuitos" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition group text-sm">
                      <Map size={18} strokeWidth={1.5} className="text-emerald-600 group-hover:scale-110 transition-transform" /> Ver todos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/#beneficios" className="hover:text-emerald-600 transition">Beneficios</Link>
            <Link href="/#metodo" className="hover:text-emerald-600 transition">Método</Link>
          </nav>

          {/* CENTRO: LOGO */}
          <div className="flex-none flex justify-center">
            <Link href="/" className="transition hover:opacity-80">
              <Image 
                src="/logo.webp" 
                alt="Logo Camina Vida" 
                width={70} 
                height={70} 
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* LADO DERECHO: LINKS + CTA */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
            <Link href="/circuitos" className="text-slate-600 font-medium text-sm hover:text-emerald-600 transition">Circuitos</Link>
            <Link href="/#planes" className="text-slate-600 font-medium text-sm hover:text-emerald-600 transition">Planes</Link>
            <Link
              href="/reservar/1"
              className="px-6 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:scale-105 transition-all"
            >
              Reservar
            </Link>
          </div>

          {/* BOTÓN MOBILE (Visible solo en móvil) */}
          <div className="md:hidden flex-1 flex justify-end">
            <button onClick={() => setOpenMobile(true)} className="text-emerald-700">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY MOBILE */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          openMobile ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMobile(false)}
      />

      {/* MENÚ MOBILE */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-8 transform transition-transform duration-500 ease-out ${
          openMobile ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-between items-center mb-12">
          <Image src="/logo.webp" alt="Logo" width={40} height={40} />
          <button onClick={() => setOpenMobile(false)} className="text-slate-400 hover:text-emerald-600 transition">
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-8 text-xl font-bold text-slate-800">
          <Link href="/#beneficios" onClick={() => setOpenMobile(false)}>Beneficios</Link>
          <Link href="/#metodo" onClick={() => setOpenMobile(false)}>Método</Link>
          <Link href="/circuitos" onClick={() => setOpenMobile(false)}>Circuitos</Link>
          <Link href="/#planes" onClick={() => setOpenMobile(false)}>Planes</Link>
        </nav>

        <Link
          href="/reservar/1"
          onClick={() => setOpenMobile(false)}
          className="block mt-12 px-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-center shadow-xl shadow-emerald-100"
        >
          Reservar Ahora
        </Link>
      </aside>
    </>
  );
}