import { z } from "zod";

export const coordinadorSchema = z.object({
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  dni: z.string().min(1),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  foto: z.string().url().optional(),
});

export type CoordinadorInput = z.infer<typeof coordinadorSchema>;
