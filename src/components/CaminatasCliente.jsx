'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import CircuitoCard from './CircuitoCard';
import FiltroCaminatas from './FiltroCaminatas';

export default function CaminatasCliente() {
  const [circuitos, setCircuitos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  // Cargar circuitos desde Supabase client-side
  useEffect(() => {
    async function cargar() {
      try {
        const { data, error } = await supabase
          .from('vista_circuitos_completa')
          .select('*');

        if (error) {
          console.error('Error cargando circuitos:', error.message);
          setCircuitos([]);
          setFiltrados([]);
        } else {
          const safeData = Array.isArray(data) ? data : [];
          setCircuitos(safeData);
          setFiltrados(safeData);
        }
      } catch (e) {
        console.error('Excepción cargando circuitos:', e);
        setCircuitos([]);
        setFiltrados([]);
      }
    }
    cargar();
  }, []);

  if (!circuitos.length) {
    return (
      <p className="text-center text-gray-500 py-6">
        Cargando circuitos...
      </p>
    );
  }

  // Parseo seguro de Dias y Horarios
  const parseDias = (d) => {
    if (Array.isArray(d)) return d;
    if (typeof d === 'string') return d.split(',').map(s => s.trim());
    return [];
  };

  const parseHorarios = (h) => {
    if (Array.isArray(h)) return h;
    if (typeof h === 'string') return h.split(',').map(s => s.trim());
    return [];
  };

  return (
    <div className="space-y-6">
      {/* Filtro premium */}
      <FiltroCaminatas circuitos={circuitos} onFiltrar={setFiltrados} />

      {/* Grid de Circuitos */}
      {filtrados.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No se encontraron caminatas con los filtros seleccionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map(c => {
            const circuitoSeguro = {
              id: c.circuito_id ?? Math.random().toString(),
              nombre: c.NombreCircuito ?? '—',
              descripcion: c.Descripcion ?? '—',
              localidad: c.Localidad ?? '—',
              foto: c.foto ?? '/images/circuitos/default.jpg',
              distancia: c.Distancia ?? '—',
              dias: parseDias(c.Dias),
              horarios: parseHorarios(c.Horarios),
              punto_encuentro: c.punto_encuentro ?? '—',
              cupo_total: c.cupo_total ?? 0,
              cupo_restante: c.cupo_restante ?? 0,
              cantidad_inscriptos: c.cantidad_inscriptos ?? 0,
              disponible_para_inscripcion: c.disponible_para_inscripcion ?? false,
              url: c.url ?? null,
              alias: c.Alias ?? null,
            };

            return (
              <CircuitoCard
                key={circuitoSeguro.id}
                circuito={circuitoSeguro}
                mostrarBotonReserva={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
