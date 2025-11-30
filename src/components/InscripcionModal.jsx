'use client';
import { useEffect, useState, useRef } from 'react';
import FormularioInscripcion from './FormularioInscripcion';

export default function InscripcionModal({ circuitoId, nombreCircuito, onClose }) {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef(null);

  // Animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Cierre con tecla Escape y foco inicial al diálogo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Enfocar el contenedor del modal para mejorar accesibilidad
    if (dialogRef.current) {
      dialogRef.current.focus();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Cierre al hacer clic fuera del modal
  const handleBackdropClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Evitar que el clic dentro del contenido cierre el modal
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
      aria-hidden="false"
      aria-label="Inscripción"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`bg-white rounded-lg shadow-lg w-full max-w-md relative transform transition-all duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={stopPropagation}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h4 className="text-sm font-semibold text-gray-800">
            {nombreCircuito ? `Inscripción a ${nombreCircuito}` : 'Inscripción'}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-lg font-bold leading-none"
            aria-label="Cerrar"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <FormularioInscripcion
            circuitoId={circuitoId}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
