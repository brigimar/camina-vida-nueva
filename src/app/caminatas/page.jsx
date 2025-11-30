import { getCircuitosVista } from '@/lib/circuitosVista';
import CaminatasCliente from '@/components/CaminatasCliente';

export default async function CaminatasPage() {
  let circuitos = [];

  try {
    const data = await getCircuitosVista();
    // Asegurarse de que data sea un array
    circuitos = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error cargando circuitos:', error);
    circuitos = [];
  }

  return <CaminatasCliente circuitos={circuitos} />;
}

