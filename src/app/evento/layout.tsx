import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Caminata Terapéutica en Palermo - 13 Diciembre 2025",
  description:
    "Experiencia grupal guiada por profesionales en salud y bienestar emocional. Reservá tu lugar ahora en los Bosques de Palermo.",
  keywords:
    "caminatas, terapéuticas, palermo, salud mental, bienestar, grupo, naturaleza",
  openGraph: {
    title: "Caminata Terapéutica en Palermo - 13 Diciembre 2025",
    description:
      "Sumate a la caminata que transforma cuerpo y mente. Palermo, 13 de diciembre.",
    url: "https://www.caminavida.com.ar/evento",
    siteName: "Camina Vida",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Caminata Terapéutica Palermo 13/12",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caminata Terapéutica en Palermo - 13 Diciembre 2025",
    description:
      "Sumate a la caminata que transforma cuerpo y mente. Palermo, 13 de diciembre.",
    images: ["/og.webp"],
  },
};

export default function EventoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-cyan-50">
        {children}
      </main>
      <Footer />
    </>
  );
}
