export const dynamic = 'force-dynamic';

export default async function ReservaPage({ params }) {
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/inscripciones/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-10 text-center text-red-600">
        No se encontró la inscripción.
      </div>
    );
  }

  const inscripcion = await res.json();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-4">
        ✅ Inscripción confirmada
      </h1>

      <p className="text-gray-700 mb-6 text-center max-w-lg">
        Gracias por inscribirte en <strong>{inscripcion.circuito_nombre}</strong>.
        Te esperamos en la próxima caminata.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow max-w-md w-full mb-8">
        <p><strong>Nombre:</strong> {inscripcion.nombre} {inscripcion.apellido}</p>
        <p><strong>Email:</strong> {inscripcion.email}</p>
        <p><strong>Teléfono:</strong> {inscripcion.telefono}</p>
        <p><strong>Circuito:</strong> {inscripcion.circuito_nombre}</p>
        <p><strong>Localidad:</strong> {inscripcion.localidad}</p>
        <p><strong>Días:</strong> {inscripcion.dias?.join(", ")}</p>
        <p><strong>Horarios:</strong> {inscripcion.horarios?.join(", ")}</p>
      </div>

      <a
        href="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Volver al inicio
      </a>
    </main>
  );
}
