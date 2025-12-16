import { z } from "zod";

export const sesionSchema = z.object({
  id: z.string().uuid().optional(),
  circuito_id: z.string().uuid(),
  fecha: z.string(),
  hora: z.string(),
  cupo: z.number().int().positive(),
});
