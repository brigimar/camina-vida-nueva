'use client';
import { useState, useEffect } from 'react';
import CircuitoCard from './CircuitoCard';
import FiltrosCircuitos from './FiltrosCircuitos';

export default function CaminatasCliente({ circuitos }) {
  // Asegurarse de que siempre sea un array
  const [filtrados, setFiltrados] = useState(Array.isArray(circuitos) ? circuitos : []);

  // Si circuitos cambia (por ejemplo fetch client-side), actualizar filtrados
  useEffect(() => {
    setFiltrados(Array.isArray(circuitos) ? circuitos : []);
  }, [circuitos]);

  if (!Array.isArray(circuitos) || circuitos.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-texto-oscuro">Caminatas</h1>
        <p className="text-center text-gray-500 italic mt-4">
          No hay circuitos disponibles por el momento.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-texto-oscuro">Caminatas</h1>

      <FiltrosCircuitos circuitos={circuitos} onFiltrar={setFiltrados} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.length > 0 ? (
          filtrados.map(c => {
            // Validación de propiedades de cada circuito
            const circuitoSeguro = {
              id: c?.id ?? Math.random().toString(),
              ...c,
            };

            return (
              <CircuitoCard
                key={circuitoSeguro.id}
                circuito={circuitoSeguro}
                mostrarBotonReserva={true}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 italic col-span-full">
            No se encontraron caminatas con los filtros seleccionados.
          </p>
        )}
      </div>
    </div>
  );
}
