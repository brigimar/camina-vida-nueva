'use client';

export default function InscripcionForm() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Formulario de Inscripción</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Completa el formulario y uno de nuestros coordinadores se pondrá en contacto contigo.
      </p>

      {/* Contenedor del iframe de Tally */}
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
  );
}