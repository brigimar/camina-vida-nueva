"use server";

import { revalidatePath } from "next/cache";
import {
  getUserRoles,
  assignUserRole,
  updateUserRole,
  deleteUserRole,
} from "@/lib/controllers/userRoles";
import type { UserRolePayload } from "@/lib/validators/userRoleSchema";

export async function getRolesAction() {
  try {
    const roles = await getUserRoles();
    return { success: true, data: roles };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al obtener roles",
    };
  }
}

export async function createUserRoleAction(payload: UserRolePayload) {
  try {
    const result = await assignUserRole(payload);
    revalidatePath("/dashboard/roles");
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al asignar rol",
    };
  }
}

export async function updateUserRoleAction(
  id: string,
  payload: Partial<UserRolePayload>,
) {
  try {
    const result = await updateUserRole(id, payload);
    revalidatePath("/dashboard/roles");
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al actualizar rol",
    };
  }
}

export async function deleteUserRoleAction(id: string) {
  try {
    await deleteUserRole(id);
    revalidatePath("/dashboard/roles");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al eliminar rol",
    };
  }
}
