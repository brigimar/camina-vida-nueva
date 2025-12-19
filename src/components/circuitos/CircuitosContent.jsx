import CircuitosListado from "./CircuitosListado";
import { createSupabaseServer } from "@/lib/supabaseServer";

// ✅ Componente async que se renderiza dentro de Suspense
export default async function CircuitosContent({
  page = 1,
  limit = 20,
}) {
  const supabase = await createSupabaseServer();

  // ✅ Calcular rango para paginación SSR
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // ✅ Fetch circuitos con paginación y count exacto
  const res = await supabase
    .from("circuitos")
    .select("*, sesiones(*)", { count: "exact" })
    .eq("activo", true)
    .order("nombre")
    .range(from, to);

  if (res.error) {
    console.error("Error fetching circuitos:", res.error);
  }

  const circuitos = res.data ?? [];
  const total = res.count ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <CircuitosListado
      circuitos={circuitos}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
