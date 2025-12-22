import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import {
  updateInscripcion,
  deleteInscripcion,
} from "@/lib/controllers/inscripciones";
import { requireUser } from "@/lib/auth/authorize";
import { inscripcionSchema } from "@/lib/validators/inscripcionSchema";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireUser();
    const { id } = await params;
    const json = await req.json();
    const payload = inscripcionSchema.partial().parse(json);
    const data = await updateInscripcion(id, payload);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireUser();
    const { id } = await params;
    const data = await deleteInscripcion(id);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}
