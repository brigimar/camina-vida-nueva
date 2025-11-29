export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 text-center">
      <p className="text-gray-400">
        Organizado con ❤️ por el equipo de Camina Vida — Buenos Aires, 2025
      </p>
      <p className="text-gray-500 text-sm mt-1">
        sendabuena@gmail.com
      </p>
      <p className="text-gray-600 text-xs mt-2">
        © {new Date().getFullYear()} Camina Vida. Todos los derechos reservados.
      </p>
    </footer>
  );
}
