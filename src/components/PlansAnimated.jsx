'use client';

export default function PlansAnimated() {
  return (
    <section id="planes" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-verde-oscuro mb-4">
          🧭 Planes Camina Vida
        </h2>
        <p className="text-center text-texto mb-10 text-base">
          Elegí el ritmo que mejor se adapte a tu bienestar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-white border border-gray-200">
            <h3 className="text-xl font-semibold text-verde">Inicio</h3>
            <p className="text-sm text-texto mt-2">
              <span className="text-dorado font-bold text-lg">1</span> caminata semanal
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-white border-2 border-verde-secundario">
            <h3 className="text-xl font-semibold text-verde">Constancia</h3>
            <p className="text-sm text-texto mt-2">
              <span className="text-verde-azulado font-bold text-lg">3</span> caminatas semanales
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-white border border-gray-200">
            <h3 className="text-xl font-semibold text-verde">Transformación</h3>
            <p className="text-sm text-texto mt-2">
              <span className="text-verde-oscuro font-bold text-lg">5</span> caminatas semanales
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://wa.me/5491150511147?text=Hola%20!%20Quiero%20consultar%20valor%20y%20disponibilidad%20de%20los%20planes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-sm font-semibold rounded bg-gradient-to-r from-verde-oscuro to-verde text-white hover:brightness-110 transition"
          >
            Consultar valor y disponibilidad
          </a>
        </div>
      </div>
    </section>
  );
}
