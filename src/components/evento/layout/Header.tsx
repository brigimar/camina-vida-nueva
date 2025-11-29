"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSquare, setShowSquare] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowSquare(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 relative">
        
        {showSquare && (
  <div className="absolute left-4 top-0 w-24 h-32 hidden md:flex items-center justify-center transition-opacity duration-300">
  <img
    src="/logo-caminata.webp"
    alt="Logo Caminata 13-12"
    className="w-full h-full object-contain"
  />
</div>

)}


        {/* Menú desktop */}
        <nav className="hidden md:flex space-x-8 ml-32">
          <Link href="#beneficios" className="hover:text-green-700">Beneficios</Link>
          <Link href="#metodo" className="hover:text-green-700">Método</Link>
          <Link href="#testimonios" className="hover:text-green-700">Testimonios</Link>
          <Link href="#video" className="hover:text-green-700">Video</Link>
          <Link href="#reserva" className="hover:text-green-700 font-bold">Reserva</Link>
        </nav>

        {/* Botón Reserva */}
        <Link
          href="#reserva"
          className="hidden md:inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Reserva
        </Link>

        {/* Botón menú móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-green-700 ml-auto"
          aria-label="Abrir menú"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <Link href="#beneficios" onClick={() => setOpen(false)}>Beneficios</Link>
            <Link href="#metodo" onClick={() => setOpen(false)}>Método</Link>
            <Link href="#testimonios" onClick={() => setOpen(false)}>Testimonios</Link>
            <Link href="#video" onClick={() => setOpen(false)}>Video</Link>
            <Link
              href="#reserva"
              onClick={() => setOpen(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center"
            >
              Reserva
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
