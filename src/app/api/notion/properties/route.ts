import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET() {
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    const db = await notion.databases.retrieve({
      database_id: process.env.NOTION_DB_ID!,
    });

    return NextResponse.json(
      {
        ok: true,
        title_properties: Object.entries(db.properties)
          .filter(([_, prop]: any) => prop.type === "title"),
        all_properties: db.properties,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
