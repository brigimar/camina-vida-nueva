import { NextResponse } from "next/server";
import { Client as NotionClient } from "@notionhq/client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });

// ---------------------------
// Tipado de inscripto
// ---------------------------
type Inscripto = {
  nombre: string;
  edad: number;
  whatsapp: string;
  horario: string;
  dni: string;
  circuitoId: string;
  nombreCircuito?: string;
  dia: string;
  email?: string;
};

// ---------------------------
// Validación contra Supabase
// ---------------------------
async function validar(data: any): Promise<Inscripto> {
  const { nombre, edad, whatsapp, horario, dni, circuitoId, dia, email, nombreCircuito } = data || {};
  if (!nombre) throw new Error("Nombre es requerido");
  if (!edad || isNaN(Number(edad))) throw new Error("Edad inválida");
  if (!whatsapp) throw new Error("WhatsApp es requerido");
  if (!dni) throw new Error("DNI es requerido");
  if (!circuitoId) throw new Error("CircuitoId es requerido");
  if (!dia) throw new Error("Día es requerido");
  if (!horario) throw new Error("Horario es requerido");

  const { data: circuito, error } = await supabase
    .from("circuitos")
    .select('opciones_dia, opciones_horario, "NombreCircuito"')
    .eq("id", circuitoId)
    .single();

  if (error || !circuito) throw new Error("Circuito no encontrado");

  if (!Array.isArray(circuito.opciones_dia) || !circuito.opciones_dia.includes(dia)) {
    throw new Error("Día inválido");
  }
  if (!Array.isArray(circuito.opciones_horario) || !circuito.opciones_horario.includes(horario)) {
    throw new Error("Horario inválido");
  }

  return {
    nombre,
    edad: Number(edad),
    whatsapp: String(whatsapp),
    horario: String(horario),
    dni: String(dni),
    circuitoId: String(circuitoId),
    dia: String(dia),
    email: email ? String(email) : undefined,
    nombreCircuito: nombreCircuito ?? circuito.NombreCircuito,
  };
}

// ---------------------------
// Supabase
// ---------------------------
async function guardarEnSupabase(data: Inscripto) {
  console.log("📥 Insertando en Supabase:", data);
  const { error } = await supabase.from("inscripciones").insert([
    {
      nombre: data.nombre,
      edad: data.edad,
      whatsapp: data.whatsapp,
      horario: data.horario,
      dni: data.dni,
      circuito_id: data.circuitoId,
      dia: data.dia,
      email: data.email ?? null,
      estado: "Pendiente",
      notificado_director: false,
    },
  ]);
  if (error) {
    console.error("❌ Error Supabase:", error.message);
    throw new Error(`Supabase: ${error.message}`);
  }
  console.log("✅ Supabase insert OK");
}

// ---------------------------
// Notion
// ---------------------------
async function enviarANotion(data: Inscripto) {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DB_ID) {
    console.log("⚠️ Notion no configurado, se omite");
    return;
  }
  console.log("🗂️ Registrando en Notion:", data.nombre);

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID! },
      properties: {
        ID: { title: [{ text: { content: data.nombre } }] },
        Nombre: { rich_text: [{ text: { content: data.nombre } }] },
        Edad: { number: data.edad },
        DNI: { number: Number(data.dni) },
        WhatsApp: { rich_text: [{ text: { content: data.whatsapp } }] },
        Circuito: { rich_text: [{ text: { content: data.nombreCircuito ?? "" } }] },
        Dia: { multi_select: [{ name: data.dia }] },
        Horario: { multi_select: [{ name: data.horario }] },
        Email: data.email ? { email: data.email } : undefined,
        FechaInscripcion: { date: { start: new Date().toISOString() } },
        Estado: { rich_text: [{ text: { content: "Pendiente" } }] },
      },
    });
    console.log("✅ Notion registro OK");
  } catch (err: any) {
    console.error("❌ Error Notion:", err.message);
  }
}

// ---------------------------
// Telegram
// ---------------------------
async function enviarATelegram(data: Inscripto) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const authorizedUsers = process.env.TELEGRAM_AUTHORIZED_USERS?.split(",") || [];

  if (!token || authorizedUsers.length === 0) {
    console.log("⚠️ Telegram no configurado, se omite");
    return;
  }

  const texto =
    `📝 *Nuevo inscripto*\n\n` +
    `👤 *Nombre:* ${data.nombre}\n` +
    `🎂 *Edad:* ${data.edad}\n` +
    `🆔 *DNI:* ${data.dni}\n` +
    `📱 *WhatsApp:* ${data.whatsapp}\n` +
    `📍 *Circuito:* ${data.nombreCircuito ?? data.circuitoId}\n` +
    `📅 *Día:* ${data.dia}\n` +
    `⏰ *Horario:* ${data.horario}\n` +
    (data.email ? `✉️ *Email:* ${data.email}\n` : "") +
    `✅ Registro guardado en Supabase y Notion`;

  for (const chatId of authorizedUsers) {
    try {
      console.log("📲 Enviando a Telegram chatId:", chatId);
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: texto, parse_mode: "Markdown" }),
      });
    } catch (err: any) {
      console.error("❌ Error Telegram:", err.message);
    }
  }
}

// ---------------------------
// Brevo (Correo)
// ---------------------------
async function enviarCorreo(data: Inscripto) {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!apiKey || !from || !to) {
    console.warn("⚠️ Brevo no configurado: faltan BREVO_API_KEY/EMAIL_FROM/EMAIL_TO");
    return;
  }

  try {
    const brevo = await import("@getbrevo/brevo");
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    const email = new brevo.SendSmtpEmail();
    email.subject = "Nuevo inscripto - Caminatas Terapéuticas";
    email.sender = { email: from, name: "Buenos Pasos" };
    email.to = [{ email: to }];

    // 🔎 Mandamos todos los datos tal cual
    email.htmlContent = `
      <h2>Nuevo inscripto</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Edad:</strong> ${data.edad}</p>
      <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
      <p><strong>DNI:</strong> ${data.dni}</p>
      <p><strong>Circuito:</strong> ${data.nombreCircuito ?? data.circuitoId}</p>
      <p><strong>Día:</strong> ${data.dia}</p>
      <p><strong>Horario:</strong> ${data.horario}</p>
      <p><em>Registro guardado en Supabase y Notion</em></p>
    `;

    console.log("📧 Enviando correo a:", to);
    await apiInstance.sendTransacEmail(email);
    console.log("✅ Correo enviado vía Brevo");
  } catch (e: any) {
    console.error("❌ Error enviando correo con Brevo:", e.message);
  }
}


// ---------------------------
// Handlers
// ---------------------------
export async function GET() {
  return NextResponse.json({ ok: true, message: "Endpoint inscribirse activo" });
}

export async function POST(req: Request) {
  try {
    console.log("➡️ POST /api/inscribirse recibido");
    const body = await req.json();
    console.log("📦 Body recibido:", body);

    const data = await validar(body);
    console.log("✅ Validación OK:", data);

    await guardarEnSupabase(data);
    await Promise.all([
      enviarANotion(data),
      enviarATelegram(data),
      enviarCorreo(data), // ✅ ahora también correo
    ]);

    console.log("🎉 Flujo completo OK");
    return NextResponse.json({ ok: true, message: "Inscripción registrada con éxito" });
  } catch (err: any) {
    console.error("❌ Error en POST /api/inscribirse:", err.message);
    return NextResponse.json(
      { ok: false, error: err.message ?? "Error inesperado" },
      { status: 400 }
    );
  }
}
