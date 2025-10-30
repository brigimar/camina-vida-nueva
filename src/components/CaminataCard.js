'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CaminataCard({ caminata }) {
  const formattedDate = caminata.fecha ? new Date(caminata.fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Fecha por confirmar';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {caminata.imagen && (
        <Image
          src={caminata.imagen}
          alt={caminata.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{caminata.title}</h3>
        <p className="text-sm text-gray-600 mb-2">📍 {caminata.ubicacion}</p>
        <p className="text-sm text-gray-600 mb-4">📅 {formattedDate}</p>
        <p className="text-gray-700 leading-relaxed mb-4">{caminata.descripcion}</p>
        
        {/* Contenedor de Botones */}
<div className="flex flex-col sm:flex-row gap-3">
  {/* Botón de Inscripción (enlaza a /inscripcion) */}
  <Link
    href="/inscripcion"
    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 flex items-center justify-center"
  >
    📝 ¡Inscríbete Ahora!
  </Link>

  {/* Botón de WhatsApp */}
  <a
    href="https://wa.me/5491157577039" // 👈 ¡REEMPLAZA ESTO CON TU NÚMERO DE WHATSAPP!
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 flex items-center justify-center"
  >
    💬 WhatsApp
  </a>
</div>
      </div>
    </div>
  );
}