'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginButton from './LoginButton'; // 👈 nuevo import

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
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Marca con logo PNG */}
          <Link href="/" className="flex items-center gap-3" aria-label="Inicio Camina Vida">
            <div className="relative w-[160px] h-[58px] sm:w-[192px] sm:h-[70px]">
              <Image
                src="/images/logo1.png"
                alt="Logo Camina Vida"
                fill
                sizes="(min-width: 640px) 192px, 160px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Menú desktop */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-semibold text-muted">
            <button onClick={() => irASeccionHome('#beneficios')} className="hover:text-verde-oscuro transition">Beneficios</button>
            <button onClick={() => irASeccionHome('#metodo')} className="hover:text-verde-oscuro transition">Método</button>
            <button onClick={() => irASeccionHome('#circuitos')} className="hover:text-verde-oscuro transition">Circuitos</button>
            <button onClick={() => irASeccionHome('#planes')} className="hover:text-verde-oscuro transition">Planes</button>
            <Link href="/nosotros" className="hover:text-verde-oscuro transition">Nosotros</Link>

            {/* Botones de acción */}
            <LoginButton /> {/* 👈 login azul */}
            <button
              onClick={() => setMostrarModal(true)}
              className="btn btn-small btn-primary"
            >
              Reservá
            </button>
          </nav>

          {/* Botón hamburguesa */}
          <button
            className="md:hidden text-verde-oscuro"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuAbierto ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-semibold text-muted">
            <button onClick={() => irASeccionHome('#beneficios')}>Beneficios</button>
            <button onClick={() => irASeccionHome('#metodo')}>Método</button>
            <button onClick={() => irASeccionHome('#circuitos')}>Circuitos</button>
            <button onClick={() => irASeccionHome('#planes')}>Planes</button>
            <Link href="/nosotros" onClick={() => setMenuAbierto(false)}>Nosotros</Link>

            <LoginButton /> {/* 👈 también visible en móvil */}

            <button
              onClick={() => {
                setMenuAbierto(false);
                setMostrarModal(true);
              }}
              className="btn btn-primary w-full"
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
            <h3 className="text-lg font-semibold mb-4 text-texto">Reservá tu clase prueba</h3>
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
                href="https://wa.me/5491112345678?text=Hola%20!%20Quiero%20reservar%20mi%20clase%20prueba"
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
