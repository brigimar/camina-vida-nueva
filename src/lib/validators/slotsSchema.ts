import { z } from 'zod';

export const slotSchema = z.object({
  circuitoId: z.number(),
  horario: z.string().regex(/^\d{2}:\d{2}$/),
});
