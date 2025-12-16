import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import {
  getSesionById,
  updateSesion,
  deleteSesion,
} from "@/lib/controllers/sesiones";
import { sesionSchema } from "@/lib/validators/sesionSchema";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const data = await getSesionById(id);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireUser();
    const { id } = await params;
    const json = await req.json();
    const payload = sesionSchema.partial().parse(json);
    const data = await updateSesion(id, payload);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await requireUser();
    const { id } = await params;
    await deleteSesion(id);
    return ok({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
