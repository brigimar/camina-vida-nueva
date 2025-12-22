import { z } from "zod";

export const userRoleSchema = z.object({
  user_id: z.string().uuid(),
  role: z.enum(["admin", "coordinador", "usuario", "contabilidad", "atencion"]),
  estado: z.string().optional(),
});

export type UserRolePayload = z.infer<typeof userRoleSchema>;
