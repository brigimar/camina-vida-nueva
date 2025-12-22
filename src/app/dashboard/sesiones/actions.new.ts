"use server";

import { revalidatePath } from "next/cache";
import { getSesiones, getSesionById, createSesion, updateSesion, deleteSesion } from "../../../../lib/controllers/sesiones";

// Fetch all sesiones
export async function fetchSesiones() {
  try {
    const data = await getSesiones();
    return { data };
  } catch (error) {
    console.error("Error fetching sesiones:", error);
    throw error;
  }
}

// Fetch a single sesion by ID
export async function fetchSesionById(id: string) {
  try {
    const data = await getSesionById(id);
    return { data };
  } catch (error) {
    console.error("Error fetching sesion by ID:", error);
    throw error;
  }
}

// Create a new sesion
export async function createSesionAction(payload: unknown) {
  try {
    const data = await createSesion(payload);
    revalidatePath("/dashboard/sesiones");
    return { data };
  } catch (error) {
    console.error("Error creating sesion:", error);
    throw error;
  }
}

// Update an existing sesion
export async function updateSesionAction(id: string, payload: unknown) {
  try {
    const data = await updateSesion(id, payload);
    revalidatePath("/dashboard/sesiones");
    return { data };
  } catch (error) {
    console.error("Error updating sesion:", error);
    throw error;
  }
}

// Delete a sesion
export async function deleteSesionAction(id: string) {
  try {
    await deleteSesion(id);
    revalidatePath("/dashboard/sesiones");
  } catch (error) {
    console.error("Error deleting sesion:", error);
    throw error;
  }
},
