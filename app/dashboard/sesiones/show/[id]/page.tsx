export const dynamic = "force-dynamic";

import { Sesion, Circuito } from "@/types";
import { createSupabaseServer } from "@/lib/supabase";

interface Props {
  params: { id: string };
}

export default async function SesionesShow({ params }: Props) {
  const { id } = params;
  const supabase = await createSupabaseServer();

  const sRes = await supabase
    .from("sesiones")
    .select("*")
    .eq("id", id)
    .single();
  if (sRes.error) throw new Error(sRes.error.message);
  const sesion: Sesion = sRes.data;
  if (!sesion) throw new Error("Sesión no encontrada");

  const cRes = await supabase
    .from("circuitos")
    .select("*")
    .eq("id", sesion.circuito_id)
    .single();
  if (cRes.error) throw new Error(cRes.error.message);
  const circuito: Circuito = cRes.data;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Sesión</h1>

      <p>
        <strong>Circuito:</strong> {circuito?.nombre || "—"}
      </p>
      <p>
        <strong>Fecha:</strong> {new Date(sesion.fecha).toLocaleDateString()}
      </p>
      <p>
        <strong>Horario:</strong> {sesion.horario}
      </p>
      <p>
        <strong>Cupo:</strong> {sesion.cupo}
      </p>
      <p>
        <strong>Estado:</strong> {sesion.estado}
      </p>
    </div>
  );
}
