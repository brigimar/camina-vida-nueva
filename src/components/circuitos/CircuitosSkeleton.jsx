import CircuitoSkeleton from "./CircuitoSkeleton";

// ✅ Grid de skeletons para usar como fallback en Suspense
export default function CircuitosSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
      {Array.from({ length: 4 }).map((_, i) => (
        <CircuitoSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}
