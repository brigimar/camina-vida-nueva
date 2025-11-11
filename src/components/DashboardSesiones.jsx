'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Users, CalendarDays, Clock } from 'lucide-react';

export default function DashboardSesiones() {
  const [sesiones, setSesiones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase
        .from('vista_sesiones_con_inscriptos')
        .select('*')
        .order('dia', { ascending: true });

      if (error) console.error('Error al cargar sesiones:', error.message);
      else setSesiones(data || []);
      setCargando(false);
    }
    cargar();
  }, []);

  const handleSumarme = (sesion) => {
    alert(`🧍 Te sumarías a la sesión del ${sesion.dia} (${sesion.horario}) en ${sesion.circuitonombre}`);
    // 👉 En el futuro: acá conectamos con la tabla de inscripciones.
  };

  if (cargando) return <p className="text-center py-10 text-gray-500">Cargando sesiones...</p>;

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        🏃‍♀️ Sesiones Activas
      </h2>

      {sesiones.length === 0 ? (
        <p className="text-center text-gray-500">No hay sesiones cargadas todavía.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sesiones.map((s) => (
            <Card key={s.sesion_id} className="shadow-sm hover:shadow-md transition rounded-2xl border border-gray-200">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-semibold text-indigo-700 truncate">
                  {s.circuitonombre}
                </h3>
              </CardHeader>

              <CardContent className="text-sm text-gray-600 space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-indigo-500" />
                  <span>{s.dia}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>{s.horario}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>{s.inscriptos} inscriptos / {s.cupo_maximo} cupo</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      s.cupo_restante > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {s.cupo_restante > 0
                      ? `${s.cupo_restante} lugares`
                      : 'Cupo lleno'}
                  </span>

                  <Button
                    size="sm"
                    onClick={() => handleSumarme(s)}
                    disabled={s.cupo_restante <= 0}
                    className={`text-sm ${
                      s.cupo_restante <= 0
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {s.cupo_restante > 0 ? 'Sumarme' : 'Lleno'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
