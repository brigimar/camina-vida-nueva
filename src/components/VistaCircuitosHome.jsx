'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import CircuitoCard from '@/components/CircuitoCard';

export default function VistaCircuitosHome({ mostrarBotonReserva = false }) {
  const [circuitos, setCircuitos] = useState([]);
  const [filtroLocalidad, setFiltroLocalidad] = useState('');
  const [filtroDias, setFiltroDias] = useState([]);

  useEffect(() => {
    async function cargar() {
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
          disponible_para_inscripcion
        `); // ❌ cupo_lleno eliminado

      if (error) console.error('Error al cargar circuitos:', error.message);
      else setCircuitos(data || []);
    }
    cargar();
  }, []);

  const localidades = [...new Set(circuitos.map(c => c.Localidad).filter(Boolean))];
  const diasUnicos = [...new Set(circuitos.flatMap(c => c.Dias || []))];

  const filtrados = circuitos.filter(c =>
    (!filtroLocalidad || c.Localidad === filtroLocalidad) &&
    (filtroDias.length === 0 || filtroDias.some(d => c.Dias.includes(d)))
  );

  return (
    <section className="py-16 px-6 bg-white max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-[#0F172A] mb-4">🧭 Circuitos Camina Vida</h2>
      <p className="text-center text-gray-600 mb-10 text-base">
        Elegí tu circuito ideal y registrate directamente desde la home.
      </p>

      {/* 🎛️ Filtros */}
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        <select
          value={filtroLocalidad}
          onChange={e => setFiltroLocalidad(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md text-sm shadow-sm"
        >
          <option value="">Todas las localidades</option>
          {localidades.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <div className="flex gap-2 flex-wrap">
          {diasUnicos.map(dia => (
            <button
              key={dia}
              onClick={() =>
                setFiltroDias(prev =>
                  prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
                )
              }
              className={`px-3 py-1 text-sm rounded-full border shadow-sm transition ${
                filtroDias.includes(dia)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {dia}
            </button>
          ))}
        </div>
      </div>

      {/* 🧩 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {filtrados.map(c => (
          <CircuitoCard
            key={c.circuito_id}
            circuito={{
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
              disponible_para_inscripcion: c.disponible_para_inscripcion ?? false
            }}
            mostrarBotonReserva={mostrarBotonReserva}
          />
        ))}
      </div>
    </section>
  );
}
