import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PostgrestError {
  message: string;
  code?: string;
}

// ✅ Obtener un circuito por ID
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from("circuitos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: "Circuito no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    const error = e as PostgrestError;
    console.error("GET /api/circuitos/[id] error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}

// ✅ Actualizar un circuito por ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { data, error } = await supabase
      .from("circuitos")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: "Circuito no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    const error = e as PostgrestError;
    console.error("PUT /api/circuitos/[id] error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}

// ✅ Eliminar un circuito por ID (soft delete)
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from("circuitos")
      .update({
        estado: "inactivo",
        activo: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: "Circuito no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (e) {
    const error = e as PostgrestError;
    console.error("DELETE /api/circuitos/[id] error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}