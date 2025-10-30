import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo Caminatas" width={48} height={48} />
          <h1 className="text-xl font-bold text-gray-800">
            Caminatas Saludables: Tu medicina camina
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Movilidad con sentido: mejorá tu salud física y emocional
        </p>
      </div>
    </header>
  );
}