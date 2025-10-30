'use client';


// Función auxiliar para generar una etiqueta con color basado en el texto
function Badge({ children }) {
  if (!children) return null;

  const text = String(children).trim();
  if (text === '') return null;

  const getBgColor = (str) => {
    if (['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].includes(str)) return 'bg-blue-100 text-blue-800';
    if (['Sábado', 'Domingo'].includes(str)) return 'bg-purple-100 text-purple-800';
    if (str.includes('AM')) return 'bg-green-100 text-green-800';
    if (str.includes('PM')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800'; // Color por defecto
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBgColor(text)} mr-1 mb-1`}>
      {children}
    </span>
  );
}

export default function CircuitoCard({ circuito }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {/* Título de la Localidad con Badge "Nuevo" */}
      <div className="flex items-center mb-2">
        <h3 className="text-2xl font-bold text-green-600">{circuito.localidad}</h3>
        {circuito.estado === 'Nuevo' && (
          <span className="ml-3 bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            NUEVO
          </span>
        )}
      </div>
      
      {/* Nombre del Circuito con ícono de ubicación */}
      <p className="text-lg mb-4 flex items-center">
        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <strong>{circuito.nombreCircuito}</strong>
      </p>

      {/* Etiquetas para Días */}
      <div className="mb-3">
        <span className="font-semibold text-sm text-gray-700 mr-2">📅 Días:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {Array.isArray(circuito.dias?.split(', ')) && 
            circuito.dias.split(', ').map((dia) => dia && String(dia).trim() !== '' && (
              <Badge key={dia}>{dia}</Badge>
            ))
          }
        </div>
      </div>

      {/* Etiquetas para Horarios - Números en negrita */}
      <div>
        <span className="font-semibold text-sm text-gray-700 mr-2">⏰ Horarios:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {Array.isArray(circuito.horarios?.split(', ')) && 
            circuito.horarios.split(', ').map((hora) => hora && String(hora).trim() !== '' && (
              <Badge key={hora}>
                <strong>{hora}</strong>
              </Badge>
            ))
          }
        </div>
      </div>
    </div>
  );
}