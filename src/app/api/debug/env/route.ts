export const runtime = "nodejs";

import { NextResponse } from "next/server";

function mask(value?: string) {
  if (!value) return "❌ NO DEFINIDA";
  if (value.length < 8) return "⚠️ DEMASIADO CORTA PARA MOSTRAR";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

export async function GET() {
  return NextResponse.json({
    supabase: {
      NEXT_PUBLIC_SUPABASE_URL: mask(process.env.NEXT_PUBLIC_SUPABASE_URL),
      SUPABASE_SERVICE_ROLE_KEY: mask(process.env.SUPABASE_SERVICE_ROLE_KEY),
    },
    notion: {
      NOTION_API_KEY: mask(process.env.NOTION_API_KEY),
      NOTION_DB_ID: mask(process.env.NOTION_DB_ID),
    },
    brevo: {
      BREVO_API_KEY: mask(process.env.BREVO_API_KEY),
    },
    telegram: {
      TELEGRAM_BOT_TOKEN: mask(process.env.TELEGRAM_BOT_TOKEN),
      TELEGRAM_CHAT_ID: mask(process.env.TELEGRAM_CHAT_ID),
    },
    system: {
      NODE_ENV: process.env.NODE_ENV ?? null,
      RUNTIME: "nodejs",
    },
  });
}
