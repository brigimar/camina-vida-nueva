# ✅ 1. README MAESTRO — Módulo de Circuitos
docs/CIRCUITOS-README.md
🏗️ Módulo de Circuitos — Arquitectura y Funcionamiento
Este documento describe la arquitectura completa del módulo Circuitos, incluyendo responsabilidades, dependencias, flujos, endpoints, hooks y componentes. Está escrito en un estilo híbrido: técnico, claro y con narrativa para entender el porqué de cada decisión.

## 1. Propósito del módulo
El módulo Circuitos es la base de la experiencia pública de Camina Vida.
Su objetivo es:

Mostrar todos los circuitos activos

Permitir filtrado avanzado (categoría, barrio, día, horario)

Integrar sesiones dentro de cada circuito

Ofrecer una experiencia fluida, rápida y sin errores de hidratación

## 2. Arquitectura general
Código
app/circuitos/page.tsx        → Server Component (SSR)
src/components/circuitos/     → Client Components
app/api/circuitos/route.ts    → API Route
src/lib/controllers/circuitos → Lógica de negocio
src/hooks/useCircuitos.ts     → Data fetching client-side
✅ Server Components
Cargan circuitos + sesiones desde Supabase

Garantizan SSR rápido y SEO-friendly

✅ Client Components
Filtrado dinámico

Animaciones

Renderizado de tarjetas

✅ API Route
Permite filtrado desde el dashboard y otros módulos

Devuelve circuitos + sesiones

✅ Controlador
Centraliza la lógica de negocio

Evita duplicación de queries

## 3. Componentes principales
✅ CircuitosListado.jsx
Mantiene el estado de los filtros

Aplica filtrado client-side

Renderiza CircuitosFilters + CircuitosGrid

✅ CircuitosFilters.jsx
UI de filtros

Controla:

categoría

barrio

día

horario

búsqueda

✅ CircuitosGrid.jsx
Renderiza tarjetas con animación

Usa CircuitoFlyerCard

✅ CircuitoFlyerCard.jsx
Tarjeta visual del circuito

Muestra datos clave: nombre, categoría, distancia, coordinadores, precio

## 4. Hooks
✅ useCircuitos.ts
Construye query string

Llama a /api/circuitos

Maneja errores

Devuelve circuitos + sesiones

## 5. Endpoints
✅ GET /api/circuitos
Parámetros soportados:

search

categoria

barrio

No soporta:

estado

nivel

Siempre devuelve:

circuitos activos

sesiones asociadas

## 6. Flujo completo
(Ver diagrama en el documento siguiente)

## 7. Decisiones clave
✅ Filtrado por día/horario se hace client-side
Porque sesiones es un array y Supabase no puede filtrar arrays anidados con lógica compleja sin RLS custom.

✅ SSR carga circuitos + sesiones
Para evitar múltiples roundtrips.

✅ URLs internas siempre relativas
Para evitar errores como undefined/api/....

## 8. Resultado final
El módulo ahora es:

✅ estable
✅ rápido
✅ coherente
✅ trazable
✅ escalable

# ✅ 2. DIAGRAMA VISUAL — Flujo completo
docs/CIRCUITOS-FLUJO.md
🔄 Flujo del Módulo de Circuitos
✅ Versión ASCII (compatible con GitHub)
Código
┌────────────────────────────────────────────┐
│          /circuitos (Server Component)     │
│--------------------------------------------│
│  - SSR: fetch circuitos + sesiones         │
│  - eq("activo", true)                      │
│  - order("nombre")                         │
└───────────────┬────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│        CircuitosListado (Client)           │
│--------------------------------------------│
│  - Estados: search, categoria, barrio,     │
│             dia, horario                   │
│  - Filtrado client-side                    │
└───────────────┬────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│          CircuitosFilters (UI)             │
│--------------------------------------------│
│  - Inputs controlados                      │
│  - Cambios actualizan estado               │
└───────────────┬────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│          CircuitosGrid (Render)            │
│--------------------------------------------│
│  - Mapea circuitos                         │
│  - Animación fade-in                       │
│  - Usa CircuitoFlyerCard                   │
└────────────────────────────────────────────┘
✅ Versión Mermaid
mermaid
flowchart TD

