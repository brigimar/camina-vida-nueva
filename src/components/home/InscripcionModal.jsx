"use client";

import FormularioInscripcion from "@/components/inscripcion/FormularioInscripcion";

export default function InscripcionModal({ circuito, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Inscribirse en {circuito.nombre}
        </h2>

        <FormularioInscripcion circuito={circuito} onSuccess={onClose} />
      </div>
    </div>
  );
}
