import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import {
  getCoordinadores,
  createCoordinador,
} from "@/lib/controllers/coordinadores";
import { requireUser } from "@/lib/auth/authorize";
import { z } from "zod";

const coordinadorSchema = z.object({
  nombre: z.string().min(1),
  foto: z.string().optional(),
  bio: z.string().optional(),
});

export async function GET() {
  try {
    const data = await getCoordinadores();
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUser();
    const json = await req.json();
    const payload = coordinadorSchema.parse(json);
    const data = await createCoordinador(payload);
    return ok(data, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
