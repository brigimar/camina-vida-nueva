import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';

const csvData = `NombreCircuito,Descripcion,Localidad,Alias,Distancia,Foto,Estado,Dias,url
Circuito Norte,Caminata matutina por zona norte,Castelar,Ruta Verde,1000,caminando.jpeg,Yes,"Lunes, Miercoles",https://www.notion.so/buenos-pasos/Circuito-Norte-29934386701781f884c7fbd3c7e6765d
Circuito Sur,Caminata matutina por zona norte,San Telmo,Sendero del Bosque,500,puerto_madero.jpeg,Yes,Martes,https://www.notion.so/buenos-pasos/Circuito-Sur-29934386701781d0a46ef99e5221aaf9
Circuito Centro,Caminata matutina por zona norte,Palermo,Camino de los Sauces,750,caminantes2.jpg,Yes,Miercoles,https://www.notion.so/buenos-pasos/Circuito-Centro-299343867017813194e1e58ad307ae12
Circuito Bosque,Caminata matutina por zona norte,Belgrano,Sendero del Bosque,850,caminantes.jpg,Yes,Jueves,https://www.notion.so/buenos-pasos/Circuito-Bosque-2993438670178151a19de8e2c8ef56e0
Villa Crespo,Caminata matutina por zona norte,Villa Crespo,Ruta Verde,900,caminantes%201.jpg,Yes,"Lunes, Miercoles",
Boedo,,Boedo,Camino de los Sauces,1100,caminando%201.jpeg,Yes,"Jueves, Lunes",
Recoleta,,Recoleta,Sendero del Bosque,600,puerto_madero%201.jpeg,Yes,Lunes,
Constitucion,,Constitucion,Ruta Verde,800,caminantes%202.jpg,Yes,,
Almagro,,Almagro,Camino de los Sauces,900,Caminatas_Saludables_Logo_-_Warm_Inclusive_Aesthetic.png,Yes,,
Nueva Pompeya,,Nueva Pompeya,Sendero del Bosque,1400,Community_Wellness_Logo_with_Heart_Shape.png,Yes,,`;

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const rows = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  const resultados = [];

  for (const row of rows) {
    const nombre = row.NombreCircuito?.trim();
    const url = row.url?.trim();

    if (!nombre || !url) {
      resultados.push({ nombre, status: '⚠️ Sin URL de Notion' });
      continue;
    }

    const notion_id = url.split('-').pop();

    const { data: match, error } = await supabase
      .from('circuitos')
      .select('id')
      .eq('nombre', nombre)
      .single();

    if (error || !match) {
      resultados.push({ nombre, status: '❌ No encontrado en Supabase' });
      continue;
    }

    const { error: updateError } = await supabase
      .from('circuitos')
      .update({ notion_id })
      .eq('id', match.id);

    if (updateError) {
      resultados.push({ nombre, status: '❌ Error al actualizar' });
    } else {
      resultados.push({ nombre, status: '✅ Actualizado con ID de Notion' });
    }
  }

  return NextResponse.json({ resultados });
}
