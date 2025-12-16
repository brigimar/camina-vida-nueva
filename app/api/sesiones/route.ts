import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import { sesionSchema } from "@/lib/validators/sesionSchema";
import { requireUser } from "@/lib/auth/authorize";
import { getSesiones, createSesion } from "@/lib/controllers/sesiones";

export async function GET() {
  try {
    const data = await getSesiones();
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireUser();
    const json = await req.json();
    const payload = sesionSchema.parse(json);
    const data = await createSesion(payload);
    return ok(data, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
