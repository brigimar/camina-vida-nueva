export const dynamic = 'force-dynamic';

import { Coordinador } from "@/types";
import CoordinadorForm from "../../components/CoordinadorForm";

interface EditCoordinadorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoordinadorPage({
  params,
}: EditCoordinadorPageProps) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/coordinadores/${id}`, {
    cache: "no-store",
  });

  const coordinador: Coordinador = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Coordinador</h1>
      <CoordinadorForm initialData={coordinador} coordinadorId={id} />
    </div>
  );
}
