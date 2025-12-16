import { NextRequest } from "next/server";
import { ok, errorResponse } from "@/lib/utils/respuesta";
import { updateUserRole, deleteUserRole } from "@/lib/controllers/userRoles";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const json = await req.json();
    const data = await updateUserRole(id, json);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await deleteUserRole(id);
    return ok(data);
  } catch (e) {
    return errorResponse(e);
  }
}
