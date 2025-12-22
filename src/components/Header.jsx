"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const router = useRouter();

  function irASeccionHome(ancla) {
    router.push(`/${ancla}`);
    setMenuAbierto(false);
  }

  return (
    <>
      {/* ✅ Fondo semitransparente */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Menú izquierdo */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-semibold text-muted">
            <button
              onClick={() => irASeccionHome("#beneficios")}
              className="hover:text-verde-oscuro transition"
            >
              Beneficios
            </button>
            <button
              onClick={() => irASeccionHome("#metodo")}
              className="hover:text-verde-oscuro transition"
            >
              Método
            </button>
            <Link
              href="/caminatas"
              className="hover:text-verde-oscuro transition"
            >
              Caminatas
            </Link>
          </nav>

          {/* ✅ Logo centrado */}
          <Link
            href="/"
            className="flex items-center gap-3 mx-auto"
            aria-label="Inicio Camina Vida"
          >
            <div className="relative w-[160px] h-[58px] sm:w-[192px] sm:h-[70px]">
              <Image
                src="/images/logo2.webp"
                alt="Logo Camina Vida"
                fill
                sizes="(min-width: 640px) 192px, 160px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Menú derecho */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-semibold text-muted">
            <button
              onClick={() => irASeccionHome("#planes")}
              className="hover:text-verde-oscuro transition"
            >
              Planes
            </button>
            <Link
              href="/notion/2bb3438670178038b792f0c060d491a1"
              className="hover:text-verde-oscuro transition"
            >
              Nosotros
            </Link>
            {/* ✅ Nuevo link 13/12 externo */}
            <a
              href="https://caminavida.com.ar/evento"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-verde-oscuro transition"
            >
              13/12
            </a>
            <LoginButton />
            <button
              onClick={() => setMostrarModal(true)}
              className="btn btn-small btn-primary"
            >
              Reservá
            </button>
          </nav>

          {/* Botón hamburguesa (móvil) */}
          <button
            className="md:hidden text-verde-oscuro"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuAbierto
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <button
              onClick={() => irASeccionHome("#beneficios")}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-muted hover:text-verde-oscuro rounded-lg transition"
            >
              Beneficios
            </button>
            <button
              onClick={() => irASeccionHome("#metodo")}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-muted hover:text-verde-oscuro rounded-lg transition"
            >
              Método
            </button>
            <Link
              href="/caminatas"
              onClick={() => setMenuAbierto(false)}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-muted hover:text-verde-oscuro rounded-lg transition"
            >
              Caminatas
            </Link>
            <button
              onClick={() => irASeccionHome("#planes")}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-muted hover:text-verde-oscuro rounded-lg transition"
            >
              Planes
            </button>
            <Link
              href="/nosotros"
              onClick={() => setMenuAbierto(false)}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-muted hover:text-verde-oscuro rounded-lg transition"
            >
              Nosotros
            </Link>
            {/* ✅ Nuevo link 13/12 externo en móvil */}
            <a
              href="https://caminavida.com.ar/evento"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuAbierto(false)}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-muted hover:text-verde-oscuro rounded-lg transition"
            >
              13/12
            </a>
            <div className="pt-2">
              <LoginButton />
            </div>
            <button
              onClick={() => {
                setMenuAbierto(false);
                setMostrarModal(true);
              }}
              className="mt-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-verde hover:bg-verde-oscuro rounded-lg transition"
            >
              Reservá
            </button>
          </div>
        )}
      </header>

      {/* Modal institucional */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-texto">
              Reservá tu clase prueba
            </h3>
            <p className="text-sm text-muted mb-4">
              Te redirigiremos a WhatsApp para confirmar tu reserva gratuita.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setMostrarModal(false)}
                className="text-sm text-muted hover:text-texto"
              >
                Cancelar
              </button>
              <a
                href="https://wa.me/5491151501147?text=Hola%20!%20Quiero%20reservar%20mi%20clase%20prueba"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-sm"
              >
                Ir a WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
