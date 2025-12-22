"use server";

import {
  getCircuitosAdvanced,
  getCircuitoById,
  createCircuito,
  updateCircuito,
  deleteCircuito,
} from "@/lib/controllers/circuitos";
import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase";

export async function getCircuitosAction(params) {
  const result = await getCircuitosAdvanced(params);
  return result;
}

export async function getCircuitoByIdAction(id) {
  const result = await getCircuitoById(id);
  return result;
}

export async function createCircuitoAction(payload) {
  const result = await createCircuito(payload);
  revalidatePath("/dashboard/circuitos");
  return result;
}

export async function updateCircuitoAction(id, payload) {
  const result = await updateCircuito(id, payload);
  revalidatePath("/dashboard/circuitos");
  revalidatePath(`/dashboard/circuitos/edit/${id}`);
  return result;
}

export async function deleteCircuitoAction(id) {
  const result = await deleteCircuito(id);
  revalidatePath("/dashboard/circuitos");
  return result;
}

export async function toggleCircuitoEstadoAction(
  id: string,
  currentState: boolean,
) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from("circuitos")
    .update({ activo: !currentState })
    .eq("id", id);

  if (error) {
    console.error("Error cambiando estado:", error);
    throw new Error(error.message);
  }
  revalidatePath("/dashboard/circuitos");
}
