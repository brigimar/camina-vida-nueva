import { createSupabaseServer } from "@/lib/supabaseServer";

import HeroCaminaVida from "@/components/landing/HeroCaminaVida";
import CategoriasCaminaVida from "@/components/landing/CategoriasCaminaVida";
import BeneficiosCaminaVida from "@/components/landing/BeneficiosCaminaVida";
import MetodoCaminaVida from "@/components/landing/MetodoCaminaVida";
import PlanesCaminaVida from "@/components/landing/PlanesCaminaVida";
import TestimoniosCaminaVida from "@/components/landing/TestimoniosCaminaVida";
import CTAReservar from "@/components/landing/CTAReservar";

import CircuitosGrid from "@/components/circuitos/CircuitosGrid";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = await createSupabaseServer();

  // ✅ Últimos 3 circuitos (ordenados por fecha o id)
  const { data: circuitos } = await supabase
    .from("circuitos")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <HeroCaminaVida />

      {/* CATEGORÍAS */}
      <CategoriasCaminaVida />

      {/* BENEFICIOS */}
      <BeneficiosCaminaVida />

      {/* MÉTODO */}
      <MetodoCaminaVida />

      {/* ÚLTIMOS CIRCUITOS */}
      <section className="px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Últimos circuitos agregados
        </h2>

        <div className="max-w-5xl mx-auto">
          <CircuitosGrid circuitos={circuitos || []} />
        </div>

        <div className="text-center mt-8">
          <a
            href="/circuitos"
            className="inline-block px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow hover:bg-emerald-700 transition"
          >
            Ver todos los circuitos
          </a>
        </div>
      </section>

      {/* PLANES */}
      <PlanesCaminaVida />

      {/* TESTIMONIOS */}
      <TestimoniosCaminaVida />

      {/* CTA FINAL */}
      <CTAReservar />

    </main>
  );
}
