import supabase from './supabase';

export async function getCircuitosVista() {
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
      estado_legible,
      foto,
      url,
      punto_encuentro,
      cupo_total,
      cupo_restante,
      cantidad_inscriptos,
      cupo_lleno,
      disponible_para_inscripcion
    `);

  if (error) throw new Error('Error al cargar circuitos: ' + error.message);

  return (data || []).map(c => ({
    id: c.circuito_id,
    nombre: c.NombreCircuito || '—',
    descripcion: c.Descripcion || '—',
    localidad: c.Localidad || '—',
    foto: c.foto || '/images/circuitos/default.jpg',
    estado: c.estado_legible,
    distancia: c.Distancia ?? null,
    dias: c.Dias || [],
    horarios: c.Horarios || [],
    url: c.url || null,
    punto_encuentro: c.punto_encuentro || null,
    alias: c.Alias || null,
    cupo_total: c.cupo_total ?? null,
    cupo_restante: c.cupo_restante ?? null,
    cantidad_inscriptos: c.cantidad_inscriptos ?? 0,
    cupo_lleno: c.cupo_lleno ?? false,
    disponible_para_inscripcion: c.disponible_para_inscripcion ?? false
  }));
}
