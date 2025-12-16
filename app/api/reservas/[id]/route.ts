import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import {
  getReservaById,
  updateReserva,
  deleteReserva,
} from "@/lib/controllers/reservas";
import { reservaSchema } from "@/lib/validators/reservaSchema";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const data = await getReservaById(id);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const json = await req.json();
    const payload = reservaSchema.partial().parse(json);
    const data = await updateReserva(id, payload);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await deleteReserva(id);
    return ok({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
