import { supabase } from '@/lib/supabase';
import FormularioInscripcion from '@/components/FormularioInscripcion';

export default async function Page() {
  // Consultas a Supabase
  const { data: circuitos, error: errorCircuitos } = await supabase
    .from('circuitos')
    .select('*');

  const { data: inscripciones, error: errorInscripciones } = await supabase
    .from('inscripciones')
    .select('*');

  // Manejo de errores
  if (errorCircuitos || errorInscripciones) {
    console.error('Error cargando datos:', { errorCircuitos, errorInscripciones });
    return (
      <main className="p-6">
        <div className="text-red-500">
          Error al cargar los datos. Por favor, intenta nuevamente.
        </div>
      </main>
    );
  }

  // Manejo de datos nulos
  if (!circuitos || !inscripciones) {
    return (
      <main className="p-6">
        <div>Cargando...</div>
      </main>
    );
  }

  // Renderizado normal
  return (
    <main className="p-6">
      <FormularioInscripcion
        circuitos={circuitos ?? []}
        inscripciones={inscripciones ?? []}
      />
    </main>
  );
}
