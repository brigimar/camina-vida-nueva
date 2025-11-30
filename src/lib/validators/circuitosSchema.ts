import { z } from 'zod';

export const circuitoSchema = z.object({
  nombre: z.string().min(3),
  distancia: z.string().regex(/^\d+(km|m)$/),
});
