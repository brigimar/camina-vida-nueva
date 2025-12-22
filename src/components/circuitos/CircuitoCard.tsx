"use client";

import { useState, FC } from "react";
import { motion } from "framer-motion";
import InscripcionModal from "../home/InscripcionModal";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaRuler,
} from "react-icons/fa";

interface Circuito {
  id: string;
  nombre: string;
  alias?: string | null;
  descripcion?: string | null;
  distancia?: number | null;
  dias?: string[] | string | null;
  horarios?:
    | string[]
    | string
    | { options?: Array<string | { name?: string }> }
    | null;
  punto_encuentro?: string | null;
  foto?: string | null;
  cupo_total?: number | null;
  estado?: boolean | string | null;
}

interface CircuitoCardProps {
  circuito: Circuito;
  mostrarBotonReserva?: boolean;
}

const CircuitoCard: FC<CircuitoCardProps> = ({
  circuito,
  mostrarBotonReserva = false,
}) => {
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  const {
    id,
    nombre,
    alias,
    descripcion,
    distancia,
    dias,
    horarios,
    punto_encuentro,
    foto,
    cupo_total,
    estado,
  } = circuito;

  const diasArray: string[] = Array.isArray(dias)
    ? dias
    : typeof dias === "string"
      ? dias.split(",").map((d) => d.trim())
      : [];

  const horariosArray: string[] = Array.isArray(horarios)
    ? horarios
    : typeof horarios === "string"
      ? horarios.split(",").map((h) => h.trim())
      : horarios &&
          typeof horarios === "object" &&
          "options" in horarios &&
          Array.isArray(horarios.options)
        ? horarios.options
            .map((o) =>
              typeof o === "string"
                ? o
                : o && typeof o === "object" && "name" in o
                  ? o.name
                  : null,
            )
            .filter((item): item is string => Boolean(item))
        : [];

  const puedeInscribirse: boolean = estado !== false;

  const handleOpenModal = (): void => {
    setMostrarFormulario(true);
  };

  const handleCloseModal = (): void => {
    setMostrarFormulario(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col border border-gray-100"
      >
        <motion.img
          src={foto || "/images/circuitos/default.jpg"}
          alt={nombre}
          className="w-full h-40 object-cover rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="space-y-3 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-800 text-lg leading-tight">
              {nombre || "â€”"}
            </h3>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              {cupo_total ?? 0}
            </span>
          </div>

          {alias && (
            <p className="text-xs text-gray-500">ðŸ·ï¸ Alias: {alias}</p>
          )}

          {descripcion && (
            <p className="text-sm text-gray-600 italic">"{descripcion}"</p>
          )}

          <div className="space-y-1 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <FaRuler className="text-gray-400" />
              {distancia ? `${distancia} m` : "Distancia no definida"}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" />
              {diasArray.length > 0
                ? diasArray.join(", ")
                : "DÃ­as no definidos"}
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-gray-400" />
              {horariosArray.length > 0
                ? horariosArray.join(", ")
                : "Horarios no definidos"}
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-600">
              <FaMapMarkerAlt className="text-gray-400" />
              {punto_encuentro || "⚠️ Punto de encuentro faltante"}
            </p>
          </div>

          {!puedeInscribirse && (
            <p className="text-xs text-red-600 font-semibold mt-2">
              ⚠️ Este circuito está inactivo
            </p>
          )}
        </div>

        {mostrarBotonReserva && puedeInscribirse && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="mt-5 w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition shadow"
            onClick={handleOpenModal}
          >
            Sumarme
          </motion.button>
        )}
      </motion.div>

      {mostrarFormulario && (
        <InscripcionModal
          circuitoId={id}
          nombreCircuito={nombre}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CircuitoCard;
