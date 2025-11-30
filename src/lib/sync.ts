import { createClient } from '@supabase/supabase-js';
import { fetchCircuitosFromNotion } from './notion';

export async function syncCircuitosToSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Faltan variables de entorno para Supabase');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const circuitos = await fetchCircuitosFromNotion();

  if (!Array.isArray(circuitos) || circuitos.length === 0) {
    throw new Error('Los datos de Notion no son válidos o están vacíos');
  }

  const { data, error } = await supabase
    .from('circuitos')
    .upsert(circuitos, {
      onConflict: ['id'],
      ignoreDuplicates: false,
      returning: 'minimal', // o 'representation' si querés ver los datos insertados
    });

  if (error) {
    throw new Error(`Error al sincronizar circuitos: ${error.message}`);
  }

  return { success: true, count: circuitos.length };
}
