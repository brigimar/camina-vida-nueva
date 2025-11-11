'use client';
import { useState, useEffect, useMemo } from 'react';
import supabase from '@/lib/supabase';

export default function DashboardResumen() {
  const [inscriptos, setInscriptos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('vista_inscriptos_dashboard')
          .select('id, nombre, edad, circuitonombre');

        if (error) throw error;
        setInscriptos(data || []);
      } catch (err) {
        console.error('Error al cargar datos para resumen:', err?.message || err || 'Error desconocido');
        setError('No se pudieron cargar los datos del resumen.');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const totalInscriptos = inscriptos.length;

  const inscriptosPorCircuito = useMemo(() => {
    const grupos = {};
    inscriptos.forEach(i => {
      const nombre = i.circuitonombre || 'Sin circuito';
      grupos[nombre] = (grupos[nombre] || 0) + 1;
    });
    return Object.entries(grupos).sort((a, b) => b[1] - a[1]);
  }, [inscriptos]);

  const { edadPromedio, edadMin, edadMax } = useMemo(() => {
    const edades = inscriptos
      .map(i => i.edad)
      .filter(edad => typeof edad === 'number' && edad > 0);

    if (edades.length === 0) {
      return { edadPromedio: null, edadMin: null, edadMax: null };
    }

    const suma = edades.reduce((acc, edad) => acc + edad, 0);
    const promedio = Math.round(suma / edades.length);
    const min = Math.min(...edades);
    const max = Math.max(...edades);

    return { edadPromedio: promedio, edadMin: min, edadMax: max };
  }, [inscriptos]);

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg">
        ❌ {error}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">📊 Resumen de Inscripciones</h2>

      {cargando ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow animate-pulse flex flex-col items-center justify-center">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Tarjeta titulo="Total de inscriptos" valor={totalInscriptos} color="bg-blue-100 text-blue-800" />
            <Tarjeta titulo="Edad promedio" valor={edadPromedio ?? '—'} color="bg-green-100 text-green-800" />
            <Tarjeta titulo="Edad más joven" valor={edadMin ?? '—'} color="bg-yellow-100 text-yellow-800" />
            <Tarjeta titulo="Edad más avanzada" valor={edadMax ?? '—'} color="bg-purple-100 text-purple-800" />
          </div>

          {inscriptosPorCircuito.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Inscriptos por circuito</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {inscriptosPorCircuito.map(([circuito, cantidad]) => (
                  <Tarjeta key={circuito} titulo={circuito} valor={cantidad} color="bg-gray-100 text-gray-800" />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function Tarjeta({ titulo, valor, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow border border-gray-200 flex flex-col items-center justify-center min-h-[120px]">
      <p className="text-sm text-gray-600 text-center mb-3">{titulo}</p>
      <span className={`text-xl font-bold px-4 py-2 rounded-full ${color} inline-flex items-center justify-center min-w-[60px]`}>
        {valor}
      </span>
    </div>
  );
}
