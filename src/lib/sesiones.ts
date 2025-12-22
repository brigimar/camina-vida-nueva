import { createSupabaseServer } from "@/lib/supabase";
import { sesionSchema } from "@/lib/validators/sesionSchema";

export async function getSesiones() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.from("sesiones").select("*");
  if (error) throw error;
  return data;
}

export async function getSesionById(id: string) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("sesiones")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createSesion(payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = sesionSchema.parse(payload);

  const { data, error } = await supabase
    .from("sesiones")
    .insert(parsed)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSesion(id: string, payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = sesionSchema.partial().parse(payload);

  const { data, error } = await supabase
    .from("sesiones")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSesion(id: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("sesiones").delete().eq("id", id);
  if (error) throw error;
}
