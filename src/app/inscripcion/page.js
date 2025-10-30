import Link from 'next/link';

// Metadatos específicos para la página de inscripción
export const metadata = {
  title: 'Inscripción | Caminatas Saludables',
  description: 'Completa nuestro formulario de inscripción para unirte a nuestras caminatas terapéuticas. Nuestros coordinadores se pondrán en contacto contigo para guiarte en tu primera caminata.',
  openGraph: {
    title: 'Inscripción | Caminatas Saludables',
    description: 'Completa nuestro formulario de inscripción para unirte a nuestras caminatas terapéuticas. Nuestros coordinadores se pondrán en contacto contigo para guiarte en tu primera caminata.',
    url: 'https://buenas-caminatas.vercel.app/inscripcion',
    images: [
      {
        url: 'https://buenas-caminatas.vercel.app/images/inscripcion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Formulario de inscripción a caminatas saludables',
      },
    ],
  },
  alternates: {
    canonical: 'https://buenas-caminatas.vercel.app/inscripcion',
  },
};

export default function InscripcionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Botón de Volver */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Título y Descripción */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">¡Inscríbete a una Caminata Saludable!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Completa el formulario y uno de nuestros coordinadores se pondrá en contacto contigo para guiarte en tu primera caminata.
          </p>
        </div>

        {/* Contenedor del Formulario de Tally */}
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
          <div className="relative pb-[120%] h-0 overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://tally.so/embed/3lpkNv?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Formulario de Inscripción a Caminatas Saludables"
              loading="lazy"
            ></iframe>
          </div>
          <p className="mt-6 text-sm text-gray-500 text-center">
            * Tus datos están seguros y solo serán usados para contactarte sobre las caminatas.
          </p>
        </div>
      </div>
    </div>
  );
}