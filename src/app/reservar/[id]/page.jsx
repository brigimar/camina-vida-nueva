'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReservarCircuito({ params }) {
  const { id } = params;
  const router = useRouter();

  const [circuito, setCircuito] = useState(null);
  const [opcionesDia, setOpcionesDia] = useState([]);
  const [opcionesHorario, setOpcionesHorario] = useState([]);

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [dni, setDni] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/caminatas/${id}`) // ✅ corregido
      .then(res => res.json())
      .then(data => {
        setCircuito(data.circuito);
        setOpcionesDia(data.opciones_dia || []);
        setOpcionesHorario(data.opciones_horario || []);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        circuitoId: id,
        nombre,
        edad,
        dni,
        whatsapp,
        dia,
        horario,
      }),
    });

    const result = await res.json();
    setLoading(false);

    if (result.ok) {
      router.push(`/confirmacion?circuito=${id}`);
    } else {
      alert(result.error || 'Error al reservar');
    }
  };

  if (!circuito) return <p className="text-center py-12">Cargando circuito...</p>;

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Reservar caminata</h1>
      <div className="mb-6">
        <p className="text-lg font-semibold">{circuito.NombreCircuito}</p>
        <p className="text-sm text-gray-600">{circuito.Localidad}</p>
        <p className="text-sm text-gray-500">Cupo restante: {circuito.cupo_restante}</p>
      </div>

      {circuito.cupo_restante > 0 ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            className="input"
          />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={e => setEdad(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={e => setDni(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
            className="input"
          />
          <select
            value={dia}
            onChange={e => setDia(e.target.value)}
            required
            className="input"
          >
            <option value="">Selecciona día</option>
            {opcionesDia.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={horario}
            onChange={e => setHorario(e.target.value)}
            required
            className="input"
          >
            <option value="">Selecciona horario</option>
            {opcionesHorario.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Reservando...' : 'Confirmar reserva'}
          </button>
        </form>
      ) : (
        <p className="text-red-500 font-medium">Este circuito ya no tiene cupos disponibles.</p>
      )}
    </div>
  );
}
