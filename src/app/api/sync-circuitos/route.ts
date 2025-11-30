import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';

// 🔐 Validación de entorno
if (!process.env.NOTION_API_KEY) throw new Error('❌ FALTA NOTION_API_KEY');
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('❌ FALTAN VARIABLES DE ENTORNO PARA SUPABASE');
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error('❌ FALTA NEXT_PUBLIC_SUPABASE_ANON_KEY');

// 🔗 Inicializar clientes
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// 🚀 Endpoint GET compatible con navegador
export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID,
      filter: {
        property: 'Estado',
        checkbox: { equals: true }
      },
      sorts: [{ property: 'NombreCircuito', direction: 'ascending' }]
    });

    const circuitos = response.results
      .map(page => {
        const props = page.properties;

        // 🖼️ Extracción robusta de imagen
        const fotoFile = props.Foto?.files?.[0];
        const fotoUrl =
          fotoFile?.type === 'file'
            ? fotoFile.file?.url
            : fotoFile?.external?.url;

        // 📍 Extracción robusta de punto de encuentro
        const puntoEncuentroRaw = props["PuntoEncuentro"];
        const punto_encuentro =
          puntoEncuentroRaw?.rich_text?.[0]?.plain_text?.trim() ||
          puntoEncuentroRaw?.title?.[0]?.plain_text?.trim() ||
          puntoEncuentroRaw?.select?.name?.trim() ||
          null;

        const circuito = {
          id: page.id,
          NombreCircuito: props["NombreCircuito"]?.title?.[0]?.plain_text?.trim() || null,
          Alias: props["Alias"]?.rich_text?.[0]?.plain_text?.trim() || null,
          Descripcion: props["Descripcion"]?.rich_text?.[0]?.plain_text?.trim() || null,
          Dias: props["Dias"]?.multi_select?.map(d => d.name).join(', ') || null,
          Horarios: props["Horarios"]?.rich_text?.[0]?.plain_text?.trim() || null,
          Distancia: props["Distancia"]?.number ?? null,
          Estado: props["Estado"]?.checkbox ?? false,
          foto: fotoUrl?.startsWith('http') ? fotoUrl : null,
          Localidad: props["Localidad"]?.select?.name || null,
          punto_encuentro,
          url: `https://www.notion.so/${page.id.replace(/-/g, '')}`
        };

        return circuito.NombreCircuito ? circuito : null;
      })
      .filter(Boolean);

    if (circuitos.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No se encontraron circuitos válidos en Notion' },
        { status: 404 }
      );
    }

    // 🧪 Validación visual
    const incompletos = circuitos.filter(c => !c.punto_encuentro);

    if (incompletos.length > 0) {
      console.warn(`⚠️ Circuitos sin punto de encuentro:`);
      incompletos.forEach(c => {
        console.warn(`- ${c.NombreCircuito}`);
      });
    }

    const { error } = await supabase
      .from('circuitos')
      .upsert(circuitos, { onConflict: 'id' });

    if (error) {
      console.error('❌ Error al guardar en Supabase:', error.message);
      return NextResponse.json(
        { success: false, message: 'Error al guardar en Supabase', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `✅ Sincronización completada. ${circuitos.length} circuitos insertados.`,
      total: circuitos.length,
      incompletos: incompletos.map(c => c.NombreCircuito)
    });

  } catch (error) {
    console.error('❌ Error en la sincronización:', error.message);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor', error: error.message },
      { status: 500 }
    );
  }
}
