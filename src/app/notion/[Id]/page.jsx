import NotionBlockRenderer from '@/components/NotionBlockRenderer';
import { notFound } from 'next/navigation';

async function getBlocks(pageId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/${pageId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error al cargar los bloques de Notion');
    }

    const data = await res.json();
    return data.blocks || [];
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return [];
  }
}

export default async function NotionPage({ params }) {
  const { Id } = await params;
  
  // Validar que Id no sea undefined
  if (!Id || Id === 'undefined') {
    notFound();
  }

  const blocks = await getBlocks(Id);

  if (!blocks || blocks.length === 0) {
    return (
      <main className="min-h-screen bg-fondo text-texto font-sans px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">No se encontraron bloques</h1>
          <p>La página de Notion no existe o no tiene contenido.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-fondo text-texto font-sans px-6 py-12 space-y-10">
      <NotionBlockRenderer blocks={blocks} />
    </main>
  );
}