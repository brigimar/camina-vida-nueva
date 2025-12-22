"use server";

import { revalidatePath } from "next/cache";
import {
  getAllCoordinadores,
  createCoordinador,
  updateCoordinador,
  deleteCoordinador,
} from "@/lib/controllers/coordinadores";
import { subirFotoStaff } from "@/lib/subirFotoStaff";

export interface CoordinadorPayload {
  nombre: string;
  email: string;
  telefono?: string;
  foto?: string;
  bio?: string;
  apellido?: string;
  dni?: string;
}

export async function getCoordinadoresAction() {
  return await getAllCoordinadores();
}

export async function createCoordinadorAction(payload: CoordinadorPayload) {
  await createCoordinador(payload);
  revalidatePath("/dashboard/coordinadores");
}

export async function updateCoordinadorAction(
  id: string,
  payload: CoordinadorPayload,
) {
  await updateCoordinador(id, payload);
  revalidatePath("/dashboard/coordinadores");
}

export async function uploadFotoStaffAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    throw new Error("No se proporcionó un archivo para subir.");
  }
  return await subirFotoStaff(file);
}

export async function deleteCoordinadorAction(id: string) {
  await deleteCoordinador(id);
  revalidatePath("/dashboard/coordinadores");
}
