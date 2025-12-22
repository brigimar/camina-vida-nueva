// components/Footer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-verde-oscuro text-white py-12"
      aria-label="Footer institucional"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Bloque superior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Marca institucional */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative shrink-0">
              <Image
                src="/logo-vida.png" // 👈 Asegúrate de que este archivo exista en /public/
                alt="Logo Camina Vida"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <h3 className="text-lg font-semibold">camina vida</h3>
              <p className="text-sm text-white/80">
                sembramos pasos, cosechamos vida
              </p>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                📧{" "}
                <a
                  href="mailto:info@caminavida.com.ar"
                  className="hover:underline"
                >
                  info@caminavida.com.ar
                </a>
              </li>
              <li>
                📱{" "}
                <a
                  href="https://wa.me/5491151501147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  +54 9 11-5150 1147
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/caminavidaagencia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                >
                  <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-6 h-6"
                    >
                      <defs>
                        <linearGradient
                          id="instaGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#instaGradient)"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7 71.7 32.1 71.7 71.7-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6s-57.9-34.5-93.6-36.2c-37-2.1-147.9-2.1-184.9 0-35.7 1.7-67.3 9.9-93.6 36.2S9.9 134.8 8.2 170.5c-2.1 37-2.1 147.9 0 184.9 1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c37 2.1 147.9 2.1 184.9 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c2.1-37 2.1-147.9 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"
                      />
                    </svg>
                  </span>
                  <span>@caminavidaagencia</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/people/Camina-Vida/61583594853264/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91V127.41c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.14 44.38-121.14 124.72v70.62H22.89V288h81.33v224h100.2V288z" />
                  </svg>
                  Camina Vida en Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Enlaces legales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legales</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link
                  href="/notion/2bb3438670178071b0a0fdb574ce9acd"
                  className="hover:underline text-white"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/notion/2bb34386701780038e5de589fde331ed"
                  className="hover:underline text-white"
                >
                  Consentimiento Informado
                </Link>
              </li>
              <li>
                <Link
                  href="/notion/2bb34386701780ea84dfea567474ac23"
                  className="hover:underline text-white"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie institucional */}
        <div className="border-t border-white/30 pt-8 text-center">
          <p className="text-xs text-white/50">
            © 2024 Camina Vida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
