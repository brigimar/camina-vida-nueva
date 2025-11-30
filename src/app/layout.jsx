import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL('https://buenas-caminatas.vercel.app/'),
  title: 'Camina Vida',
  description: 'Caminatas terapéuticas para mejorar tu salud física y emocional.',
  openGraph: {
    title: 'Camina Vida | Sembramos pasos, cosechamos Vida',
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
    <html lang="es" className={poppins.variable}>
      <body className="font-sans flex flex-col min-h-screen">
        {/* Header fijo en todas las páginas */}
        <Header />

        {/* Contenido principal crece si es corto */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer sticky solo si el contenido no llena la pantalla */}
        <Footer />
      </body>
    </html>
  );
}
