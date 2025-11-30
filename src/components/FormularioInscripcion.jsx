'use client';
import { useEffect, useState } from 'react';

export default function FormularioInscripcion({ circuitoId, onClose }) {
  const [circuito, setCircuito] = useState(null);
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [edad, setEdad] = useState('');
  const [dni, setDni] = useState('');
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');
  const [opcionesDia, setOpcionesDia] = useState([]);
  const [opcionesHorario, setOpcionesHorario] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const dniValido = /^\d{7,8}$/.test(dni);
  const whatsappValido = /^\d{10,}$/.test(whatsapp);

  useEffect(() => {
    async function obtenerOpciones() {
      try {
        const res = await fetch(`/api/caminatas/${circuitoId}`);
        const data = await res.json();
        if (res.ok) {
          // data.circuito debe incluir: circuito_id, NombreCircuito, opciones_dia, opciones_horario
          setCircuito(data.circuito || {});
          setOpcionesDia(data.opciones_dia || data.circuito?.opciones_dia || []);
          setOpcionesHorario(data.opciones_horario || data.circuito?.opciones_horario || []);
        } else {
          setError('No se pudieron cargar las opciones del circuito.');
        }
      } catch (err) {
        setError('Error al cargar datos del circuito.');
      }
    }

    if (circuitoId) obtenerOpciones();
  }, [circuitoId]);

  async function manejarEnvio(e) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    if (!nombre || !whatsapp || !edad || !dni || !dia || !horario) {
      setError('Todos los campos son obligatorios.');
      setEnviando(false);
      return;
    }

    if (!dniValido) {
      setError('El DNI debe tener entre 7 y 8 dígitos numéricos.');
      setEnviando(false);
      return;
    }

    if (!whatsappValido) {
      setError('El WhatsApp debe tener al menos 10 dígitos numéricos.');
      setEnviando(false);
      return;
    }

    try {
      const res = await fetch('/api/inscribirse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  circuitoId: circuito?.circuito_id,   // ✅ UUID real
  nombreCircuito: circuito?.NombreCircuito,
  nombre,
  whatsapp,
  edad,
  dni,
  dia,
  horario
})

      });

      const resultado = await res.json();
      if (!res.ok) throw new Error(resultado.error || 'Error al enviar inscripción.');
      setEnviado(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="p-4 border rounded bg-verde-suave text-verde-oscuro">
        ✅ Inscripción enviada correctamente.
        <button onClick={onClose} className="ml-4 text-sm text-verde underline">Cerrar</button>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className="space-y-4 p-4 border rounded bg-white shadow-md">
      <h3 className="text-lg font-bold text-verde">
        Inscripción a {circuito?.NombreCircuito || 'Circuito'}
      </h3>

      {/* Nombre */}
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        className="w-full border border-verde-suave px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-verde"
        required
      />

      {/* WhatsApp */}
      <input
        type="tel"
        placeholder="WhatsApp"
        value={whatsapp}
        onChange={e => setWhatsapp(e.target.value)}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
          whatsapp && !whatsappValido ? 'border-red-500 focus:ring-red-500' : 'border-verde-suave focus:ring-verde'
        }`}
        required
      />
      {whatsapp && !whatsappValido && (
        <p className="text-red-600 text-sm">El WhatsApp debe tener al menos 10 dígitos numéricos.</p>
      )}

      {/* Edad */}
      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={e => setEdad(e.target.value)}
        className="w-full border border-verde-suave px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-verde"
        required
      />

      {/* DNI */}
      <input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={e => setDni(e.target.value)}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
          dni && !dniValido ? 'border-red-500 focus:ring-red-500' : 'border-verde-suave focus:ring-verde'
        }`}
        required
        maxLength={8}
      />
      {dni && !dniValido && (
        <p className="text-red-600 text-sm">El DNI debe tener entre 7 y 8 dígitos numéricos.</p>
      )}

      {/* Día */}
      {opcionesDia.length > 0 && (
        <select
          value={dia}
          onChange={e => setDia(e.target.value)}
          className="w-full border border-verde-suave px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-verde"
          required
        >
          <option value="">Seleccioná un día</option>
          {opcionesDia.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>
      )}

      {/* Horario */}
      {opcionesHorario.length > 0 && (
        <select
          value={horario}
          onChange={e => setHorario(e.target.value)}
          className="w-full border border-verde-suave px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-verde"
          required
        >
          <option value="">Seleccioná un horario</option>
          {opcionesHorario.map((h, i) => (
            <option key={i} value={h}>{h}</option>
          ))}
        </select>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {enviando && (
        <div className="flex items-center gap-2 text-sm text-verde font-medium">
          <svg className="animate-spin h-4 w-4 text-verde" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Enviando…
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full py-2 px-4 bg-verde text-white font-semibold rounded-md hover:bg-verde-oscuro transition disabled:opacity-50"
      >
        {enviando ? 'Procesando…' : 'Enviar inscripción'}
      </button>
    </form>
  );
}
