import { z } from "zod";

export const inscripcionSchema = z.object({
  id: z.string().uuid().optional(),
  circuito_id: z.string().uuid(),
  nombre: z.string().min(3),
  email: z.string().email(),
  telefono: z.string().optional(),
  estado: z.enum(["pendiente", "confirmada", "cancelada"]).default("pendiente"),
  origen: z.enum(["web", "dashboard"]).default("web"),
});
