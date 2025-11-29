import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Client as NotionClient } from "@notionhq/client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type Inscripto = {
  nombre: string;
  edad: number;
  whatsapp: string;
  horario: "mañana" | "tarde";
};

// ✅ Validación robusta
function validar(data: any): Inscripto {
  const { nombre, edad, whatsapp, horario } = data || {};
  if (!nombre || typeof nombre !== "string") throw new Error("Nombre es requerido");
  if (!edad || isNaN(Number(edad)) || Number(edad) <= 0)
    throw new Error("Edad es requerida y debe ser número válido");
  if (!whatsapp || whatsapp.trim() === "")
    throw new Error("WhatsApp es requerido");
  if (!horario || !["mañana", "tarde"].includes(horario))
    throw new Error("Horario debe ser 'mañana' o 'tarde'");
  return { nombre, edad: Number(edad), whatsapp: String(whatsapp), horario };
}

// ✅ Guardar en Supabase
async function guardarEnSupabase(data: Inscripto) {
  console.log("📥 Insertando en Supabase:", data);
  const { error } = await supabase.from("inscripciones_13_12").insert([
    {
      ...data,
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) {
    console.error("❌ Error Supabase:", error.message);
    throw new Error(`Supabase: ${error.message}`);
  }
  console.log("✅ Supabase insert OK");
}

// ✅ Enviar correo
async function enviarCorreo(data: Inscripto) {
  console.log("📧 Enviando correo a:", process.env.EMAIL_USER);
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Nuevo inscripto - Caminatas Terapéuticas Palermo",
    html: `
      <h2>Nuevo inscripto</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Edad:</strong> ${data.edad}</p>
      <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
      <p><strong>Horario:</strong> ${data.horario}</p>
    `,
  });
  console.log("✅ Correo enviado");
}

// ✅ Enviar a Notion
async function enviarANotion(data: Inscripto) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ID) {
    console.log("⚠️ Notion no configurado, se omite");
    return;
  }
  console.log("🗂️ Registrando en Notion:", data.nombre);
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID! },
    properties: {
      ID: { title: [{ text: { content: data.nombre } }] },
      Nombre: { rich_text: [{ text: { content: data.nombre } }] },
      Edad: { number: data.edad },
      WhatsApp: { rich_text: [{ text: { content: data.whatsapp } }] },
      Horario: { select: { name: data.horario } },
      FechaInscripcion: { date: { start: new Date().toISOString() } },
      Estado: { rich_text: [{ text: { content: "Pendiente" } }] },
    },
  });
  console.log("✅ Notion registro OK");
}

// ✅ Enviar a Telegram
async function enviarATelegram(data: Inscripto) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const authorizedUsers = process.env.TELEGRAM_AUTHORIZED_USERS?.split(",") || [];

  if (!token || authorizedUsers.length === 0) {
    console.log("⚠️ Telegram no configurado, se omite");
    return;
  }

  const texto =
    `📝 *Nuevo inscripto en Caminata 13-12*\n\n` +
    `👤 *Nombre:* ${data.nombre}\n` +
    `🎂 *Edad:* ${data.edad}\n` +
    `📱 *WhatsApp:* ${data.whatsapp}\n` +
    `⏰ *Horario:* ${data.horario}\n` +
    `📅 *Fecha:* ${new Date().toLocaleString("es-AR")}\n\n` +
    `✅ Registro guardado en Supabase y Notion`;

  for (const chatId of authorizedUsers) {
    try {
      console.log("📲 Enviando a Telegram chatId:", chatId);
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: texto, parse_mode: "Markdown" }),
      });
      const json = await res.json();
      console.log("✅ Telegram respuesta:", json);
    } catch (err: any) {
      console.error("❌ Error Telegram:", err.message);
    }
  }
}

// ✅ Endpoint principal
export async function POST(req: Request) {
  try {
    console.log("➡️ POST /api/registro recibido");
    const body = await req.json();
    console.log("📦 Body recibido:", body);

    const data = validar(body);
    console.log("✅ Validación OK:", data);

    await guardarEnSupabase(data);
    await Promise.all([
      enviarCorreo(data),
      enviarANotion(data),
      enviarATelegram(data),
    ]);

    console.log("🎉 Flujo completo OK");
    return NextResponse.json({ ok: true, message: "Inscripción registrada con éxito" });
  } catch (err: any) {
    console.error("❌ Error en POST /api/registro:", err.message);
    return NextResponse.json({ ok: false, error: err.message ?? "Error" }, { status: 400 });
  }
}
