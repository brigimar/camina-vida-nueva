'use client';

import Image from 'next/image';

export default function TestimonioCard({ testimonio }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start mb-4">
        {testimonio.foto ? (
          <Image
            src={testimonio.foto}
            alt={testimonio.nombre}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex-shrink-0"></div>
        )}
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{testimonio.nombre}</h3>
          <div className="flex text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < testimonio.calificacion ? 'text-yellow-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="italic text-gray-700 text-lg">{`"${testimonio.testimonio}"`}</p>
    </div>
  );
}