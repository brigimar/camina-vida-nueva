import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import { reservaSchema } from "@/lib/validators/reservaSchema";
import { getReservas, createReserva } from "@/lib/controllers/reservas";

export async function GET() {
  try {
    const data = await getReservas();
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const payload = reservaSchema.parse(json);
    const data = await createReserva(payload);
    return ok(data, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
