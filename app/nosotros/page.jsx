//src\app\nosotros\page.jsx
'use client';
import { useEffect, useState } from 'react';
// import NotionBlockRenderer from '@/components/NotionBlockRenderer';

export default function NosotrosPage() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch('/api/notion-nosotros')
      .then(res => res.json())
      .then(data => setBlocks(data.blocks));
  }, []);

  return (
    <main className="min-h-screen bg-fondo text-texto font-sans px-6 py-12 space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-verde-oscuro">Nosotros</h1>
        <p className="text-lg text-texto-secundario max-w-xl mx-auto">
          Nuestra misión, visión y valores institucionales.
        </p>
      </section>

      {blocks && blocks.length > 0 ? (
        <pre className="whitespace-pre-wrap max-w-3xl mx-auto">{JSON.stringify(blocks, null, 2)}</pre>
      ) : null}
    </main>
  );
}
