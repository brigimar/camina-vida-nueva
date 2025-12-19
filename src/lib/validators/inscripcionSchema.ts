import { z } from "zod";

export const inscripcionSchema = z.object({
  id: z.string().uuid().optional(),
  sesion_id: z.string().uuid("sesion_id debe ser UUID válido"), // ✅ CAMBIÓ: circuito_id → sesion_id
  nombre: z.string().min(2, "nombre debe tener >= 2 caracteres"),
  apellido: z.string().min(2, "apellido debe tener >= 2 caracteres").optional(),
  dni: z.string().min(6, "DNI debe tener >= 6 caracteres").optional(),
  email: z.string().email("email debe ser válido").optional(),
  whatsapp: z.string().optional(),
  edad: z.number().int().positive().optional(),
  estado: z.enum(["activo", "inactivo", "cancelado"]).default("activo"), // ✅ CAMBIÓ: estados actualizados
  origen: z.enum(["web", "dashboard"]).default("web").optional(),
});
