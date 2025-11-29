/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
  images: {
    // Permite cargar imágenes externas desde YouTube
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com", // opcional, por si usás este dominio también
      },
    ],
  },
};

export default nextConfig;
