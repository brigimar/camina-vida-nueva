"use client";

import HeaderCaminaVida from "@/components/landing/HeaderCaminaVida";
import FooterCaminaVida from "@/components/landing/FooterCaminaVida";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* HEADER GLOBAL */}
      <HeaderCaminaVida />

      {/* CONTENIDO */}
      {children}

      {/* FOOTER GLOBAL */}
      <FooterCaminaVida />
    </>
  );
}
