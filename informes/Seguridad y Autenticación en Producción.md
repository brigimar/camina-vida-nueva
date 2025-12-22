 Seguridad y Autenticación en Producción
Problemas visibles
Dashboard sin contenido funcional visible

Falta de middleware robusto

Uso de window.location.href en lugar de redirección server-side

Uso inadecuado de Supabase en client-side

supabaseClient.ts exporta instancia global singleton

Rompe persistencia de sesión y manejo de cookies

Hooks sin "use client"

Ejemplo: useInscriptos.ts

Riesgo de errores en SSR y hydratación

Riesgos operativos confirmados
Bypass de autenticación en /dashboard

Fragilidad en actualizaciones por recargas completas

Escalabilidad comprometida en API routes con inicializaciones globales

Recomendaciones inmediatas
Prioridad	Acción	Justificación
🔴 Crítico	Reemplazar supabaseClient.ts por supabaseBrowser.ts en login/page.tsx	Corrige persistencia de sesión
🔴 Crítico	Agregar middleware.ts para proteger /dashboard	Evita acceso no autorizado
🟠 Alto	Agregar "use client" a todos los hooks en src/hooks/	Previene errores de hydratación
🟠 Alto	Reemplazar window.location.href por router.push('/dashboard')	Mejora UX y mantiene estado
⚠️ Medio	Migrar API routes a createSupabaseAdmin() con SUPABASE_SERVICE_ROLE_KEY	Asegura aislamiento y evita fugas
Estado inicial
Middleware: Pendiente

Supabase client: Pendiente

Hooks: Pendiente

Login redirection: Pendiente

API routes: Pendiente