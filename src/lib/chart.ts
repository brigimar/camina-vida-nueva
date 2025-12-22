// src/lib/chart.ts

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar todos los componentes que pueden usarse en tus gráficos
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

// No exporta nada en particular, simplemente asegura que al importar este archivo
// las escalas y elementos queden registrados globalmente.
