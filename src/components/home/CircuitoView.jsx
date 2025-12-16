'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InscripcionModal from "./InscripcionModal";
import MapaPuntoEncuentro from "./MapaPuntoEncuentro";

export default function CircuitoView({ circuito }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hola! Quiero compartirte este circuito de Camina Vida:\n\n` +
    `🏞️ *${circuito.NombreCircuito}*\n` +
    `📍 ${circuito.Localidad}\n` +
    `📅 ${circuito.Dias?.join(", ")}\n` +
    `🕒 ${circuito.Horarios?.join(", ")}\n\n` +
    `Podés verlo acá:\n${typeof window !== "undefined" ? window.location.href : ""}`
  );

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">

      {/* TÍTULO */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold mb-4 text-[#0F172A]"
      >
        {circuito.NombreCircuito}
      </motion.h1>

      {/* DESCRIPCIÓN */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-gray-600 mb-6 leading-relaxed"
      >
        {circuito.Descripcion}
      </motion.p>

      {/* FOTO PRINCIPAL */}
      {circuito.foto && (
        <motion.img
          src={circuito.foto}
          alt={circuito.NombreCircuito}
          className="w-full rounded-xl shadow-lg mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* INFO DEL CIRCUITO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="space-y-3 mb-10 bg-gray-50 p-6 rounded-xl shadow-sm"
      >
        <p><strong>Localidad:</strong> {circuito.Localidad}</p>
        <p><strong>Días:</strong> {circuito.Dias?.join(", ")}</p>
        <p><strong>Horarios:</strong> {circuito.Horarios?.join(", ")}</p>
        <p><strong>Distancia:</strong> {circuito.Distancia} km</p>
        <p><strong>Tiempo estimado:</strong> {circuito.tiempo_estimado || "—"}</p>
        <p><strong>Dificultad:</strong> {circuito.dificultad || "—"}</p>
        <p><strong>Punto de encuentro:</strong> {circuito.punto_encuentro}</p>
        <p><strong>Cupo restante:</strong> {circuito.cupo_restante}</p>
      </motion.div>

      {/* FOTO DEL COORDINADOR */}
      {circuito.coordinador_nombre && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex items-center gap-4 mb-10 bg-white p-4 rounded-xl shadow"
        >
          <img
            src={circuito.coordinador_foto || "/images/default-user.png"}
            alt={circuito.coordinador_nombre}
            className="w-16 h-16 rounded-full object-cover shadow"
          />
          <div>
            <p className="font-semibold text-gray-800">
              {circuito.coordinador_nombre}
            </p>
            <p className="text-sm text-gray-500">Coordinador del circuito</p>
          </div>
        </motion.div>
      )}

      {/* SECCIÓN QUÉ LLEVAR */}
      {circuito.que_llevar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mb-10 bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold mb-3">🎒 Qué llevar</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {circuito.que_llevar.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* MAPA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mb-10"
      >
        <MapaPuntoEncuentro
          lat={circuito.lat}
          lng={circuito.lng}
          nombre={circuito.NombreCircuito}
        />
      </motion.div>

      {/* BOTONES */}
      <div className="flex flex-col sm:flex-row gap-4">

        {/* INSCRIPCIÓN */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setModalAbierto(true)}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md w-full sm:w-auto"
        >
          Inscribirme
        </motion.button>

        {/* WHATSAPP */}
        <motion.a
          whileTap={{ scale: 0.97 }}
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <span>Compartir</span> 📲
        </motion.a>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InscripcionModal
              circuito={{
                id: circuito.circuito_id,
                nombre: circuito.NombreCircuito,
              }}
              onClose={() => setModalAbierto(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
