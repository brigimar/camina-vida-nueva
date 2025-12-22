MAPA DE DEPENDENCIAS PARA CIRCUITOS Y DASHBOARD
VISIÓN GENERAL DEL FLUJO
Objetivo: Crear y editar circuitos, exponerlos vía API, y reflejarlos en el dashboard con KPIs y listados.

Puntos críticos: API completa (CRUD), formularios conectados, y dashboard leyendo desde endpoints.

Orden recomendado: API → Formulario y páginas → Dashboard Circuitos → Dashboard Resumen → Módulos secundarios.

CAPAS Y RESPONSABILIDADES
CAPA DE DATOS (SUPABASE + CLIENTES)
Fuente: Tabla circuitos (y sesiones, inscripciones, coordinadores si aplica).

Clientes:

createSupabaseServer: Acceso server-side en páginas y API.

Supabase Client (lib): Inicialización y configuración compartida.

CAPA API (NEXT.JS ROUTE HANDLERS)
Archivo: app/api/circuitos/route.ts

Responsabilidad: Exponer GET, POST, PUT, DELETE con validación y seguridad.

Dependencias:

circuitoSchema (@/lib/validators/circuitoSchema) → validación de payload.

createSupabaseServer (@/lib/supabaseServer) → conexión a Supabase.

requireUser (@/lib/auth/authorize) → autorización en mutaciones.

respuesta utils (ok, errorResponse, unauthorized) → respuestas estándar.

PÁGINAS Y COMPONENTES DE CIRCUITOS
FORMULARIO DE CIRCUITOS (CLIENT)
Archivo: app/dashboard/circuitos/components/CircuitoForm.tsx

Responsabilidad: Crear/editar circuitos con validación UI.

Dependencias:

circuitoSchema → resolver Zod via zodResolver.

react-hook-form → manejo de formulario.

onSubmit (prop) → función que llama a la API (POST/PUT).

Dependen de él:

Crear página (page.tsx) → usar onSubmit con POST.

Editar página (edit/[id]/page.tsx) → setear initialData y usar PUT.

PÁGINA DE CREACIÓN
Archivo sugerido: app/dashboard/circuitos/page.tsx

Responsabilidad: Renderizar CircuitoForm y conectar con POST /api/circuitos.

Dependencias:

CircuitoForm → UI y validación.

API POST → persistencia.

Dependen de ella:

DashboardCircuitos.jsx → debería reflejar nuevos circuitos creados.

PÁGINA DE EDICIÓN
Archivo sugerido: app/dashboard/circuitos/edit/[id]/page.tsx

Responsabilidad: Cargar circuito, pasar initialData a CircuitoForm, y conectar con PUT /api/circuitos.

Dependencias:

createSupabaseServer → fetch del circuito por id.

CircuitoForm → UI y validación.

API PUT → persistencia.

PÁGINA DE DETALLE
Archivo: app/dashboard/circuitos/[id]/page.tsx

Responsabilidad: Mostrar información del circuito (flyer) y linkear a edición.

Dependencias:

createSupabaseServer → fetch por id.

Dependen de ella:

Flujo de edición (navegación hacia edit/[id]).

DASHBOARD Y VISUALIZACIÓN
DASHBOARD CIRCUITOS
Archivo sugerido: app/dashboard/DashboardCircuitos.jsx

Responsabilidad: Tabla/listado de circuitos con estado (activo, cupo, próxima fecha).

Dependencias:

API GET /api/circuitos → listados con paginación, búsqueda y filtros.

Componentes UI (CircuitosListado.jsx, CircuitoCard.jsx, CircuitoGrid.jsx) → render.

Dependen de él:

Dashboard general → sección de circuitos.

DASHBOARD RESUMEN
Archivo sugerido: app/dashboard/DashboardResumen.jsx

Responsabilidad: KPIs rápidos (total circuitos, inscriptos, coordinadores activos).

Dependencias:

API GET /api/circuitos → conteos y estados.

API GET /api/inscripciones → totales por circuito (si ya existe).

Coordinadores → conteo (si se expone por API).

Dependen de él:

Home del dashboard → vista ejecutiva de estado.

MÓDULOS EXISTENTES DE DASHBOARD
Archivos:

DashboardInscriptos.jsx → gráfica/tabla por circuito (depende de /api/inscripciones y /api/circuitos).

DashboardCoordinadores.jsx → listado y métricas (depende de fuente de coordinadores).

DashboardRoles.jsx → control de accesos (depende de sistema de auth/roles).

