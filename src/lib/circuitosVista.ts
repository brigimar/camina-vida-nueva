import { supabase } from './supabase';

export async function getCircuitosVista() {
  if (!supabase?.from) {
    console.error('Supabase no está inicializado correctamente');
    return [];
  }

  const { data, error } = await supabase
    .from('vista_circuitos_completa')
    .select(`
      circuito_id,
      "NombreCircuito",
      "Descripcion",
      "Localidad",
      "Dias",
      "Horarios",
      "Distancia",
      "Alias",
      foto,
      url,
      punto_encuentro,
      cupo_total,
      cupo_restante,
      cantidad_inscriptos,
      disponible_para_inscripcion
    `);

  if (error) {
    console.error('Error al obtener circuitos:', error.message);
    return [];
  }

  return Array.isArray(data) ? data : [];
}
