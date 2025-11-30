import { z } from 'zod';

export const inscripcionSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  circuitoId: z.number().int('Debe ser un número entero'),
  horario: z.string().min(1, 'El horario es obligatorio'),
});
