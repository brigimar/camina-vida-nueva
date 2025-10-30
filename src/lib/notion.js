import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Función para fetch contenido de una página de Notion y convertirlo a Markdown
export async function getPageContent(pageId) {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return '# Error al cargar el contenido desde Notion.';
  }
}

// Función para caminatas futuras
export async function getUpcomingHikes() {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_HIKES_ID,
      filter: {
        and: [
          {
            property: 'Fecha',
            date: { on_or_after: today },
          },
        ],
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page) => ({
      id: page.id,
      title: page.properties.Titulo?.title[0]?.plain_text || 'Sin título',
      fecha: page.properties.Fecha?.date?.start || '',
      ubicacion: page.properties.Ubicacion?.rich_text[0]?.plain_text || '',
      descripcion: page.properties.Descripcion?.rich_text.map((rt) => rt.plain_text).join('') || '',
      imagen: page.properties.Imagen?.files[0]?.external?.url ||
        page.properties.Imagen?.files[0]?.file?.url || '',
      linkInscripcion: page.properties.LinkInscripcion?.url || '',
    }));
  } catch (error) {
    console.error('Error fetching hikes:', error);
    return [];
  }
}

// Función para testimonios
export async function getTestimonios() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_TESTIMONIOS_ID,
      sorts: [
        {
          property: 'Calificacion',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => ({
      id: page.id,
      nombre: page.properties.Nombre?.title[0]?.plain_text || 'Anónimo',
      testimonio: page.properties.Testimonio?.rich_text.map((rt) => rt.plain_text).join('') || '',
      calificacion: page.properties.Calificacion?.number || 0,
      foto: page.properties.Foto?.files[0]?.external?.url ||
        page.properties.Foto?.files[0]?.file?.url || '',
    }));
  } catch (error) {
    console.error('Error fetching testimonios:', error);
    return [];
  }
}

// Función para obtener el equipo
export async function getEquipo() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_EQUIPO_ID,
      sorts: [{ property: 'Nombre', direction: 'ascending' }],
    });

    return response.results.map((page) => ({
      id: page.id,
      nombre: page.properties.Nombre?.title[0]?.plain_text || 'Anónimo',
      rol: page.properties.Rol?.rich_text[0]?.plain_text || '',
      bio: page.properties.Bio?.rich_text[0]?.plain_text || '',
      foto: page.properties.Foto?.files[0]?.external?.url ||
        page.properties.Foto?.files[0]?.file?.url || '',
      linkedin: page.properties.LinkedIn?.url || '',
    }));
  } catch (error) {
    console.error('Error fetching equipo:', error);
    return [];
  }
}

// Función para obtener los circuitos
export async function getCircuitos() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID,
      sorts: [
        {
          property: 'Localidad',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page) => ({
      id: page.id,
      // Localidad es de tipo TÍTULO -> usa .title
      localidad: page.properties.Localidad?.title && page.properties.Localidad.title.length > 0 
                ? page.properties.Localidad.title[0].plain_text 
                : '',
      // NombreCircuito es de tipo TEXTO -> usa .rich_text
      nombreCircuito: page.properties.NombreCircuito?.rich_text && page.properties.NombreCircuito.rich_text.length > 0 
                     ? page.properties.NombreCircuito.rich_text[0].plain_text 
                     : 'Sin nombre',
      // Procesamos el Multi-select de Días
      dias: page.properties.Dias?.multi_select && page.properties.Dias.multi_select.length > 0 
            ? page.properties.Dias.multi_select.map(dia => dia.name).join(', ') 
            : '',
      // Procesamos el Multi-select de Horarios
      horarios: page.properties.Horarios?.multi_select && page.properties.Horarios.multi_select.length > 0 
               ? page.properties.Horarios.multi_select.map(hora => hora.name).join(', ') 
               : '',
      // Estado del circuito
      estado: page.properties.Estado?.select?.name || '',
    }));
  } catch (error) {
    console.error('Error fetching circuitos:', error);
    return [];
  }
}