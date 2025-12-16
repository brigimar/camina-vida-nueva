'use client';
import { useEffect, useState } from 'react';
// NotionBlockRenderer component removed; render blocks raw as fallback

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
      {blocks && blocks.length > 0 ? (
        <pre className="whitespace-pre-wrap max-w-3xl mx-auto">{JSON.stringify(blocks, null, 2)}</pre>
      ) : null}
    </main>
  );
}
