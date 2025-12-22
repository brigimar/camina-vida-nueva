# Validaciones — Hooks & Client Boundaries

## Objetivo
Asegurar que los hooks de UI no inicialicen clientes de Supabase y consuman APIs internas vía `fetch`, respetando boundaries cliente/servidor.

## Cambios aplicados
- Declarado `"use client"` en:
  - src/hooks/useInscriptos.ts
  - src/hooks/useCoordinadores.ts
  - src/hooks/useUserRoles.ts
  - src/hooks/useCircuitos.ts (ya lo tenía, se mantiene)
- Eliminado uso directo de Supabase en hooks. Ahora utilizan `fetch("/api/...")`.
- Mantenido el patrón de estado React (data/loading/error) y `refetch` donde aplica.

## Checklist
- [x] Todos los hooks declaran `"use client"`.
- [x] Ningún hook usa `createClient()` ni inicializa Supabase directo.
- [x] Todos los hooks consumen datos vía `fetch("/api/...")`.

## Notas
- Asegurar que los endpoints `/api/*` devuelvan forma `{ data, meta? }` para mantener compatibilidad.
- Evitar llamar estos hooks en Server Components.
