# Controllers — Checklist de Cambios (Coordinadores y Sesiones)

## src/lib/controllers/coordinadores.ts

Exporta:
- getAllCoordinadores()
- getCoordinadores() [alias]
- getCoordinadorById(id)
- createCoordinador(payload)
- updateCoordinador(id, update)
- deleteCoordinador(id)

Cambios clave:
- `await createSupabaseServer()` aplicado en todas las funciones.
- Validación con Zod: `coordinadorSchema` (payload en create y partial en update).
- `createCoordinador` setea `estado: "activo"` por defecto.
- `updateCoordinador` agrega `updated_at` (ISO) en cada actualización.
- `deleteCoordinador` es soft delete (`estado: "inactivo"` + `updated_at`).

## src/lib/controllers/sesiones.ts

Exporta:
- getSesiones()
- getSesionById(id)
- createSesion(payload)
- updateSesion(id, payload)
- deleteSesion(id)
- getSesionesFuturas()
- getSesionesByCircuito(circuito_id)

Cambios clave:
- `getSesiones` y `getSesionById` incluyen relaciones con circuito (`circuitos(id, nombre, localidad)`).
- `updateSesion` agrega `updated_at` (ISO) en cada actualización.
- `deleteSesion` es soft delete (`estado: "cancelado"` + `updated_at`).
- Nuevas funciones `getSesionesFuturas` y `getSesionesByCircuito` con orden por fecha ascendente.
