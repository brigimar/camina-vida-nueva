import { z } from "zod";

export const sesionSchema = z.object({
  id: z.string().uuid().optional(),
  circuito_id: z.string().uuid("circuito_id debe ser UUID válido"),
  fecha: z.string().refine((val) => !isNaN(Date.parse(val)), "fecha debe ser una fecha válida"),
  horario: z.string().regex(/^\d{2}:\d{2}$/, "horario debe ser HH:MM"), // ✅ CAMBIÓ: hora → horario
  cupo: z.number().int().positive("cupo debe ser > 0"),
  estado: z.enum(["programada", "completada", "cancelada"]).optional(),
  coordinador_id: z.string().uuid().optional(),
});
