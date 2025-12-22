export const dynamic = "force-dynamic";

import { Inscripcion } from "@/types";
import InscripcionForm from "../../components/InscripcionForm";

interface EditProps {
  params: { id: string };
}

export default async function InscripcionesEdit({ params }: EditProps) {
  const { id } = params;

  // ✅ Usando ruta relativa (más seguro en SSR)
  const url = `/api/inscripciones/${id}`;

  let ins: Inscripcion | null = null;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();

    // ✅ Asegurar que data.data sea un objeto válido
    ins = json?.data && typeof json.data === "object" ? json.data : null;
  } catch (err) {
    console.error("❌ Error fetching inscripción:", err);
  }

  // ✅ Si no existe, no romper SSR
  if (!ins || !ins.id) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Editar Inscripción</h1>
        <p className="text-red-600">No se encontró la inscripción.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Inscripción</h1>
      <InscripcionForm initialData={ins} inscripcionId={id} />
    </div>
  );
}