COMPONENTES DE CIRCUITOS (CATÁLOGO UI)
Ubicación: src/components/circuitos/

Archivos:

CircuitoCard.jsx / CircuitoFlyerCard.jsx → presentación.

CircuitoGrid.jsx / CircuitosGrid.jsx → distribución.

CircuitosListado.jsx → listado con paginación y filtros client-side (día/horario).

MapaGeneralCircuitos.jsx → visualización geográfica.

CircuitosSkeleton.jsx / CircuitoSkeleton.jsx → estados de carga.

Dependencias:

Data desde CircuitosContent o API GET /api/circuitos.

Dependen de ellos:

DashboardCircuitos.jsx y vistas públicas/listado.

ORDEN EXACTO DE IMPLEMENTACIÓN
API CIRCUITOS (CRUD COMPLETO)

Archivos: app/api/circuitos/route.ts

Acciones:

GET: Confirmar paginación, búsqueda, filtros, orden.

POST: Validar con circuitoSchema, auth, crear.

PUT: Agregar actualización por id (validación, auth).

DELETE: Agregar eliminación por id (validación, auth).

Validaciones extra: fecha futura, cupo > 0, coordinador existente.

PÁGINA DE CREACIÓN

Archivos: app/dashboard/circuitos/page.tsx, usa CircuitoForm.tsx

Acciones: Conectar onSubmit a POST /api/circuitos, feedback y redirección.

PÁGINA DE EDICIÓN

Archivos: app/dashboard/circuitos/edit/[id]/page.tsx, usa CircuitoForm.tsx

Acciones: Cargar datos (createSupabaseServer), pasar initialData, conectar onSubmit a PUT.

PÁGINA DE DETALLE

Archivos: app/dashboard/circuitos/[id]/page.tsx

Acciones: Confirmar fetch por id, enlaces hacia edición.

DASHBOARD CIRCUITOS

Archivos: app/dashboard/DashboardCircuitos.jsx

Acciones: Consumir GET /api/circuitos, tabla con estado y filtros básicos; integrar componentes existentes de src/components/circuitos.

DASHBOARD RESUMEN

Archivos: app/dashboard/DashboardResumen.jsx

Acciones: KPIs con datos de /api/circuitos (y /api/inscripciones si disponible).

PRUEBAS DE FLUJO

Acciones:

Crear circuito → ver en DashboardCircuitos.

Editar circuito → ver cambios reflejados.

Borrar circuito → confirmar eliminación en dashboard.

Validaciones y errores con feedback claro.

DEPENDENCIAS CRÍTICAS Y RIESGOS
Validaciones ZOD vs DB:

Label: Alineación

Detalle: circuitoSchema debe reflejar columnas y restricciones reales de Supabase.

Autorización en mutaciones:

Label: Seguridad

Detalle: requireUser debe devolver identidad, roles y permisos mínimos para POST/PUT/DELETE.

Consistencia de estados en UI:

Label: UX

Detalle: Tras crear/editar/borrar, refrescar datos del dashboard (revalidación SSR/ISR o refetch client).

Filtros de día/horario:

Label: Lógica

Detalle: Si se calculan en client por sesiones[], validar formato y estructura de datos recibidos del select("*, sesiones(*)").

TRAZABILIDAD ENTRE ARCHIVOS
CircuitoForm.tsx

Depende de: circuitoSchema

Consumido por: page.tsx, edit/[id]/page.tsx

Accede a: POST/PUT /api/circuitos

page.tsx  (crear)

Depende de: CircuitoForm.tsx

Accede a: POST /api/circuitos

Afecta: DashboardCircuitos.jsx (nuevos registros)

edit/[id]/page.tsx (editar)

Depende de: createSupabaseServer, CircuitoForm.tsx

Accede a: PUT /api/circuitos

Afecta: DashboardCircuitos.jsx (actualizaciones)

[id]/page.tsx (detalle)

Depende de: createSupabaseServer

Afecta: Navegación hacia edit/[id]

app/api/circuitos/route.ts

Depende de: createSupabaseServer, circuitoSchema, requireUser, respuesta utils

Afecta: CircuitoForm.tsx, DashboardCircuitos.jsx, DashboardResumen.jsx

DashboardCircuitos.jsx

Depende de: GET /api/circuitos, componentes UI de src/components/circuitos

Afecta: Visibilidad de nuevos/actualizados circuitos

DashboardResumen.jsx

Depende de: GET /api/circuitos (y /api/inscripciones si aplica)

Afecta: Comprensión ejecutiva del estado del sistema