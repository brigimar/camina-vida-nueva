/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- COLORES OLLAAPP / CAMINA VIDA ---
        brand: {
          coral: "#FF5C35", // El naranja vibrante
          crema: "#FFFBF7", // El fondo orgánico
          "coral-dark": "#e44d2a",
        },
        // --- TUS COLORES ACTUALES (Mantenidos) ---
        verde: "#2E8B57",
        "verde-oscuro": "#1E5631",
        "verde-suave": "#C8E6C9",
        "verde-secundario": "#4CAF50",
        "verde-azulado": "#009688",
        fondo: "#e8f3edff",
        "fondo-claro": "#fdfcf9",
        "texto-claro": "#f5f5f5",
        "texto-oscuro": "#1b4332",
        dorado: "#F9A826",
        muted: "#52796f",
        card: "#ffffff",
      },
      fontFamily: {
        // Agregamos Serif para los títulos elegantes
        serif: ["var(--font-playfair)", "serif"],
        sans: ["Poppins", "sans-serif"], // Mantenemos Poppins como tu base
      },
      borderRadius: {
        // Opcional: podés crear un radio personalizado para no escribir [3rem] siempre
        "4xl": "2rem",
        "5xl": "3rem",
      },
    },
  },
  plugins: [],
};
