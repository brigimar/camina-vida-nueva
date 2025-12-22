export const dynamic = "force-dynamic";

import Image from "next/image";
import { createSupabaseServer } from "@/lib/supabase";

interface CoordinadoresShowProps {
  params: { id: string };
}

export default async function CoordinadoresShow({
  params,
}: CoordinadoresShowProps) {
  const { id } = params;
  const supabase = await createSupabaseServer();
  const { data: coord, error } = await supabase
    .from("coordinadores")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  if (!coord) throw new Error("Coordinador no encontrado");

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h1 className="text-3xl font-bold mb-4">{coord.nombre}</h1>

      {coord.foto && (
        <Image
          src={coord.foto}
          alt={coord.nombre}
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
      )}

      <p className="text-gray-700 whitespace-pre-line">
        {coord.bio || "Sin bio"}
      </p>
    </div>
  );
}
