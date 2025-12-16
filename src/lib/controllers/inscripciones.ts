import { createSupabaseServer } from "@/lib/supabaseServer";
import { z } from "zod";

/* ---------------------------------------------------------
 ✅ SCHEMA ZOD — Validación real de inscripciones
--------------------------------------------------------- */
export const inscripcionSchema = z.object({
  circuito_id: z.string().uuid(),
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  dni: z.string().min(6),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  estado: z.string().optional(),
});

/* ---------------------------------------------------------
 ✅ LISTAR TODAS LAS INSCRIPCIONES
--------------------------------------------------------- */
export async function getInscriptos() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("inscripciones")
    .select("*, circuitos(nombre)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/* ---------------------------------------------------------
 ✅ LISTAR INSCRIPTOS POR CIRCUITO
--------------------------------------------------------- */
export async function getInscriptosByCircuito(circuito_id: string) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("inscripciones")
    .select("*, circuitos(nombre)")
    .eq("circuito_id", circuito_id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/* ---------------------------------------------------------
 ✅ CREAR INSCRIPCIÓN
--------------------------------------------------------- */
export async function createInscripcion(payload: unknown) {
  const supabase = await createSupabaseServer();

  console.log(">>> [CREATE] Payload recibido:", payload);

  const parsed = inscripcionSchema.parse(payload);

  console.log(">>> [CREATE] Payload validado:", parsed);

  const { data, error } = await supabase
    .from("inscripciones")
    .insert(parsed)
    .select()
    .single();

  if (error) {
    console.log(">>> [SUPABASE ERROR - createInscripcion]:", error);
    throw error;
  }

  return data;
}

/* ---------------------------------------------------------
 ✅ ACTUALIZAR INSCRIPCIÓN
--------------------------------------------------------- */
export async function updateInscripcion(id: string, payload: unknown) {
  const supabase = await createSupabaseServer();

  console.log(">>> [UPDATE] ID:", id);
  console.log(">>> [UPDATE] Payload recibido:", payload);

  const parsed = inscripcionSchema.partial().parse(payload);

  console.log(">>> [UPDATE] Payload validado:", parsed);

  const { data, error } = await supabase
    .from("inscripciones")
    .update({
      ...parsed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(">>> [SUPABASE ERROR - updateInscripcion]:", error);
    throw error;
  }

  return data;
}

/* ---------------------------------------------------------
 ✅ DELETE REAL (soft-delete + auditoría)
--------------------------------------------------------- */
export async function deleteInscripcion(id: string) {
  const supabase = await createSupabaseServer();

  console.log(">>> [DELETE] Desactivando inscripción:", id);

  const { data, error } = await supabase
    .from("inscripciones")
    .update({
      estado: "inactivo",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(">>> [SUPABASE ERROR - deleteInscripcion]:", error);
    throw error;
  }

  return data;
}
