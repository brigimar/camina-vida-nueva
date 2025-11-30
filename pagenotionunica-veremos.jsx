'use client';
import { useEffect, useState } from 'react';
import NotionBlockRenderer from '@/components/NotionBlockRenderer';

export default function NotionPage({ params }) {
  const { pageId } = params;
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch(`/api/notion/${pageId}`)
      .then(res => res.json())
      .then(data => setBlocks(data.blocks || []))
      .catch(err => console.error("Error cargando Notion:", err));
  }, [pageId]);

  return (
    <main className="min-h-screen bg-fondo text-texto font-sans px-6 py-12 space-y-10">
      <NotionBlockRenderer blocks={blocks} />
    </main>
  );
}
