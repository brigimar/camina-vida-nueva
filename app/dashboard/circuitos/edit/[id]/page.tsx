export const dynamic = 'force-dynamic';

import CircuitoForm from "../../components/CircuitoForm";

export default async function EditCircuitoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let circuito = null;
  try {
    const res = await fetch(`${baseUrl}/api/circuitos/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return <div className="p-6 text-red-600">Error cargando circuito</div>;
    }

    circuito = await res.json();
  } catch (error) {
    console.error("Error:", error);
    return <div className="p-6 text-red-600">Error cargando circuito</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Circuito</h1>
      <CircuitoForm initialData={circuito} circuitoId={id} />
    </div>
  );
}
