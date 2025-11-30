// src/app/api/notion/test/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  try {
    const dbId = process.env.NOTION_DB_ID!;
    if (!dbId) {
      throw new Error("Falta NOTION_DB_ID en variables de entorno");
    }

    const page = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        // Campo principal (title)
        ID: {
          title: [{ text: { content: "test-id-001" } }]
        },
        // Texto libre
        Nombre: {
          rich_text: [{ text: { content: "Prueba conexión Notion extendida" } }]
        },
        // Número
        Edad: { number: 34 },
        DNI: { number: 12345678 },
        // Texto libre
        WhatsApp: {
          rich_text: [{ text: { content: "+5491112345678" } }]
        },
        // Select (usar exactamente los valores definidos en tu base)
        Dia: { select: { name: "Lunes" } },
        Horario: { select: { name: "mañana" } },
        // Texto libre
        Estado: {
          rich_text: [{ text: { content: "Pendiente" } }]
        },
        // Email
        Email: { email: "test@caminavida.com.ar" },
        // Fecha
        FechaInscripcion: { date: { start: new Date().toISOString() } }
      }
    });

    return NextResponse.json({ ok: true, pageId: page.id });
  } catch (err: any) {
    console.error("❌ ERROR TEST NOTION:", err?.body || err?.message || err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
