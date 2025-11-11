import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';


export async function GET() {
  const { data, error } = await supabase
    .from('vista_sesiones_caminatas')
    .select('*')
    .order('circuito', { ascending: true })
    .order('dia', { ascending: true })
    .order('horario', { ascending: true });

  if (error) {
    console.error('Error Supabase:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
