/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ¡ADVERTENCIA! Esto permite que el build de producción se complete incluso si hay errores de ESLint.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.notion.so',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;