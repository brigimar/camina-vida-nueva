module.exports = {
  extends: ["next", "next/core-web-vitals", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@supabase/supabase-js",
            message: "Use '@/lib/supabase' instead.",
          },
          { name: "@supabase/ssr", message: "Use '@/lib/supabase' instead." },
          {
            name: "@/lib/supabaseServer",
            message: "Use '@/lib/supabase' instead.",
          },
          {
            name: "@/lib/supabaseClient",
            message: "Use '@/lib/supabase' instead.",
          },
          {
            name: "@/lib/supabaseBrowser",
            message: "Use '@/lib/supabase' instead.",
          },
          {
            name: "@/lib/supabaseAdmin",
            message: "Use '@/lib/supabase' instead.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["src/lib/supabase/**/*.ts"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
  ],
  ignores: [
    "app/dashboard/**/actions.ts",
    "app/dashboard/**/components/*.tsx",
    "middleware.ts",
    ".eslintrc.*",
    "scripts/**",
    "**/*.new.*",
  ],
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
};
