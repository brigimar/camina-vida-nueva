export default function HeroCaminaVida() {
  return (
    <section className="text-center px-6 pt-16 pb-10 bg-gradient-to-b from-emerald-50 to-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 leading-tight">
        Camina Vida
      </h1>

      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
        Sembrá pasos y cosechá vida
      </p>

      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
        Una experiencia terapéutica que integra movimiento, estiramiento, respiración y meditación.
      </p>

      <div className="mt-8">
        <a
          href="#planes"
          className="inline-block px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow hover:bg-emerald-700 transition"
        >
          Conocé nuestros planes
        </a>
      </div>
    </section>
  );
}
