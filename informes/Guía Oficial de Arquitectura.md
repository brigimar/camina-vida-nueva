# 🏗️ Guía Oficial de Arquitectura — Next.js + Supabase
Landing pública + Dashboard privado + Layout híbrido + Buenas prácticas de SSR
## 1. Introducción
Este documento describe la arquitectura oficial del proyecto Camina Vida, construido con:

Next.js  15 (App Router)

Supabase

Server Components + Client Components

Landing pública + Dashboard privado

API Routes internas

Layout híbrido para evitar errores de hidratación

Incluye además la solución completa al error:

Código
Failed to parse URL from undefined/api/inscripciones/1
y las buenas prácticas definitivas para evitarlo en el futuro.

# ✅ 2. Server Components vs Client Components
Next.js  13+ introduce un modelo híbrido:

✅ Server Components (por defecto)
Corren en el servidor

Pueden usar Supabase Server

Pueden ser async

No pueden usar hooks

No pueden renderizar Client Components directamente

✅ Client Components
Requieren "use client"

Corren en el navegador

Pueden usar useState, useEffect, eventos, animaciones

No pueden acceder a Supabase Server

# ✅ 3. Problema clásico: errores de hidratación
Ocurre cuando:

Un Server Component intenta renderizar un Client Component

El HTML del servidor no coincide con el del cliente

Se usan variables de entorno públicas en SSR

Se construyen URLs absolutas incorrectas

Ejemplo real del proyecto:

Código
HeaderCaminaVida is not defined
o peor:

✅ El componente se renderiza como texto plano sin estilos  
✅ El menú mobile no funciona
✅ El mega‑menu no se abre

# ✅ 4. Solución: Layout híbrido con Client Wrapper
Arquitectura final:

Código
app/layout.tsx        → Server Component
src/components/layout/LayoutClient.tsx → Client Component
HeaderCaminaVida.jsx  → Client Component
FooterCaminaVida.jsx  → Client Component
✅ app/layout.tsx (Server)
tsx
import type { Metadata } from "next";
import LayoutClient from "@/components/layout/LayoutClient";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camina Vida",
  description: "Sembramos pasos, cosechamos vida.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-white">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
✅ LayoutClient.tsx (Client)
tsx
"use client";

import HeaderCaminaVida from "@/components/landing/HeaderCaminaVida";
import FooterCaminaVida from "@/components/landing/FooterCaminaVida";

export default function LayoutClient({ children }) {
  return (
    <>
      <HeaderCaminaVida />
      {children}
      <FooterCaminaVida />
    </>
  );
}
✅ Hidratación correcta
✅ Interactividad funcionando
✅ SSR intacto
✅ Dashboard intacto

# ✅ 5. Organización del proyecto
Código
app/
  layout.tsx
  page.tsx
  dashboard/
    layout.tsx
    circuitos/
    coordinadores/
    sesiones/
    inscripciones/
src/
  components/
    landing/
    dashboard/
    layout/
  lib/
    supabaseServer.ts
    supabaseBrowser.ts
    controllers/
    validators/
  hooks/
  types/
✅ Landing pública
SSR + Client Components

Mega‑menu

CTA flotante

Animaciones

✅ Dashboard privado
Client Components

CRUD

Validación con Zod

Controladores + API Routes

# ✅ 6. Solución completa al error “undefined/api/inscripciones/1”
✅ Diagnóstico exacto
El error:

Código
Failed to parse URL from undefined/api/inscripciones/1
ocurría porque:

Se usaba process.env.NEXT_PUBLIC_BASE_URL para construir URLs absolutas

En SSR esta variable era undefined

La URL final quedaba:

Código
undefined/api/inscripciones/1
✅ 7. Archivos corregidos (5 total)
✅ 1. dataProvider.ts
diff
- const API_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api";
+ const API_URL = "/api";
✅ 2. app/reservar/[id]/page.tsx
diff
- `${process.env.NEXT_PUBLIC_BASE_URL}/api/inscripciones/${id}`
+ `/api/inscripciones/${id}`
✅ 3. app/dashboard/inscripciones/edit/[id]/page.tsx
diff
- const url = `${baseUrl}/api/inscripciones/${id}`;
+ const url = `/api/inscripciones/${id}`;
✅ 4. app/dashboard/sesiones/edit/[id]/page.tsx
diff
- fetch(`${baseUrl}/api/sesiones/${id}`)
+ fetch(`/api/sesiones/${id}`)
✅ 5. app/dashboard/coordinadores/edit/[id]/page.tsx
diff
- fetch(`${baseUrl}/api/coordinadores/${id}`)
+ fetch(`/api/coordinadores/${id}`)
# ✅ 8. Buenas prácticas oficiales para URLs internas
✅ Regla de oro:
Código
📌 Llamadas internas a /api → SIEMPRE rutas relativas
✅ Correcto:
ts
fetch(`/api/inscripciones/${id}`);
❌ Incorrecto:
ts
fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/...`);
fetch(`${window.location.origin}/api/...`);
fetch(`${headers().get("host")}/api/...`);
# ✅ 9. Por qué funciona
Las rutas relativas:

✅ funcionan en SSR
✅ funcionan en CSR
✅ funcionan en Vercel
✅ no dependen de variables de entorno
✅ no generan URLs inválidas

Next.js  resuelve automáticamente /api/... a la URL completa.

# ✅ 10. Estado final del proyecto
Aspecto	Estado
Hidratación	✅ Correcta
Header/Footer	✅ Funcionales
SSR	✅ Estable
Dashboard	✅ Intacto
URLs internas	✅ Seguras
Errores previos	✅ Eliminados
# ✅ 11. Conclusión
Este compendio establece:

✅ La arquitectura oficial del proyecto
✅ Las reglas para Server/Client Components
✅ El layout híbrido correcto
✅ La organización del código
✅ Las buenas prácticas para llamadas internas
✅ La solución completa al error de URLs
✅ Un estándar para el equipo