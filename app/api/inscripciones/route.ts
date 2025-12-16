import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import { getInscriptos, createInscripcion } from "@/lib/controllers/inscripciones";
import { requireUser } from "@/lib/auth/authorize";
import { inscripcionSchema } from "@/lib/validators/inscripcionSchema";

export async function GET() {
  try {
    const data = await getInscriptos();
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    // allow public creation? require auth for dashboard flows
    await requireUser();
    const json = await req.json();
    const payload = inscripcionSchema.parse(json);
    const data = await createInscripcion(payload);
    return ok(data, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
