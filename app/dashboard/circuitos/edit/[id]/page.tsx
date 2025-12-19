import { createSupabaseServer } from "@/lib/supabaseServer";
import CircuitoForm from "../../components/CircuitoForm";

interface Props {
  params: { id: string };
}

export default async function EditCircuitoPage({ params }: Props) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("circuitos")
    .select("*")
    .eq("id", params.id)
    .single();

  // ✅ Manejo seguro de errores (sin throw)
  if (error || !data) {
    return (
      <div className="p-6 bg-white rounded-xl shadow max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-2">Circuito no encontrado</h2>
        <p className="text-gray-600">
          No pudimos cargar la información del circuito.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <CircuitoForm initialData={data} circuitoId={params.id} />
    </div>
  );
}
