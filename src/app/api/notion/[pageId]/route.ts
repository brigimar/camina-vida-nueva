// src/app/api/notion/[pageId]/route.js
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request, { params }) {
  try {
    // 👇 Await aquí también
    const { pageId } = await params;

    if (!pageId || pageId === 'undefined') {
      return NextResponse.json(
        { error: 'pageId is required' },
        { status: 400 }
      );
    }

    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 50,
    });

    return NextResponse.json({ blocks: response.results });
  } catch (error) {
    console.error('Error al obtener bloques de Notion:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}