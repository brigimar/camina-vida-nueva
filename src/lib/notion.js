/* eslint-disable @typescript-eslint/no-var-requires */
import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-mjs';

if (!process.env.NOTION_API_KEY)
  throw new Error('❌ FALTA NOTION_API_KEY');
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error('❌ FALTAN VARIABLES DE SUPABASE');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 🔧 Normalizador universal
function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.map(v => String(v).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

export async function fetchCircuitosFromNotion() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID,
      filter: { property: 'Estado', checkbox: { equals: true } },
      sorts: [{ property: 'NombreCircuito', direction: 'ascending' }]
    });

    return response.results
      .map((page) => {
        const props = page.properties;
        const circuito = {
          id: page.id,
          NombreCircuito: props['NombreCircuito']?.title?.[0]?.plain_text?.trim() || null,
          Alias: props['Alias']?.rich_text?.[0]?.plain_text?.trim() || null,
          Descripcion: props['Descripcion']?.rich_text?.[0]?.plain_text?.trim() || null,
          Dias: normalizeArray(props['Dias']?.multi_select?.map(d => d.name)),
          Horarios: normalizeArray(props['Horarios']?.multi_select?.map(h => h.name)),
          Distancia: props['Distancia']?.number ?? null,
          Estado: props['Estado']?.checkbox ?? false,
          Foto: props['Foto']?.rich_text?.[0]?.plain_text?.trim() || null,
          Localidad: props['Localidad']?.select?.name || null,
          url: `https://www.notion.so/${page.id.replace(/-/g, '')}`
        };
        return circuito.NombreCircuito ? circuito : null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error('❌ Error al obtener circuitos desde Notion:', error.message);
    return [];
  }
}

export async function getCircuitos() {
  try {
    const notionCircuitos = await fetchCircuitosFromNotion();

    const { data: supabaseData, error } = await supabase
      .from('vista_circuitos_completa')
      .select('*');

    if (error) {
      console.error('❌ Error Supabase:', error.message);
      return notionCircuitos.map((c) => ({
        ...c,
        nombre: c.NombreCircuito,
        alias: c.Alias || '',
        localidad: c.Localidad || '',
        descripcion: c.Descripcion ?? '',
        dias: c.Dias || [],
        horarios: c.Horarios || [],
        foto: c.Foto || '/images/circuitos/default.jpg',
        distancia: c.Distancia ?? null,
        estado: c.Estado ?? false,
        cupo_total: '—',
        cantidad_inscriptos: 0,
        tiene_coordinador: false,
        sincronizado: false,
        punto_encuentro: null
      }));
    }

    return notionCircuitos.map((c) => {
      const op = supabaseData.find((s) => s.id === c.id);
      return {
        id: c.id,
        nombre: c.NombreCircuito,
        alias: c.Alias || '',
        localidad: c.Localidad || '',
        descripcion: c.Descripcion ?? '',
        dias: c.Dias || [],
        horarios: c.Horarios || [],
        foto: c.Foto || '/images/circuitos/default.jpg',
        distancia: c.Distancia ?? null,
        estado: c.Estado ?? false,
        cupo_total: op?.cupo_restante ?? null,
        cantidad_inscriptos: op?.cantidad_inscriptos ?? 0,
        tiene_coordinador: op?.tiene_coordinador ?? false,
        sincronizado: !!op,
        punto_encuentro: op?.punto_encuentro || null,
        url: c.url || null
      };
    });
  } catch (error) {
    console.error('❌ Error al combinar circuitos:', error.message);
    return [];
  }
}

export async function fetchPageBlocks(pageId) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });

    const blocks = Array.isArray(response?.results) ? response.results : [];

    return blocks;
  } catch (error) {
    console.error('❌ Error al obtener bloques de Notion:', error.message);
    return [];
  }
}
