// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default [
  // ─────────────────────────────────────────────
  // 🚫 IGNORE GLOBAL
  // ─────────────────────────────────────────────
  {
    ignores: [
      ".eslintrc.*",
      "eslint.config.*",
      "next-env.d.ts",
      "postcss.config.*",
      "tailwind.config.*",
      "middleware.ts",
      "scripts/**",
      "supabase/functions/**",
      "src/supabase/functions/**",
      ".next/**",
      "node_modules/**",
      "**/*.new.ts",
      "**/*.new.tsx",
      "informes/**",
    ],
  },

  // ─────────────────────────────────────────────
  // 🟦 JS base
  // ─────────────────────────────────────────────
  js.configs.recommended,

  // ─────────────────────────────────────────────
  // 🟨 TS base — reglas suaves (sin errores estrictos)
  // ─────────────────────────────────────────────
  ...tseslint.configs.recommended,

  // ─────────────────────────────────────────────
  // 🧯 DASHBOARD — sin type-checking (legacy)
  // ─────────────────────────────────────────────
  {
    files: ["app/dashboard/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      // ⚠️ SIN parserOptions.project → linting rápido, sin errores de TS
    },
    rules: {
      // Opcional: desactivar reglas estrictas si hay mucha deuda
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },

  // ─────────────────────────────────────────────
  // ✅ APP + SRC — con type-checking EXCEPTO excepciones
  // ─────────────────────────────────────────────
  {
    // 👇 Excluimos explícitamente las carpetas que NO queremos con type-checking
    files: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
    ignores: [
      "app/dashboard/**", // 👈 excluimos dashboard
      "src/lib/supabase/**", // 👈 excluimos supabase de este bloque
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      next: nextPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "@supabase/supabase-js", message: "Use '@/lib/supabase'." },
            { name: "@supabase/ssr", message: "Use '@/lib/supabase'." },
            { name: "@/lib/supabaseServer", message: "Use '@/lib/supabase'." },
            { name: "@/lib/supabaseClient", message: "Use '@/lib/supabase'." },
            {
              name: "@/ lib/supabaseBrowser",
              message: "Use '@/lib/supabase'.",
            },
            { name: "@/lib/supabaseAdmin", message: "Use '@/lib/supabase'." },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────
  // 🔓 SUPABASE — permite imports directos (único lugar válido)
  // ─────────────────────────────────────────────
  {
    files: ["src/lib/supabase/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // opcional, pero recomendado
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-restricted-imports": "off", // 👈 permitido aquí
    },
  },
];
