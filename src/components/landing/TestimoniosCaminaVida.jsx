export default function TestimoniosCaminaVida() {
  const testimonios = [
    { texto: "Me ayudó a reconectar con mi cuerpo y sentirme mejor cada día.", autor: "Luis G." },
    { texto: "Las caminatas me dieron claridad y foco en mi día a día.", autor: "Martín R." },
    { texto: "Disfruté el grupo, cada paso y todo lo que aprendí en el proceso.", autor: "Sofía M." },
  ];

  return (
    <section className="px-6 py-16 bg-emerald-50">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Lo que nos dicen quienes ya caminan con nosotros
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonios.map((t, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <p className="text-gray-700 italic">"{t.texto}"</p>
            <p className="text-emerald-700 font-semibold mt-4">— {t.autor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
