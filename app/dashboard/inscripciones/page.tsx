export const dynamic = "force-dynamic";

import InscripcionesListClient from "./components/InscripcionesListClient";
import { Inscripcion } from "@/types";
import { createSupabaseServer } from "@/lib/supabase";

export default async function InscripcionesPage() {
  const supabase = await createSupabaseServer();

  // ============================
  // ✅ Fetch inscripciones (join correcto)
  // ============================
  const iRes = await supabase
    .from("inscripciones")
    .select("*, sesiones(*, circuitos(nombre))")
    .eq("estado", "activo")
    .limit(100);

  if (iRes.error) {
    console.error("❌ Supabase error (inscripciones):", iRes.error);
  }

  const initialInscripciones: Inscripcion[] = Array.isArray(iRes.data)
    ? iRes.data
    : [];

  // ============================
  // ✅ Render seguro (sin SSR throws)
  // ============================
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inscripciones</h1>
        <a
          href="/dashboard/inscripciones/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Crear inscripción
        </a>
      </div>

      <InscripcionesListClient initialInscripciones={initialInscripciones} />
    </div>
  );
}
