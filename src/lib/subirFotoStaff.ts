import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function subirFotoStaff(file: File) {
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `staff/${fileName}`;

  // ✅ Subir archivo al bucket "Fotos_staff"
  const { error } = await supabase.storage
    .from("Fotos_staff")
    .upload(filePath, file);

  if (error) throw error;

  // ✅ Obtener URL pública
  const { data } = supabase.storage
    .from("Fotos_staff")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
