import { NextResponse } from 'next/server';
import { fetchPageBlocks } from '@/lib/notion';

export async function GET() {
  console.log('🧪 Fetching Notion blocks...');
  try {
    const blocks = await fetchPageBlocks('22bb3438670178038b792f0c060d491a1');
    console.log('📦 Bloques recibidos:', blocks.length);
    return NextResponse.json({ blocks });
  } catch (error) {
    console.error('❌ Error en la API de Notion:', error.message);
    return NextResponse.json({ error: 'No se pudieron cargar los bloques.' }, { status: 500 });
  }
}
