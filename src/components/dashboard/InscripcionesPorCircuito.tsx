import "@/lib/chart";
import { Bar } from "react-chartjs-2";
import { useInscriptos } from "@/hooks/useInscriptos";
import { Database } from "@/types/supabase";

type InscripcionRow = Database["public"]["Tables"]["inscripciones"]["Row"];

export default function InscripcionesPorCircuito() {
  const { data: inscripcionesData = [], loading } = useInscriptos();

  if (loading) return <p>Cargando inscripciones...</p>;

  const conteo: Record<string, number> = {};
  inscripcionesData.forEach((i: InscripcionRow) => {
    const nombre = i.sesiones?.circuitos?.nombre || "Desconocido";
    conteo[nombre] = (conteo[nombre] || 0) + 1;
  });

  if (Object.keys(conteo).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Inscripciones por circuito</h2>
        <p className="text-gray-500 text-sm">
          No hay inscripciones registradas.
        </p>
      </div>
    );
  }

  const data = {
    labels: Object.keys(conteo),
    datasets: [
      {
        label: "Inscripciones",
        data: Object.values(conteo),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Inscripciones por circuito</h2>
      <Bar data={data} />
    </div>
  );
}
