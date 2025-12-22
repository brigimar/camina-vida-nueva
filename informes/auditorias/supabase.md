# Auditoría — Supabase

## Cambios aplicados
- Eliminado singleton global `src/lib/supabaseClient.ts`.
- Separación de clientes:
  - Navegador: `src/lib/supabaseBrowser.ts` usando `createBrowserClient`.
  - Servidor: `src/lib/supabaseServer.ts` usando `createServerClient` con cookies.
- API Routes migradas a cliente admin por request (`createClient` + `SUPABASE_SERVICE_ROLE_KEY`).

## Razón
- Evitar fuga de credenciales y estado global compartido.
- Persistencia correcta de sesión a través de cookies gestionadas por SSR/Edge.
- Aislamiento por request para escalabilidad y seguridad.

## Verificación
- `grep -r "supabaseClient" app/ src/` no devuelve referencias.
- `grep -r "getBrowserSupabase" src/hooks` no devuelve usos (evitar en hooks SSR).
- Build y lint pasan localmente.
