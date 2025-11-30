import FormularioInscripcion from '@/components/FormularioInscripcion';
import supabase from '@/lib/supabase';

export default async function Page() {
  // Obtener circuitos e inscripciones desde Supabase
  const { data: circuitos } = await supabase.from('circuitos').select('*');
  const { data: inscripciones } = await supabase.from('inscripciones').select('*');

  return (
    <main className="p-6">
      <FormularioInscripcion circuitos={circuitos} inscripciones={inscripciones} />
    </main>
  );
}
