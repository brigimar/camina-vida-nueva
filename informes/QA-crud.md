Acá tenés un **QA_CHECKLIST.md** completo, profesional y perfectamente alineado con tu arquitectura actual.  
Está pensado para que cualquier persona del equipo —o vos mismo en modo auditor— pueda validar cada CRUD de punta a punta sin perder tiempo ni dejar huecos.

---

# ✅ **QA_CHECKLIST.md**  
### *Checklist de QA para testear todos los CRUDs del sistema*  
**Módulos cubiertos:**  
- Circuitos  
- Sesiones  
- Coordinadores  
- Inscripciones  

---

# # ✅ 1. CIRCUITOS — QA Checklist

## ✅ 1.1 Crear Circuito
- [ ] El formulario carga sin errores  
- [ ] Todos los campos obligatorios están presentes  
- [ ] Validación evita enviar campos vacíos  
- [ ] Imagen opcional funciona correctamente  
- [ ] Al enviar:
  - [ ] Muestra estado “guardando”  
  - [ ] Si hay error, se muestra mensaje  
  - [ ] Si es exitoso, redirige o muestra success  
- [ ] El circuito aparece en la lista del dashboard  
- [ ] El circuito aparece en `/circuitos` (SSR)  
- [ ] El circuito aparece en métricas (view + click)

## ✅ 1.2 Editar Circuito
- [ ] El formulario carga datos existentes  
- [ ] Se pueden modificar campos individuales  
- [ ] Validación funciona  
- [ ] Guardado exitoso actualiza la lista  
- [ ] SSR refleja cambios inmediatamente (revalidate)

## ✅ 1.3 Eliminar Circuito
- [ ] Acción marca `activo = false`  
- [ ] No aparece en `/circuitos`  
- [ ] No aparece en filtros  
- [ ] No rompe sesiones asociadas  

---

# # ✅ 2. SESIONES — QA Checklist

## ✅ 2.1 Crear Sesión
- [ ] Formulario carga sin errores  
- [ ] Select de circuito funciona  
- [ ] Select de coordinador funciona  
- [ ] Campo horario usa `type="time"`  
- [ ] Validación de horario correcta (`HH:MM`)  
- [ ] Cupo acepta solo números  
- [ ] Guardado exitoso crea sesión visible en dashboard  
- [ ] Sesión aparece en circuito correspondiente (SSR)

## ✅ 2.2 Editar Sesión
- [ ] Datos precargados correctos  
- [ ] Cambiar horario funciona  
- [ ] Cambiar coordinador funciona  
- [ ] Guardado actualiza sesión en dashboard  
- [ ] SSR refleja cambios

## ✅ 2.3 Eliminar Sesión
- [ ] Acción elimina o marca inactiva  
- [ ] No aparece en circuito  
- [ ] No rompe inscripciones asociadas  

---

# # ✅ 3. COORDINADORES — QA Checklist

## ✅ 3.1 Crear Coordinador
- [ ] Formulario carga sin errores  
- [ ] Campos obligatorios:
  - [ ] nombre  
  - [ ] apellido  
  - [ ] dni  
  - [ ] telefono  
  - [ ] email  
- [ ] Validación de email correcta  
- [ ] Validación de DNI correcta  
- [ ] Guardado exitoso  
- [ ] Aparece en lista de coordinadores  
- [ ] Aparece en select de sesiones

## ✅ 3.2 Editar Coordinador
- [ ] Datos precargados correctos  
- [ ] Cambios se guardan correctamente  
- [ ] SSR refleja cambios en sesiones

## ✅ 3.3 Eliminar Coordinador
- [ ] Acción marca `estado = inactivo`  
- [ ] No aparece en select de sesiones  
- [ ] No rompe sesiones existentes  

---

# # ✅ 4. INSCRIPCIONES — QA Checklist

## ✅ 4.1 Crear Inscripción
- [ ] Formulario carga sin errores  
- [ ] Campos obligatorios:
  - [ ] nombre  
  - [ ] apellido  
  - [ ] dni  
  - [ ] whatsapp  
  - [ ] sesion_id  
- [ ] Select de sesión funciona  
- [ ] Validación de DNI correcta  
- [ ] Validación de whatsapp correcta  
- [ ] Guardado exitoso  
- [ ] Inscripción aparece en dashboard  
- [ ] Cupo de sesión se respeta (si aplica)

## ✅ 4.2 Editar Inscripción
- [ ] Datos precargados correctos  
- [ ] Cambios se guardan correctamente  
- [ ] SSR refleja cambios en sesión correspondiente

## ✅ 4.3 Eliminar Inscripción
- [ ] Acción marca `estado = inactivo`  
- [ ] No aparece en listas activas  
- [ ] No rompe métricas ni sesiones  

---

# # ✅ 5. API ROUTES — QA Checklist

Para cada módulo:

## ✅ 5.1 Validación
- [ ] Rechaza payload inválido  
- [ ] Rechaza campos faltantes  
- [ ] Rechaza tipos incorrectos  
- [ ] Rechaza IDs inválidos  

## ✅ 5.2 Autenticación
- [ ] requireUser funciona en rutas protegidas  
- [ ] Rutas públicas no requieren auth  

## ✅ 5.3 Respuestas
- [ ] Devuelve JSON consistente  
- [ ] Devuelve status correctos (200, 400, 401, 404, 500)  
- [ ] Manejo de errores correcto  

---

# # ✅ 6. CONTROLADORES SUPABASE — QA Checklist

## ✅ 6.1 Queries
- [ ] Insert funciona  
- [ ] Update funciona  
- [ ] Delete lógico funciona  
- [ ] Relaciones correctas (`select("*, sesiones(*)")`, etc.)  
- [ ] No hay campos obsoletos  
- [ ] No hay referencias rotas  

## ✅ 6.2 Integridad
- [ ] No rompe circuitos  
- [ ] No rompe sesiones  
- [ ] No rompe inscripciones  
- [ ] No rompe coordinadores  

---

# # ✅ 7. ARQUITECTURA — QA Checklist

## ✅ 7.1 Server/Client Boundary
- [ ] Ningún formulario se ejecuta en SSR  
- [ ] Ningún event handler se pasa desde Server Components  
- [ ] Todos los formularios tienen `"use client"`  

## ✅ 7.2 SSR + Streaming
- [ ] SSR sigue funcionando  
- [ ] Suspense no se rompe  
- [ ] Skeleton aparece correctamente  
- [ ] Paginación SSR funciona  

## ✅ 7.3 Performance
- [ ] Memoización activa  
- [ ] No hay renders innecesarios  
- [ ] No hay loops infinitos  
- [ ] No hay fetches duplicados  

---

# # ✅ 8. MÉTRICAS — QA Checklist

## ✅ 8.1 Views
- [ ] Se envía métrica al montar CircuitosListado  
- [ ] Se agrupan categorías correctamente  
- [ ] Se insertan en Supabase  

## ✅ 8.2 Clicks
- [ ] Click en CircuitoFlyerCard envía métrica  
- [ ] circuito_id correcto  
- [ ] categoria correcta  

---

# ✅ **ESTADO FINAL: APTO PARA PRODUCCIÓN**  
Este checklist permite validar cada CRUD de punta a punta con trazabilidad total.

Si querés, puedo generar también:

✅ un **QA_RUNBOOK.md**  
✅ un **TEST_PLAN.md**  
✅ un **QA_AUTOMATION_PLAN.md**  

Decime cuál querés.