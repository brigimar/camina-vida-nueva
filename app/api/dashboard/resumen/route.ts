import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at?: string;
}

export async function GET() {
  try {
    const supabase = await createSupabaseServer();

    // Obtener roles
    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("*");

    if (rolesError) throw rolesError;

    // Obtener circuitos
    const { data: circuitos, error: circuitosError } = await supabase
      .from("circuitos")
      .select("*");

    if (circuitosError) throw circuitosError;

    const rolesArray = (roles || []) as UserRole[];

    return NextResponse.json({
      data: {
        admins: rolesArray.filter((r) => r.role === "admin").length,
        coordinadores: rolesArray.filter((r) => r.role === "coordinador")
          .length,
        inscriptos: rolesArray.filter((r) => r.role === "usuario").length,
        circuitos: (circuitos || []).length,
      },
    });
  } catch (error) {
    console.error("Error fetching resumen:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumen" },
      { status: 500 },
    );
  }
}
