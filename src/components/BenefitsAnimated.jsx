'use client';
import { HeartHandshake, Users, Brain, Bone } from 'lucide-react';

export default function BenefitsAnimated() {
  const beneficios = [
    {
      icon: <Bone className="w-6 h-6" />,
      titulo: 'Menos dolor articular',
      descripcion: '60% de reducción en 3 meses con caminatas guiadas y estiramientos.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      titulo: 'Circulación y corazón',
      descripcion: 'Mejora tu presión arterial y oxigenación con ritmo controlado.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      titulo: 'Baja de ansiedad',
      descripcion: 'Respiración consciente + meditación en movimiento = mente serena.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      titulo: 'Comunidad y acompañamiento',
      descripcion: 'Caminá con otros y con un coordinador terapéutico que te guía.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-verde-oscuro mb-4">
          Beneficios reales, respaldados por la experiencia
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Más que una caminata: una experiencia terapéutica integral para tu cuerpo, mente y emociones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="bg-verde-claro/5 p-6 rounded-xl border border-verde-suave hover:shadow-lg transition group"
            >
              <div className="w-12 h-12 rounded-full bg-verde-claro/20 flex items-center justify-center text-verde mb-4 mx-auto group-hover:bg-verde-claro/30 transition">
                {b.icon}
              </div>
              <h3 className="font-semibold text-verde-oscuro mb-2">{b.titulo}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{b.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}