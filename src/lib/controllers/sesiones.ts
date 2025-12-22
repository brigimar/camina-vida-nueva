import { createSupabaseServer } from "@/lib/supabase";
import { sesionSchema } from "@/lib/validators/sesionSchema";
import { Database } from "@/types/supabase";

type SesionRow = Database["public"]["Tables"]["sesiones"]["Row"];

export async function getSesiones(): Promise<SesionRow[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.from("sesiones").select("*");
  if (error) throw error;
  return data as SesionRow[];
}

export async function getSesionById(id: string): Promise<SesionRow | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("sesiones")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as SesionRow | null;
}

export async function createSesion(payload: unknown): Promise<SesionRow> {
  const supabase = await createSupabaseServer();
  const parsed = sesionSchema.parse(payload);

  const { data, error } = await supabase
    .from("sesiones")
    .insert(parsed)
    .select()
    .single();

  if (error) throw error;
  return data as SesionRow;
}

export async function updateSesion(
  id: string,
  payload: unknown
): Promise<SesionRow> {
  const supabase = await createSupabaseServer();
  const parsed = sesionSchema.partial().parse(payload);

  const { data, error } = await supabase
    .from("sesiones")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as SesionRow;
}

export async function deleteSesion(id: string): Promise<boolean> {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("sesiones").delete().eq("id", id);
  if (error) throw error;
  return !error;
}
