import { z } from "zod";

export const roleSchema = z.object({
  user_id: z.string().uuid(),
  role: z.string().min(3),
  estado: z.enum(["activo", "inactivo"]).default("activo"),
  updated_at: z.string().optional(),
});

export type RoleInput = z.infer<typeof roleSchema>;
