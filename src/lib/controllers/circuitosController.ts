// src/lib/controllers/circuitosController.js
import { getCircuitos } from '@/lib/notion';

/**
 * Obtiene todos los circuitos combinados (Notion + Supabase)
 * Esta es la función principal que debe usar la página /circuitos
 */
export async function getTodosLosCircuitos() {
  try {
    const circuitos = await getCircuitos(); // Usa la función mejorada de notion.js

    // Mapea los datos para que coincidan con lo que espera CircuitoCard
    return circuitos.map(c => ({
      id: c.id,
      nombre: c.nombre,
      alias: c.alias || 'Circuito Saludable',
      descripcion: c.descripcion,
      localidad: c.localidad,
      distancia_km: c.distancia_km,
      distancia_metros: c.distancia_metros,
      dias: c.dias,
      foto_url: c.foto_url,
      url: c.url,
      horario: c.horario,
      cupoRestante: c.cupoRestante,
      cantidad_inscriptos: c.cantidad_inscriptos,
      tiene_coordinador: c.tiene_coordinador,
      estado: c.estado,
      sincronizado: c.sincronizado,
    }));
  } catch (error) {
    console.error('❌ Error en circuitosController:', error.message);
    return [];
  }
}

/**
 * Obtiene un circuito por su ID
 * Útil para páginas de detalle
 */
export async function getCircuitoPorId(id) {
  const circuitos = await getTodosLosCircuitos();
  return circuitos.find(c => c.id === id) || null;
}