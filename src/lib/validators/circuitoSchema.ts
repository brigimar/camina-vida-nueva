import { z } from "zod";

export const circuitoSchema = z.object({
  nombre: z.string().min(3),
  descripcion: z.string().min(10).optional(),
  localidad: z.string().min(2),
  distancia_km: z.number(),
  punto_encuentro: z.string().min(3),
  estado: z.string().optional(), // tiene default en la DB
  lat: z.number().optional(),
  lng: z.number().optional(),
  coordinador_nombre: z.string().optional(),
  coordinador_foto: z.string().url().optional(),
  que_llevar: z.array(z.string()).optional(),
  dificultad: z.string().optional(),
  tiempo_estimado: z.string().optional(),
  dias: z.array(z.string()).optional(),
  horarios: z.array(z.string()).optional(),
  activo: z.boolean().default(true),
  cupo_maximo: z.number().int().positive().optional(),
  duracion_minutos: z.number().optional(),
});
