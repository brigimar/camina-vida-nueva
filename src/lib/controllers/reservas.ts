import { createSupabaseServer } from "@/lib/supabaseServer";
import { reservaSchema } from "@/lib/validators/reservaSchema";

export async function getReservas() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .order("fecha", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getReservaById(id: string) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createReserva(payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = reservaSchema.parse(payload);

  const { data, error } = await supabase
    .from("reservas")
    .insert(parsed)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateReserva(id: string, payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = reservaSchema.partial().parse(payload);

  const { data, error } = await supabase
    .from("reservas")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteReserva(id: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from("reservas")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
