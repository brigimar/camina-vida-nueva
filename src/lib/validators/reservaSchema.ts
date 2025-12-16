import { z } from "zod";

export const reservaSchema = z.object({
  id: z.string().uuid().optional(),
  circuito_id: z.string().uuid(),
  fecha: z.string(),
  hora: z.string(),
  cantidad_personas: z.number().int().positive(),
  coordinador_id: z.string().uuid().optional(),
});
