import { createSupabaseServer } from "@/lib/supabaseServer";
import { z } from "zod";

export const coordinadorSchema = z.object({
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  dni: z.string().min(6),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  foto: z.string().url().optional(),
  estado: z.string().optional(),
});

// ✅ LISTAR
export async function getCoordinadores() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("coordinadores")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ✅ CREAR
export async function createCoordinador(payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = coordinadorSchema.parse(payload);

  const { data, error } = await supabase
    .from("coordinadores")
    .insert(parsed)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ✅ ACTUALIZAR
export async function updateCoordinador(id: string, payload: unknown) {
  const supabase = await createSupabaseServer();
  const parsed = coordinadorSchema.partial().parse(payload);

  const { data, error } = await supabase
    .from("coordinadores")
    .update({
      ...parsed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ✅ DELETE (soft-delete)
export async function deleteCoordinador(id: string) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("coordinadores")
    .update({
      estado: "inactivo",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
