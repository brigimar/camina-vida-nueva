import CaminatasCliente from '@/components/CaminatasCliente';

export default function CaminatasPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="py-20 px-6 max-w-screen-xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#0F172A] mb-4">
          🌿 Caminatas Camina Vida
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Explora los circuitos disponibles cerca de vos y elige tu próxima aventura al aire libre.
          Filtra por localidad, días o horarios para encontrar la caminata ideal.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <CaminatasCliente />
        </div>
      </section>
    </main>
  );
}
