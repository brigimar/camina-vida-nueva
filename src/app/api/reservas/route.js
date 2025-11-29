// src/app/api/reservas/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Client as NotionClient } from "@notionhq/client";

// ---------------------------
// Inicialización clientes
// ---------------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });

// ---------------------------
// Tipado
// ---------------------------
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

// ---------------------------
// Validación
// ---------------------------
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

// ---------------------------
// Supabase
// ---------------------------
async function guardarEnSupabase(data: Reserva) {
  const payload = {
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
    // fecha se autocompleta con default now()
  };

  const { error } = await supabase.from("inscripciones").insert([payload]);
  if (error) throw new Error(`Supabase: ${error.message}`);
}

// ---------------------------
// Notion
// ---------------------------
async function enviarANotion(data: Reserva) {
  const dbId = process.env.NOTION_DB_ID;

  if (!dbId) {
    console.warn("⚠️ Notion desactivado: falta NOTION_DB_ID");
    return;
  }

  try {
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Nombre: { rich_text: [{ text: { content: data.nombre } }] },
        Edad: { number: data.edad },
        DNI: { rich_text: [{ text: { content: data.dni } }] },
        WhatsApp: { rich_text: [{ text: { content: data.whatsapp } }] },
        Día: { rich_text: [{ text: { content: data.dia } }] },
        Horario: { select: { name: data.horario } },
        Estado: { rich_text: [{ text: { content: data.estado ?? "Pendiente" } }] },
        FechaInscripcion: { date: { start: new Date().toISOString() } },
      },
    });
    console.log("✅ Notion OK");
  } catch (err: any) {
    console.error("❌ Notion error:", err?.body || err?.message || err);
  }
}

// ---------------------------
// Brevo (correo)
// ---------------------------
async function enviarCorreo(data: Reserva) {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!apiKey || !from || !to) {
    console.warn("⚠️ Brevo desactivado: faltan variables de entorno");
    return;
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: from },
        to: [{ email: to }],
        subject: "Nueva reserva registrada",
        htmlContent: `
          <h2>Nueva reserva</h2>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Edad:</strong> ${data.edad}</p>
          <p><strong>DNI:</strong> ${data.dni}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
          <p><strong>Día:</strong> ${data.dia}</p>
          <p><strong>Horario:</strong> ${data.horario}</p>
          <p><strong>Estado:</strong> ${data.estado ?? "Pendiente"}</p>
        `,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("❌ Brevo error:", json);
    } else {
      console.log("✅ Brevo OK");
    }
  } catch (err: any) {
    console.error("❌ Brevo error:", err?.message || err);
  }
}

// ---------------------------
// Telegram
// ---------------------------
async function enviarATelegram(data: Reserva) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const authorizedUsers =
    process.env.TELEGRAM_AUTHORIZED_USERS?.split(",").map((s) => s.trim()) || [];

  if (!token || authorizedUsers.length === 0) {
    console.warn("⚠️ Telegram desactivado: faltan TELEGRAM_BOT_TOKEN o usuarios");
    return;
  }

  const texto =
    `📝 *Nueva reserva*\n\n` +
    `🚶 *Circuito:* ${data.circuitoId}\n` +
    `👤 *Nombre:* ${data.nombre}\n` +
    `🎂 *Edad:* ${data.edad}\n` +
    `🪪 *DNI:* ${data.dni}\n` +
    `📱 *WhatsApp:* ${data.whatsapp}\n` +
    `📅 *Día:* ${data.dia}\n` +
    `⏰ *Horario:* ${data.horario}\n` +
    `📌 *Estado:* ${data.estado ?? "Pendiente"}\n` +
    `🕒 *Fecha registro:* ${new Date().toLocaleString("es-AR")}`;

  for (const chatId of authorizedUsers) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: texto,
          parse_mode: "Markdown",
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        console.error("❌ Telegram respuesta no OK:", json);
      } else {
        console.log("✅ Telegram OK ->", chatId);
      }
    } catch (err: any) {
      console.error("❌ Telegram error:", err?.message || err);
    }
  }
}

// ---------------------------
// Handler
// ---------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = validar(body);

    await guardarEnSupabase(data);

    await Promise.allSettled([
      enviarANotion(data),
      enviarCorreo(data),
      enviarATelegram(data),
    ]);

    return NextResponse.json({ ok: true, message: "Reserva registrada con éxito" });
  } catch (err: any) {
    console.error("🚨 Error en POST /api/reservas:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
