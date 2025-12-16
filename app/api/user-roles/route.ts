import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import { getUserRoles, assignUserRole } from "@/lib/controllers/userRoles";

export async function GET() {
  try {
    const data = await getUserRoles();
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = await assignUserRole(json);
    return ok(data, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
