/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // opcional si usás /src
  ],
  theme: {
    extend: {
      colors: {
        verde: '#2E8B57',
        'verde-oscuro': '#1E5631',
        'verde-suave': '#C8E6C9',
        'verde-secundario': '#4CAF50',
        'verde-azulado': '#009688',
        fondo: '#e8f3edff',
        'fondo-claro': '#fdfcf9',
        'texto-claro': '#f5f5f5',
        'texto-oscuro': '#1b4332',
        dorado: '#F9A826',
        muted: '#52796f',
        card: '#ffffff',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
