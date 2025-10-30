import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Caminatas Saludables | Tu Medicina Camina',
    template: '%s | Caminatas Saludables',
  },
  description: 'Únete a nuestras caminatas terapéuticas en San Justo y Castelar. Mejora tu salud física y emocional.',
  openGraph: {
    title: 'Caminatas Saludables | Tu Medicina Camina',
    description: 'Caminatas terapéuticas para mejorar tu salud física y emocional.',
    url: 'https://buenas-caminatas.vercel.app/',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Caminatas Saludables</h3>
            <p className="text-sm opacity-75">Movilidad con Sentido.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 hola@caminatassaludables.com</li>
              <li>📱 +54 9 11 1234-5678</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Legales</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/notion-page/privacy" className="text-blue-400 hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/notion-page/consent" className="text-blue-400 hover:underline">
                  Consentimiento Informado
                </Link>
              </li>
              <li>
                <Link href="/notion-page/terms" className="text-blue-400 hover:underline">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-xs opacity-50">© 2024 Caminatas Saludables. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
