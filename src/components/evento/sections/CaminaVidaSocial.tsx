// components/CaminaVidaSocial.tsx
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function CaminaVidaSocial() {
  return (
    <section className="bg-green-100 py-10 px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
        Camina Vida en las Redes Sociales
      </h2>
      <p className="text-green-700 mb-6 text-base md:text-lg">
        Seguinos, compartí y sumate a la comunidad que nos transforma caminando.
      </p>
      <div className="flex justify-center gap-8 text-green-800 text-4xl">
        <a
          href="https://www.threads.com/@caminavidaagencia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-600 transition-colors"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/share/17WeWALEJ9/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-blue-600 transition-colors"
        >
          <FaFacebookF />
        </a>
      </div>
    </section>
  );
}
