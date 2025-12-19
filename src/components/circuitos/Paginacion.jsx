"use client";

import Link from "next/link";
import { memo } from "react";

// ✅ Componente de paginación memoizado
const Paginacion = memo(function Paginacion({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-12 py-8">
      {/* Botón Anterior */}
      <Link
        href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
        className={`px-6 py-2 rounded-lg font-semibold transition ${
          isPreviousDisabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-verde text-white hover:bg-verde-oscuro"
        }`}
        onClick={(e) => isPreviousDisabled && e.preventDefault()}
      >
        ← Anterior
      </Link>

      {/* Información de página */}
      <div className="text-center text-gray-600 font-medium min-w-max">
        Página {currentPage} de {totalPages}
      </div>

      {/* Botón Siguiente */}
      <Link
        href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
        className={`px-6 py-2 rounded-lg font-semibold transition ${
          isNextDisabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-verde text-white hover:bg-verde-oscuro"
        }`}
        onClick={(e) => isNextDisabled && e.preventDefault()}
      >
        Siguiente →
      </Link>
    </div>
  );
});

Paginacion.displayName = "Paginacion";

export default Paginacion;
