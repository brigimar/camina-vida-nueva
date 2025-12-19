import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function FooterCaminaVida() {
  return (
    <footer className="bg-emerald-900 text-emerald-50 mt-20">

      {/* ✅ Versión Desktop */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 py-16 grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-extrabold">Camina Vida</h3>
          <p className="mt-3 text-emerald-100">
            Sembramos pasos, cosechamos vida.
          </p>

          {/* Redes sociales */}
          <div className="flex gap-4 mt-6 text-2xl text-emerald-100">
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaFacebook /></a>
            <a href="#" className="hover:text-white transition"><FaWhatsapp /></a>
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <div>
          <h4 className="font-bold text-lg mb-3">Navegación</h4>
          <ul className="space-y-2 text-emerald-100">
            <li><Link href="/#categorias" className="hover:text-white">Categorías</Link></li>
            <li><Link href="/#beneficios" className="hover:text-white">Beneficios</Link></li>
            <li><Link href="/#metodo" className="hover:text-white">Método</Link></li>
            <li><Link href="/circuitos" className="hover:text-white">Circuitos</Link></li>
            <li><Link href="/#planes" className="hover:text-white">Planes</Link></li>
          </ul>
        </div>

        {/* CONTACTO */}
        <div>
          <h4 className="font-bold text-lg mb-3">Contacto</h4>
          <ul className="space-y-2 text-emerald-100">
            <li>info@caminavida.com.ar</li>
            <li>+54 9 11 2345 6789</li>
            <li>Buenos Aires, Argentina</li>
          </ul>
        </div>

        {/* LEGALES */}
        <div>
          <h4 className="font-bold text-lg mb-3">Legales</h4>
          <ul className="space-y-2 text-emerald-100">
            <li><Link href="/privacidad" className="hover:text-white">Política de Privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white">Términos y Condiciones</Link></li>
          </ul>
        </div>
      </div>

      {/* ✅ Versión Compacta Mobile */}
      <div className="md:hidden px-6 py-10 text-center space-y-6">

        <h3 className="text-2xl font-extrabold">Camina Vida</h3>

        {/* Redes sociales */}
        <div className="flex justify-center gap-6 text-3xl text-emerald-100">
          <a href="#" className="hover:text-white transition"><FaInstagram /></a>
          <a href="#" className="hover:text-white transition"><FaFacebook /></a>
          <a href="#" className="hover:text-white transition"><FaWhatsapp /></a>
        </div>

        <div className="flex flex-col gap-2 text-emerald-100 text-sm mt-4">
          <Link href="/#categorias" className="hover:text-white">Categorías</Link>
          <Link href="/#beneficios" className="hover:text-white">Beneficios</Link>
          <Link href="/#metodo" className="hover:text-white">Método</Link>
          <Link href="/circuitos" className="hover:text-white">Circuitos</Link>
          <Link href="/#planes" className="hover:text-white">Planes</Link>
        </div>

        <p className="text-xs text-emerald-200 mt-6">
          © {new Date().getFullYear()} Camina Vida. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
