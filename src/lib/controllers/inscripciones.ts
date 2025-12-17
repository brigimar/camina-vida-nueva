import { createSupabaseServer } from "@/lib/supabaseServer";
import { z } from "zod";

/* ---------------------------------------------------------
 ✅ SCHEMA ZOD — Validación real de inscripciones
 
 MODELO REAL:
 - inscripciones.sesion_id (FK a sesiones)
 - sesiones.circuito_id (FK a circuitos)
 - circuitos.nombre
 
 NO existe circuito_id en inscripciones
--------------------------------------------------------- */
export const inscripcionSchema = z.object({
  sesion_id: z.string().uuid("sesion_id debe ser UUID válido"),
  nombre: z.string().min(2, "nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "apellido debe tener al menos 2 caracteres"),
  dni: z.string().min(6, "DNI debe tener al menos 6 caracteres"),
  email: z.string().email("email debe ser válido").optional(),
  whatsapp: z.string().optional(),
  edad: z.number().int().positive().optional(),
  estado: z.enum(["activo", "inactivo", "cancelado"]).optional(),
});

/* ---------------------------------------------------------
 ✅ LISTAR TODAS LAS INSCRIPCIONES
 
 Join correcto: inscripciones -> sesiones -> circuitos
--------------------------------------------------------- */
export async function getInscriptos() {
  const supabase = await createSupabaseServer();

  try {
    const { data, error } = await supabase
      .from("inscripciones")
      .select("*, sesiones(*, circuitos(nombre))")
      .eq("estado", "activo")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ [SUPABASE ERROR - getInscriptos]:", error);
      return [];
    }

    return data ?? [];
  } catch (e) {
    console.error("❌ [ERROR - getInscriptos]:", e);
    return [];
  }
}

/* ---------------------------------------------------------
 ✅ LISTAR INSCRIPTOS POR CIRCUITO
 
 Filtro correcto: inscripciones.sesiones.circuito_id
 (NO inscripciones.circuito_id que no existe)
--------------------------------------------------------- */
export async function getInscriptosByCircuito(circuito_id: string) {
  const supabase = await createSupabaseServer();

  try {
    const { data, error } = await supabase
      .from("inscripciones")
      .select("*, sesiones(*, circuitos(nombre))")
      .eq("sesiones.circuito_id", circuito_id)
      .eq("estado", "activo")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ [SUPABASE ERROR - getInscriptosByCircuito]:", error);
      return [];
    }

    return data ?? [];
  } catch (e) {
    console.error("❌ [ERROR - getInscriptosByCircuito]:", e);
    return [];
  }
}

/* ---------------------------------------------------------
 ✅ CREAR INSCRIPCIÓN
 
 Cambios:
 - Validar sesion_id (NO circuito_id)
 - Error handling con log + return null
 - Nunca lanzar errores crudos
--------------------------------------------------------- */
export async function createInscripcion(payload: unknown) {
  const supabase = await createSupabaseServer();

  try {
    console.log(">>> [CREATE] Payload recibido:", payload);

    const parsed = inscripcionSchema.parse(payload);

    console.log(">>> [CREATE] Payload validado:", parsed);

    const { data, error } = await supabase
      .from("inscripciones")
      .insert(parsed)
      .select()
      .single();

    if (error) {
      console.error("❌ [SUPABASE ERROR - createInscripcion]:", error);
      return null;
    }

    return data ?? null;
  } catch (e) {
    console.error("❌ [ERROR - createInscripcion]:", e);
    return null;
  }
}

/* ---------------------------------------------------------
 ✅ ACTUALIZAR INSCRIPCIÓN
 
 Cambios:
 - Usar inscripcionSchema.partial() para validación
 - Agregar updated_at automáticamente
 - Error handling con log + return null
--------------------------------------------------------- */
export async function updateInscripcion(id: string, payload: unknown) {
  const supabase = await createSupabaseServer();

  try {
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
      console.error("❌ [SUPABASE ERROR - updateInscripcion]:", error);
      return null;
    }

    return data ?? null;
  } catch (e) {
    console.error("❌ [ERROR - updateInscripcion]:", e);
    return null;
  }
}

/* ---------------------------------------------------------
 ✅ DELETE REAL (soft-delete + auditoría)
 
 Cambios:
 - Soft-delete con estado = 'inactivo'
 - Agregar updated_at automáticamente
 - Error handling con log + return null
 - Nunca lanzar errores crudos
--------------------------------------------------------- */
export async function deleteInscripcion(id: string) {
  const supabase = await createSupabaseServer();

  try {
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
      console.error("❌ [SUPABASE ERROR - deleteInscripcion]:", error);
      return null;
    }

    return data ?? null;
  } catch (e) {
    console.error("❌ [ERROR - deleteInscripcion]:", e);
    return null;
  }
}
