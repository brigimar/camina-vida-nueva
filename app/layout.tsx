import type { Metadata } from "next";
import LayoutClient from "@/components/layout/LayoutClient";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camina Vida",
  description: "Sembramos pasos, cosechamos vida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
