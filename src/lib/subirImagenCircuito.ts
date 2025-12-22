"use client";

import { createSupabaseClient } from "@/lib/supabase";

/**
 * Sube una imagen de circuito al bucket "Fotos_circuitos" en Supabase Storage
 * Solo para usar en Client Components
 */
export async function subirImagenCircuito(file: File): Promise<string> {
  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen");
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("La imagen debe ser menor a 5MB");
  }

  try {
    const supabase = createSupabaseClient();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const filePath = `circuitos/${fileName}`;

    // ✅ Upload to "Fotos_circuitos" bucket
    const { error } = await supabase.storage
      .from("Fotos_circuitos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      throw new Error(`Error al subir imagen: ${error.message}`);
    }

    // ✅ Get public URL
    const { data: urlData } = supabase.storage
      .from("Fotos_circuitos")
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      throw new Error("No se pudo obtener la URL pública de la imagen");
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error in subirImagenCircuito:", error);
    throw error;
  }
}
