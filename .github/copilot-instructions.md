<!-- .github/copilot-instructions.md -->
# Copilot / AI Agent Quick Instructions

Purpose: help an AI coding agent be immediately productive in this Next.js + Supabase project.

- Big picture:
  - This is a Next.js (App Router) project (see `app/layout.tsx`, `app/page.tsx`).
  - Server code lives in `app/api/*/route.ts` (Next route handlers) and in `src/lib/*` helpers.
  - Auth and data flows use Supabase: `src/lib/supabaseServer.ts` (server-side) and `src/lib/supabaseBrowser.ts` (client-side).
  - `src/providers` contains `authProvider.ts`, `dataProvider.ts`, and `refineProvider.tsx` (Refine config). `Refine` handles CRUD routing for resources like `circuitos`.
  - UI components live under `src/components` and the feature UI under `app/*` and `src/components/*`.

- Key developer workflows / scripts (from `package.json`):
  - Start dev server: `npm run dev` (use `npm run dev:insecure` only for TLS debugging).
  - Build: `npm run build` — then `npm run start` for production.
  - Lint: `npm run lint`; Type check: `npm run type-check`; Format: `npm run format`.

- Important patterns & conventions you must follow when editing code:
  - App Router semantics: files under `app/` are by default server components. If a file needs client-side hooks or state, it must include `"use client"` at the top (see `src/providers/refineProvider.tsx`).
  - Server vs browser Supabase:
    - Use `createSupabaseServer()` (in `src/lib/supabaseServer.ts`) inside server components or API routes. It wires cookies into the Supabase client.
    - Use `createSupabaseBrowser()` (in `src/lib/supabaseBrowser.ts`) in client components.
    - Be conservative about leaking server-only secrets; environment variables used are `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - API shape convention: many frontend hooks call internal API routes. Example: `src/hooks/useCircuitos.ts` fetches `/api/circuitos` and expects the JSON payload shape where `res.data` is an envelope and items are in `res.data.data` (so setData(res.data.data); setMeta(res.data)). Mirror this response shape when updating/adding API routes.
  - Refine integration: `src/providers/refineProvider.tsx` sets resources (e.g., `circuitos`). When adding CRUD endpoints, keep paths consistent with the `resources` config.

- Integration points to watch:
  - Supabase: `src/lib/supabaseServer.ts`, `src/lib/supabaseBrowser.ts`, and `src/lib/supabaseClient.ts` (if present) — use the explicit helpers rather than re-creating clients.
  - Auth provider: `src/providers/authProvider.ts` — check this before changing auth-related flows.
  - API routes: `app/api/*/route.ts` — they are thin handlers used by frontend hooks.

- Useful file examples to inspect before coding:
  - `app/api/circuitos/route.ts` — API handler pattern for resources.
  - `src/hooks/useCircuitos.ts` — frontend hook that consumes `/api/circuitos`.
  - `src/providers/refineProvider.tsx` — Refine integration and resources.
  - `src/lib/supabaseServer.ts` — server client with cookie handling and console instrumentation.

- When making changes:
  - Preserve App Router rules: if adding stateful JSX to files in `app/`, add `"use client"` and keep server-only code (cookies, server-only env) out of client bundles.
  - Match API response envelopes used by hooks (`{ data: { data: [...] }, ... }`). Update both API and hooks together.
  - Run `npm run dev` locally and check server logs (the server supabase helper logs cookie operations). If `npm run dev` fails, check environment variables in `.env.local`.

- For PR descriptions and tests:
  - Describe whether a change affects server vs client code (App Router boundary) and list which helper (`createSupabaseServer` vs `createSupabaseBrowser`) you used.

If anything above is unclear or you want more examples (for instance specific `route.ts` handlers or the `authProvider`), tell me which area to expand and I'll update this file.
