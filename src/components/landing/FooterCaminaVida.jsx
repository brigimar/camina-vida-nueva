"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function FooterCaminaVida() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FFFBF7] px-4 pb-4">
      {/* Contenedor Principal con estilo Burbuja */}
      <div className="bg-slate-900 text-white rounded-[3rem] md:rounded-[4rem] overflow-hidden">
        
        {/* ✅ Versión Desktop */}
        <div className="hidden md:grid max-w-7xl mx-auto px-12 py-20 grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif italic text-white leading-none">
              Camina <span className="text-[#FF5C35]">Vida</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
              Sembramos pasos, cosechamos salud y bienestar integral.
            </p>
            {/* Redes sociales estilizadas */}
            <div className="flex gap-4 text-xl">
              <a href="#" className="p-2 bg-white/5 rounded-xl text-white hover:bg-[#FF5C35] transition-all duration-300"><FaInstagram /></a>
              <a href="#" className="p-2 bg-white/5 rounded-xl text-white hover:bg-[#FF5C35] transition-all duration-300"><FaFacebook /></a>
              <a href="#" className="p-2 bg-white/5 rounded-xl text-white hover:bg-[#FF5C35] transition-all duration-300"><FaWhatsapp /></a>
            </div>
          </div>

          {/* NAVEGACIÓN */}
          <div>
            <h4 className="font-bold text-[#FF5C35] uppercase tracking-widest text-[10px] mb-6">Navegación</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li><Link href="/#categorias" className="hover:text-white transition-colors">Categorías</Link></li>
              <li><Link href="/#beneficios" className="hover:text-white transition-colors">Beneficios</Link></li>
              <li><Link href="/#metodo" className="hover:text-white transition-colors">Método</Link></li>
              <li><Link href="/circuitos" className="hover:text-white transition-colors">Circuitos</Link></li>
              <li><Link href="/#planes" className="hover:text-white transition-colors">Planes</Link></li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="font-bold text-[#FF5C35] uppercase tracking-widest text-[10px] mb-6">Contacto</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>info@caminavida.com.ar</li>
              <li>+54 9 11 2345 6789</li>
              <li className="pt-2 italic text-slate-500 font-serif">Buenos Aires, Argentina</li>
            </ul>
          </div>

          {/* LEGALES */}
          <div>
            <h4 className="font-bold text-[#FF5C35] uppercase tracking-widest text-[10px] mb-6">Legales</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>
        </div>

        {/* ✅ Versión Compacta Mobile */}
        <div className="md:hidden px-8 py-16 text-center space-y-10">
          <h3 className="text-3xl font-serif italic text-white">Camina Vida</h3>
          
          <div className="flex justify-center gap-6">
            <a href="#" className="p-4 bg-white/5 rounded-2xl text-white"><FaInstagram size={24} /></a>
            <a href="#" className="p-4 bg-white/5 rounded-2xl text-white"><FaFacebook size={24} /></a>
            <a href="#" className="p-4 bg-white/5 rounded-2xl text-white"><FaWhatsapp size={24} /></a>
          </div>

          <nav className="grid grid-cols-2 gap-4 text-slate-300 text-sm font-medium">
            <Link href="/#categorias">Categorías</Link>
            <Link href="/#beneficios">Beneficios</Link>
            <Link href="/#metodo">Método</Link>
            <Link href="/circuitos">Circuitos</Link>
          </nav>

          <div className="h-[1px] bg-white/10 w-full" />
          
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
            © {currentYear} Camina Vida • Todos los derechos reservados
          </p>
        </div>

        {/* Barra decorativa inferior */}
        <div className="h-2 bg-[#FF5C35] w-full opacity-80" />
      </div>
    </footer>
  );
}