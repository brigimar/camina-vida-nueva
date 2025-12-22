import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import {
  updateCoordinador,
  deleteCoordinador,
} from "@/lib/controllers/coordinadores";
import { requireUser } from "@/lib/auth/authorize";
import { z } from "zod";

const coordinadorSchema = z.object({
  nombre: z.string().min(1).optional(),
  foto: z.string().optional(),
  bio: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireUser();
    const { id } = await params;
    const json = await req.json();
    const payload = coordinadorSchema.parse(json);
    const data = await updateCoordinador(id, payload);
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
    const data = await deleteCoordinador(id);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}
