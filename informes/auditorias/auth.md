# Auditoría — Autenticación

## Cambios aplicados
- Middleware reemplazado por `createMiddlewareSupabaseClient` para validar sesión real.
- Protección de rutas `/dashboard` con redirect a `/login` cuando no hay sesión.
- Login actualizado a cliente de navegador y navegación con `router.push` sin recarga.

## Riesgos mitigados
- Bypass por simple cookie `sb-*-auth-token`.
- Pérdida de estado por redirecciones `window.location.href`.
- Inconsistencias de sesión por cliente global.

## Pruebas funcionales
- Acceso a `/dashboard` sin login → redirige a `/login`.
- Login correcto → navega a `/dashboard` sin recargar.
- Refresh en `/dashboard` mantiene sesión (cookies SSR).
