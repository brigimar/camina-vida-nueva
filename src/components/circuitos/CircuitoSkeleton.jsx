// ✅ Skeleton animado para una tarjeta de circuito
export default function CircuitoSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl animate-pulse">
      {/* Imagen skeleton */}
      <div className="h-60 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Cuerpo skeleton */}
      <div className="p-5 space-y-3">
        {/* Título */}
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg w-3/4"></div>

        {/* Localidad */}
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg w-1/2"></div>

        {/* Descripción */}
        <div className="space-y-2 mt-3">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg w-5/6"></div>
        </div>

        {/* Métricas */}
        <div className="flex justify-around border-t border-gray-200 mt-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <div className="h-6 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg mx-auto"></div>
              <div className="h-3 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="px-5 py-4 bg-slate-50 border-t border-gray-200">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
