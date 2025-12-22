import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SelectorFecha({
  fechaSeleccionada,
  setFechaSeleccionada,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filtrar por fecha
      </label>
      <DatePicker
        selected={fechaSeleccionada}
        onChange={(date) => setFechaSeleccionada(date)}
        dateFormat="dd/MM/yyyy"
        className="border p-2 rounded"
      />
    </div>
  );
}
