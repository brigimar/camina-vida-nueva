"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaWalking,
  FaLeaf,
  FaMapMarkedAlt,
  FaChevronDown,
  FaHeartbeat,
  FaMountain,
  FaStar,
} from "react-icons/fa";

export default function HeaderCaminaVida() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openMega, setOpenMega] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO CON logo.webp */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.webp" 
              alt="Logo Camina Vida" 
              width={45} 
              height={45} 
              priority
              className="object-contain"
            />
            </Link>

          {/* BOTÓN MOBILE */}
          <button
            onClick={() => setOpenMobile(true)}
            className="md:hidden text-3xl text-emerald-700"
          >
            <FaBars />
          </button>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium">

            {/* MEGA MENU */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={() => setOpenMega(false)}
            >
              <button
                className={`flex items-center gap-2 transition ${
                  openMega ? "text-emerald-600" : "hover:text-emerald-600"
                }`}
              >
                Categorías
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    openMega ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Wrapper para el menú desplegable */}
              <div className="absolute left-0 top-full pt-4">
                <div
                  className={`w-[600px] bg-white shadow-2xl rounded-2xl p-8 grid grid-cols-3 gap-6 border border-gray-100 transition-all duration-200 ${
                    openMega
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* Columna 1 */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 border-b pb-2">Bienestar</h4>
                    <Link
                      href="/circuitos?categoria=terapeuticas"
                      className="flex items-center gap-3 hover:text-emerald-600 transition"
                    >
                      <FaHeartbeat className="text-emerald-600" />
                      Terapéuticas
                    </Link>
                    <Link
                      href="/circuitos?categoria=saludables"
                      className="flex items-center gap-3 hover:text-emerald-600 transition"
                    >
                      <FaLeaf className="text-emerald-600" />
                      Saludables
                    </Link>
                  </div>

                  {/* Columna 2 */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 border-b pb-2">Actividad</h4>
                    <Link
                      href="/circuitos?categoria=fitness"
                      className="flex items-center gap-3 hover:text-emerald-600 transition"
                    >
                      <FaWalking className="text-emerald-600" />
                      Fitness
                    </Link>
                    <Link
                      href="/circuitos?categoria=aventura"
                      className="flex items-center gap-3 hover:text-emerald-600 transition"
                    >
                      <FaMountain className="text-emerald-600" />
                      Aventura
                    </Link>
                  </div>

                  {/* Columna 3 */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 border-b pb-2">Explorar</h4>
                    <Link
                      href="/circuitos?categoria=premium"
                      className="flex items-center gap-3 hover:text-emerald-600 transition"
                    >
                      <FaStar className="text-emerald-600" />
                      Premium
                    </Link>
                    <Link
                      href="/circuitos"
                      className="flex items-center gap-3 hover:text-emerald-600 transition"
                    >
                      <FaMapMarkedAlt className="text-emerald-600" />
                      Ver todos
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* LINKS NORMALES */}
            <Link href="/#beneficios" className="hover:text-emerald-600 transition">
              Beneficios
            </Link>
            <Link href="/#metodo" className="hover:text-emerald-600 transition">
              Método
            </Link>
            <Link href="/circuitos" className="hover:text-emerald-600 transition">
              Circuitos
            </Link>
            <Link href="/#planes" className="hover:text-emerald-600 transition">
              Planes
            </Link>
          </nav>

          {/* CTA DESKTOP */}
          <div className="hidden md:block">
            <Link
              href="/reservar/1"
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition-all transform hover:scale-105"
            >
              Reservar
            </Link>
          </div>
        </div>
      </header>

      {/* OVERLAY MOBILE */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
          openMobile ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMobile(false)}
      />

      {/* MENÚ MOBILE */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 p-6 transform transition-transform duration-300 ${
          openMobile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <Image src="/logo.webp" alt="Logo" width={35} height={35} />
          <button
            onClick={() => setOpenMobile(false)}
            className="text-3xl text-emerald-700"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-lg font-medium text-gray-700">
          <Link href="/#beneficios" onClick={() => setOpenMobile(false)} className="hover:text-emerald-600">
            Beneficios
          </Link>
          <Link href="/#metodo" onClick={() => setOpenMobile(false)} className="hover:text-emerald-600">
            Método
          </Link>
          <Link href="/circuitos" onClick={() => setOpenMobile(false)} className="hover:text-emerald-600">
            Circuitos
          </Link>
          <Link href="/#planes" onClick={() => setOpenMobile(false)} className="hover:text-emerald-600">
            Planes
          </Link>
        </nav>

        <Link
          href="/reservar/1"
          onClick={() => setOpenMobile(false)}
          className="block mt-10 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold text-center shadow-lg hover:bg-emerald-700 transition"
        >
          Reservar Ahora
        </Link>
      </aside>

      {/* CTA FLOTANTE MOBILE */}
      <Link
        href="/reservar/1"
        className="md:hidden fixed bottom-6 right-6 px-6 py-3 bg-emerald-600 text-white rounded-full shadow-2xl font-semibold z-40 active:scale-95 transition-transform"
      >
        Reservar
      </Link>
    </>
  );
}