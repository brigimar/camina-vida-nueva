'use client';

import { useState } from 'react';

export default function PropuestaCircuito() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="text-center">
      {/* Botón Principal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
      >
        ¿Querés que lleguemos a tu barrio? Proponé un circuito
      </button>

      {/* Modal con el Formulario de Notion */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-96 mx-4 relative overflow-hidden">
            {/* Botón de Cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-900"
            >
              ✕
            </button>

            {/* iframe del Formulario de Notion */}
            <iframe
              src="https://somos-rapha.notion.site/ebd/2736754dbb0a802aafe3fddd0d55779b" // 👈 PEGA TU ENLACE DE NOTION AQUÍ
              className="w-full h-full border-0"
              title="Formulario de Propuesta de Circuito"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}