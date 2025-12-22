export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CircuitosContent from "@/components/circuitos/CircuitosContent";
import CircuitosSkeleton from "@/components/circuitos/CircuitosSkeleton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface CircuitosPageProps {
  searchParams: SearchParams;
}

// ✅ Página con streaming, Suspense y paginación SSR
export default async function CircuitosPage({
  searchParams,
}: CircuitosPageProps) {
  const params = await searchParams;
  // ✅ Leer page del query param
  const page = Math.max(1, Number(params?.page ?? 1));
  const limit = 20;

  return (
    <main className="min-h-screen bg-white py-16 px-6 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Nuestros Circuitos
      </h1>

      {/* ✅ Suspense boundary con fallback skeleton */}
      <Suspense fallback={<CircuitosSkeleton />}>
        <CircuitosContent page={page} limit={limit} />
      </Suspense>
    </main>
  );
}
