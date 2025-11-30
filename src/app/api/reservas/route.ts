// src/app/api/reservas/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Client as NotionClient } from "@notionhq/client";
import crypto from "crypto";

type Reserva = {
  circuitoId: string;
  nombre: string;
  edad: number;
  dni: string;
  whatsapp: string;
  dia: string;
  horario: "mañana" | "tarde";
  email?: string;
  estado?: string;
  sesionId?: string;
};

function validar(body: any): Reserva {
  const campos = ["circuitoId", "nombre", "edad", "dni", "whatsapp", "dia", "horario"];
  for (const c of campos) {
    if (!body[c]) throw new Error(`Falta el campo obligatorio: ${c}`);
  }

  const edadNum = Number(body.edad);
  if (isNaN(edadNum) || edadNum < 0 || edadNum > 120) {
    throw new Error("Edad inválida (0–120)");
  }

  if (body.horario !== "mañana" && body.horario !== "tarde") {
    throw new Error("Horario inválido (mañana/tarde)");
  }

  return {
    circuitoId: String(body.circuitoId),
    nombre: String(body.nombre),
    edad: edadNum,
    dni: String(body.dni),
    whatsapp: String(body.whatsapp),
    dia: String(body.dia),
    horario: body.horario,
    email: body.email ? String(body.email) : undefined,
    estado: body.estado ? String(body.estado) : "Pendiente",
    sesionId: body.sesionId ? String(body.sesionId) : undefined,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = validar(body);

    // Inicializar Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Inicializar Notion
    const notion = new NotionClient({
      auth: process.env.NOTION_API_KEY,
    });

    // Insertar en Supabase
    const { error } = await supabase.from("inscripciones").insert([
      {
        circuito_id: data.circuitoId,
        nombre: data.nombre,
        edad: data.edad,
        dni: data.dni,
        whatsapp: data.whatsapp,
        dia: data.dia,
        horario: data.horario,
        email: data.email ?? null,
        estado: data.estado ?? "Pendiente",
        sesion_id: data.sesionId ?? null,
      },
    ]);

    if (error) throw new Error(`Supabase: ${error.message}`);

    // Insertar en Notion — usando propiedades reales de tu base
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID! },
      properties: {
        ID: {
          title: [{ text: { content: crypto.randomUUID() } }],
        },
        Nombre: {
          rich_text: [{ text: { content: data.nombre } }],
        },
        Edad: { number: data.edad },
        DNI: { number: Number(data.dni) },
        WhatsApp: {
          rich_text: [{ text: { content: data.whatsapp } }],
        },
        Dia: { select: { name: data.dia } },       // ej. "Lunes"
        Horario: { select: { name: data.horario } }, // "mañana" o "tarde"
        Estado: {
          rich_text: [{ text: { content: data.estado ?? "Pendiente" } }],
        },
        Email: data.email ? { email: data.email } : undefined,
        FechaInscripcion: { date: { start: new Date().toISOString() } },
      },
    });

    return NextResponse.json({ ok: true, message: "Reserva registrada con éxito" });
  } catch (err: any) {
    console.error("❌ Error en POST /api/reservas:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
