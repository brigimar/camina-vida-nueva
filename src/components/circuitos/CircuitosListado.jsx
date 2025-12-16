'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CircuitoCard from "./CircuitoCard";
import MapaGeneralCircuitos from "./MapaGeneralCircuitos";

export default function CircuitosListado({ circuitos }) {
  const [busqueda, setBusqueda] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [dia, setDia] = useState("");
  const [horario, setHorario] = useState("");
  const [distancia, setDistancia] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");

  // ✅ Normalización robusta (por si vienen campos con mayúsculas)
  const normalize = (value) =>
    typeof value === "string" ? value.trim() : value;

  const safeLocalidad = (c) => normalize(c.localidad || c.Localidad);
  const safeNombre = (c) => normalize(c.nombre || c.NombreCircuito);
  const safeDescripcion = (c) => normalize(c.descripcion || c.Descripcion);
  const safeDias = (c) => c.dias || c.Dias || [];
  const safeHorarios = (c) => c.horarios || c.Horarios || [];
  const safeDistancia = (c) => c.distancia || c.Distancia || 0;
  const safeEstado = (c) => c.estado ?? true;

  // ✅ Localidades únicas
  const localidades = [
    ...new Set(circuitos.map((c) => safeLocalidad(c)).filter(Boolean)),
  ];

  // ✅ Días únicos
  const dias = [
    ...new Set(circuitos.flatMap((c) => safeDias(c) || [])),
  ];

  // ✅ Horarios únicos
  const horarios = [
    ...new Set(circuitos.flatMap((c) => safeHorarios(c) || [])),
  ];

  // ✅ Filtro avanzado
  const filtrados = useMemo(() => {
    return circuitos.filter((c) => {
      const nombre = safeNombre(c)?.toLowerCase() || "";
      const descripcion = safeDescripcion(c)?.toLowerCase() || "";
      const loc = safeLocalidad(c)?.toLowerCase() || "";
      const diasC = safeDias(c);
      const horariosC = safeHorarios(c);
      const dist = safeDistancia(c);
      const activo = safeEstado(c);

      const coincideBusqueda =
        busqueda === "" ||
        nombre.includes(busqueda.toLowerCase()) ||
        descripcion.includes(busqueda.toLowerCase()) ||
        loc.includes(busqueda.toLowerCase());

      const coincideLocalidad =
        localidad === "" || safeLocalidad(c) === localidad;

      const coincideDia =
        dia === "" || (Array.isArray(diasC) && diasC.includes(dia));

      const coincideHorario =
        horario === "" ||
        (Array.isArray(horariosC) && horariosC.includes(horario));

      const coincideDistancia =
        distancia === "" ||
        (distancia === "<3" && dist < 3000) ||
        (distancia === "3-5" && dist >= 3000 && dist <= 5000) ||
        (distancia === ">5" && dist > 5000);

      const coincideDisponibilidad =
        disponibilidad === "" ||
        (disponibilidad === "disponible" && activo) ||
        (disponibilidad === "inactivo" && !activo);

      return (
        coincideBusqueda &&
        coincideLocalidad &&
        coincideDia &&
        coincideHorario &&
        coincideDistancia &&
        coincideDisponibilidad
      );
    });
  }, [busqueda, localidad, dia, horario, distancia, disponibilidad, circuitos]);

  return (
    <section>
      {/* TÍTULO */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold text-center text-[#0F172A] mb-10"
      >
        🧭 Todos los Circuitos
      </motion.h1>

      {/* ✅ MAPA GENERAL */}
      <MapaGeneralCircuitos circuitos={circuitos} />

      {/* FILTROS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded-lg px-3 py-2"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
        >
          <option value="">Localidad</option>
          {localidades.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        >
          <option value="">Día</option>
          {dias.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        >
          <option value="">Horario</option>
          {horarios.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={distancia}
          onChange={(e) => setDistancia(e.target.value)}
        >
          <option value="">Distancia</option>
          <option value="<3">Menos de 3 km</option>
          <option value="3-5">3 a 5 km</option>
          <option value=">5">Más de 5 km</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={disponibilidad}
          onChange={(e) => setDisponibilidad(e.target.value)}
        >
          <option value="">Disponibilidad</option>
          <option value="disponible">Disponible</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtrados.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CircuitoCard circuito={c} mostrarBotonReserva />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* SIN RESULTADOS */}
      {filtrados.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No se encontraron circuitos con los filtros seleccionados.
        </p>
      )}
    </section>
  );
}
