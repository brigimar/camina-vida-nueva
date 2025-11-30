export default function NotionBlockRenderer({ blocks }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-gray-500 italic text-center py-12">
          No hay contenido disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-8 font-sans text-gray-800">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading_1':
            return (
              <h1
                key={block.id}
                className="text-4xl font-bold text-gray-900 leading-tight mt-12 mb-6 pb-4 border-b border-gray-100"
              >
                {block.heading_1.rich_text.map((t) => t.plain_text).join('')}
              </h1>
            );

          case 'heading_2':
            return (
              <h2
                key={block.id}
                className="text-2xl font-semibold text-gray-800 leading-snug mt-10 mb-4"
              >
                {block.heading_2.rich_text.map((t) => t.plain_text).join('')}
              </h2>
            );

          case 'heading_3':
            return (
              <h3
                key={block.id}
                className="text-xl font-medium text-gray-700 leading-relaxed mt-8 mb-3"
              >
                {block.heading_3.rich_text.map((t) => t.plain_text).join('')}
              </h3>
            );

          case 'paragraph':
            const paragraphText = block.paragraph.rich_text.map((t) => t.plain_text).join('');
            if (!paragraphText.trim()) {
              return <div key={block.id} className="h-4" />;
            }
            return (
              <p 
                key={block.id} 
                className="text-base leading-relaxed text-gray-700 mb-4 text-justify"
              >
                {paragraphText}
              </p>
            );

          case 'bulleted_list_item':
            return (
              <ul key={block.id} className="list-disc ml-6 mb-3 space-y-2">
                <li className="text-gray-700 leading-relaxed pl-2">
                  {block.bulleted_list_item.rich_text.map((t) => t.plain_text).join('')}
                </li>
              </ul>
            );

          case 'numbered_list_item':
            return (
              <ol key={block.id} className="list-decimal ml-6 mb-3 space-y-2">
                <li className="text-gray-700 leading-relaxed pl-2">
                  {block.numbered_list_item.rich_text.map((t) => t.plain_text).join('')}
                </li>
              </ol>
            );

          case 'divider':
            return (
              <hr 
                key={block.id} 
                className="my-12 border-t border-gray-200 w-3/4 mx-auto" 
              />
            );

          case 'image':
            return (
              <ResponsiveImageBlock key={block.id} block={block} />
            );

          case 'callout':
            return (
              <div
                key={block.id}
                className="my-6 p-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <span className="text-blue-500 mr-3 text-lg">💡</span>
                  <div className="text-gray-700 leading-relaxed">
                    {block.callout.rich_text.map((t) => t.plain_text).join('')}
                  </div>
                </div>
              </div>
            );

          case 'quote':
            return (
              <blockquote
                key={block.id}
                className="my-6 pl-6 border-l-4 border-gray-300 italic text-gray-600 bg-gray-50 py-4 rounded-r-lg"
              >
                {block.quote.rich_text.map((t) => t.plain_text).join('')}
              </blockquote>
            );

          case 'code':
            return (
              <pre
                key={block.id}
                className="my-6 p-6 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed shadow-lg"
              >
                <code>{block.code.rich_text.map((t) => t.plain_text).join('')}</code>
              </pre>
            );

          case 'toggle':
            return (
              <details
                key={block.id}
                className="my-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <summary className="cursor-pointer font-medium text-gray-800 hover:text-gray-900 transition-colors">
                  {block.toggle.rich_text.map((t) => t.plain_text).join('')}
                </summary>
                {block.has_children && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-300">
                    <NotionBlockRenderer blocks={block.children || []} />
                  </div>
                )}
              </details>
            );

          case 'table':
            return (
              <div key={block.id} className="my-8 overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                  <tbody>
                    {block.table?.children?.map((row, rowIndex) => (
                      <tr key={row.id} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        {row.table_row?.cells?.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-200 px-4 py-3 text-sm text-gray-700"
                          >
                            {cell.map((t) => t.plain_text).join('')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'column_list':
            return (
              <div key={block.id} className="my-8">
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  {block.column_list?.children?.map((columnBlock) => (
                    <NotionBlockRenderer 
                      key={columnBlock.id} 
                      blocks={[columnBlock]} 
                    />
                  ))}
                </div>
              </div>
            );

          case 'column':
            return (
              <div key={block.id} className="flex-1 min-w-0">
                <div className="space-y-4">
                  {block.column?.children?.map((childBlock) => (
                    <NotionBlockRenderer 
                      key={childBlock.id} 
                      blocks={[childBlock]} 
                    />
                  ))}
                </div>
              </div>
            );

          default:
            console.log('Bloque no soportado:', block.type);
            return (
              <div 
                key={block.id} 
                className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <p className="text-yellow-700 text-sm">
                  Bloque de tipo <strong>{block.type}</strong> no soportado.
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}

// Componente separado para imágenes responsive
// Componente separado para imágenes responsive
function ResponsiveImageBlock({ block }) {
  const imageUrl = block.image.file?.url || block.image.external?.url;
  const caption = block.image.caption?.map((t) => t.plain_text).join('');

  return (
    <figure key={block.id} className="my-8 text-center">
      <div className="flex justify-center">
        <div className="
          /* Tamaños fijos por dispositivo */
          w-full 
          max-w-[280px]     /* Mobile: 280px */
          sm:max-w-[400px]  /* Tablet pequeña: 400px */
          md:max-w-[500px]  /* Tablet: 500px */
          lg:max-w-[600px]  /* Desktop: 600px */
          xl:max-w-[700px]  /* Desktop grande: 700px */
          2xl:max-w-[800px] /* Desktop extra grande: 800px */
          
          /* Estilos del contenedor */
          bg-gray-50 rounded-xl p-3
          shadow-md hover:shadow-lg transition-shadow duration-300
          mx-auto /* Centrar siempre */
        ">
          <img
            src={imageUrl}
            alt="Imagen de Notion"
            className="
              rounded-lg 
              w-full        /* Ocupar todo el ancho del contenedor */
              h-auto        /* Mantener proporción */
              object-cover  /* Cubrir el contenedor sin distorsionar */
              
              /* Alturas máximas por dispositivo */
              max-h-[200px]     /* Mobile */
              sm:max-h-[280px]  /* Tablet pequeña */
              md:max-h-[350px]  /* Tablet */
              lg:max-h-[400px]  /* Desktop */
              xl:max-h-[450px]  /* Desktop grande */
              2xl:max-h-[500px] /* Desktop extra grande */
            "
            loading="lazy"
            // Atributos para forzar el tamaño
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
      </div>
      
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-4 italic max-w-2xl mx-auto leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}