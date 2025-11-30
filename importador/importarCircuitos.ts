import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Leer y parsear el CSV
// Leer y limpiar el CSV (elimina BOM invisible)
const csv = fs.readFileSync('./Circuitos.csv', 'utf-8').replace(/^\uFEFF/, '');

const records = parse(csv, {
  columns: true,
  skip_empty_lines: true,
});


console.log('Encabezados detectados:', Object.keys(records[0])); // ✅ Ahora sí existe


async function importar() {
  for (const r of records) {
    const diasArray = r.Dias.split(',').map(d => d.trim());
    const urlNotion = r.url || r.URL || r.Url || r.UrlNotion || r['url']; // por si el parser lo interpreta distinto
    const notionId = urlNotion.split('-').pop();

    const circuito = {
      nombre: r.NombreCircuito,
      descripcion: r.Descripcion,
      localidad: r.Localidad,
      alias: r.Alias,
      distancia: parseInt(r.Distancia),
      imagen: r.Foto,
      estado: r.Estado === 'Yes',
      dias: diasArray,
      url_notion: urlNotion,
      notion_id: notionId,
    };

    const { error } = await supabase.from('circuitos').insert(circuito);

    if (error) {
      console.error(`❌ Error al insertar ${circuito.nombre}:`, error.message);
    } else {
      console.log(`✅ Insertado: ${circuito.nombre}`);
    }
  }
}

importar();
