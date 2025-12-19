import { createSupabaseServer } from "@/lib/supabaseServer";
import HeroCaminaVida from "@/components/landing/HeroCaminaVida";
import ComoFunciona from "@/components/landing/ComoFunciona"; // Nuevo Import
import CategoriasCaminaVida from "@/components/landing/CategoriasCaminaVida";
import BeneficiosCaminaVida from "@/components/landing/BeneficiosCaminaVida";
import MetodoCaminaVida from "@/components/landing/MetodoCaminaVida";
import PlanesCaminaVida from "@/components/landing/PlanesCaminaVida";
import TestimoniosCaminaVida from "@/components/landing/TestimoniosCaminaVida";
import CTAReservar from "@/components/landing/CTAReservar";
import SeCoordinador from "@/components/landing/SeCoordinador";
import CircuitosGrid from "@/components/circuitos/CircuitosGrid";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = await createSupabaseServer();

  const { data: circuitos } = await supabase
    .from("circuitos")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      
      <HeroCaminaVida />

      {/* El flujo lógico: Hero -> Cómo funciona -> Categorías */}
      <ComoFunciona />

      <CategoriasCaminaVida />

      {/* SECCIÓN CIRCUITOS */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="subtitle-premium">Explora</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
              Últimos circuitos <span className="italic text-[#FF5C35]">agregados</span>
            </h2>
          </div>

          <CircuitosGrid circuitos={circuitos || []} />

          <div className="text-center mt-16">
            <a href="/circuitos" className="btn-olla btn-olla-ghost">
              Ver todos los circuitos
            </a>
          </div>
        </div>
      </section>

      <BeneficiosCaminaVida />
      <MetodoCaminaVida />
      <SeCoordinador />
      <PlanesCaminaVida />
      <TestimoniosCaminaVida />
      <CTAReservar />

    </main>
  );
}