"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CircuitoCard from "@/components/circuitos/CircuitoCard";
import InscripcionModal from "./InscripcionModal";

export default function CircuitosHome() {
  const [circuitos, setCircuitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [circuitoSeleccionado, setCircuitoSeleccionado] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("/api/circuitos", { cache: "no-store" });
        if (!res.ok) throw new Error("Error al cargar circuitos");

        const response = await res.json();

        console.log("✅ Respuesta cruda:", response);

        // ✅ API devuelve { data: { data: [...], pagination: {...} } }
        setCircuitos(response?.data?.data ?? []);
      } catch (e) {
        console.error("Error cargando circuitos:", e);
        setError("No se pudieron cargar los circuitos.");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  function abrirInscripcion(circuito) {
    setCircuitoSeleccionado(circuito);
    setModalAbierto(true);
  }

  return (
    <section className="py-16 px-6 max-w-screen-xl mx-auto">
      {/* TÍTULO */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold text-center text-[#0F172A] mb-6"
      >
        🧭 Circuitos Camina Vida
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-center text-gray-600 mb-10"
      >
        Elegí tu circuito ideal y registrate directamente desde la Home.
      </motion.p>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500 py-10 animate-pulse">
          Cargando circuitos...
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="text-center text-red-600 py-10">{error}</div>
      )}

      {/* SIN RESULTADOS */}
      {!loading && !error && circuitos.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No hay circuitos disponibles por el momento.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {circuitos.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CircuitoCard
                circuito={c}
                onInscribirse={() => abrirInscripcion(c)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalAbierto && circuitoSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InscripcionModal
              circuito={circuitoSeleccionado}
              onClose={() => setModalAbierto(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
