import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";

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

    return NextResponse.json({
      data: {
        admins: (roles || []).filter((r: any) => r.role === "admin").length,
        coordinadores: (roles || []).filter((r: any) => r.role === "coordinador").length,
        inscriptos: (roles || []).filter((r: any) => r.role === "usuario").length,
        circuitos: (circuitos || []).length,
      },
    });
  } catch (error) {
    console.error("Error fetching resumen:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumen" },
      { status: 500 }
    );
  }
}