export const dynamic = "force-dynamic";

import CircuitosListado from "@/components/circuitos/CircuitosListado";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function CircuitosPage() {
  const supabase = await createSupabaseServer();
  const res = await supabase.from('circuitos').select('*');
  if (res.error) throw new Error(res.error.message);
  const circuitos = res.data ?? [];

  return (
    <main className="min-h-screen bg-white py-16 px-6 max-w-screen-xl mx-auto">
      <CircuitosListado circuitos={circuitos} />
    </main>
  );
}

