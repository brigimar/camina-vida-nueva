import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function testNotion() {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        ID: {
          title: [
            {
              text: { content: "test-id-001" }
            }
          ]
        },
        Nombre: {
          rich_text: [
            {
              text: { content: "Prueba conexión Notion" }
            }
          ]
        },
        Edad: { number: 30 },
        WhatsApp: {
          rich_text: [
            {
              text: { content: "+5491112345678" }
            }
          ]
        },
        Horario: { select: { name: "mañana" } }, // debe existir en la columna
        FechaInscripcion: { date: { start: new Date().toISOString() } },
        Estado: {
          rich_text: [
            {
              text: { content: "Pendiente" }
            }
          ]
        }
      }
    });

    console.log("✅ Conexión OK, página creada:", response.id);
  } catch (error) {
    console.error("❌ Error Notion:", error.message, error.body || error);
  }
}

testNotion();