A[/circuitos (SSR)/] --> B[CircuitosListado (Client)]
B --> C[CircuitosFilters]
B --> D[CircuitosGrid]
D --> E[CircuitoFlyerCard]

subgraph SSR
A
end

subgraph Client
B
C
D
E
end
# ✅ 3. CHECKLIST PARA PRs
docs/CIRCUITOS-PR-CHECKLIST.md
✅ Checklist para Pull Requests — Módulo de Circuitos
Este checklist evita regresiones, filtros obsoletos y errores de hidratación.

✅ 1. Filtros
[ ] No se usa nivel

[ ] No se usa estado

[ ] Se usan solo: categoría, barrio, día, horario

[ ] Filtrado por día/horario se hace client-side

[ ] No hay lógica duplicada en múltiples componentes

✅ 2. SSR
[ ] SSR carga circuitos + sesiones

[ ] No hay Math.random() en SSR

[ ] No hay Date.now() en SSR

[ ] No hay window.* en SSR

✅ 3. API Routes
[ ] /api/circuitos no usa estado/nivel

[ ] Siempre filtra por activo = true

[ ] Incluye sesiones(*)

✅ 4. URLs internas
[ ] No se usa process.env.NEXT_PUBLIC_BASE_URL

[ ] Todas las llamadas internas usan rutas relativas

[ ] No hay URLs construidas dinámicamente en SSR

✅ 5. Componentes
[ ] CircuitosGrid renderiza CircuitoFlyerCard

[ ] Animación usa índice, no random

[ ] CircuitosListado pasa todos los filtros correctamente

✅ 6. Controladores
[ ] circuitos.ts usa categoría/barrio

[ ] No usa estado/nivel

[ ] Devuelve sesiones

# ✅ 4. BEST PRACTICES — Next.js + Supabase + SSR + Client Components
docs/BEST-PRACTICES-NEXT-SUPABASE.md
🌱 Best Practices — Next.js + Supabase + SSR + Client Components
Este documento resume las prácticas recomendadas para mantener el proyecto estable, rápido y escalable.

## 1. Server vs Client Components
✅ Server Components
Usar para:

SSR

Fetch de Supabase

SEO

Páginas públicas

Evitar:

hooks

window

Math.random

Date.now

✅ Client Components
Usar para:

UI interactiva

Filtros

Formularios

Animaciones

## 2. Supabase
✅ Server-side
Usar createServerClient()  
Ideal para:

circuitos

sesiones

inscripciones

✅ Client-side
Usar createBrowserClient()  
Solo para:

auth

interacciones del usuario

## 3. URLs internas
✅ Siempre usar rutas relativas:

Código
/api/circuitos
/api/sesiones
/api/inscripciones
❌ Nunca usar:

Código
process.env.NEXT_PUBLIC_BASE_URL
window.location.origin
headers().get("host")
## 4. Filtrado
✅ Filtrar por arrays (sesiones) en el cliente
✅ Filtrar por columnas simples en el servidor
✅ Mantener filtros centralizados

## 5. Animaciones
✅ Usar delays determinísticos
❌ No usar Math.random() en SSR

## 6. Organización del código
✅ Controladores en src/lib/controllers  
✅ Validadores en src/lib/validators  
✅ Hooks en src/hooks  
✅ Componentes en src/components  
✅ API Routes limpias y delgadas

## 7. Errores comunes a evitar
❌ Filtrar por estado/nivel (ya no existen)
❌ URLs absolutas
❌ Lógica duplicada
❌ SSR con valores no determinísticos
❌ Queries sin sesiones

## 8. Resultado final
Aplicando estas prácticas:

✅ El proyecto es estable
✅ El SSR es consistente
✅ No hay errores de hidratación
✅ Los circuitos cargan correctamente
✅ El dashboard sigue funcionando
✅ La arquitectura es escalable