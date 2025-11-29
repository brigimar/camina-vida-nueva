"use server";

import { supabase } from "@/lib/supabase";

/**
 * Inserta una nueva reserva en la tabla reservas_evento
 */
export async function crearReserva({
  nombre,
  edad,
  whatsapp,
  horario,
}: {
  nombre: string;
  edad: number;
  whatsapp: string;
  horario: string;
}) {
  const { data, error } = await supabase
    .from("reservas_evento")
    .insert({ nombre, edad, whatsapp, horario })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
