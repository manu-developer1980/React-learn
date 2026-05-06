# Roadmap del Proyecto (Aprendizaje + Implementación)
Este documento define la ruta recomendada para construir el proyecto **sin adelantarnos al temario**. La idea es ir preparando el terreno y ejecutar cada fase cuando toque en el curso.

## Tabla de contenidos
- 1. Objetivo de la ruta
- 2. Principios de esta ruta
- 3. Fases del proyecto (en orden)
- 4. Cómo encaja con el curso
- 5. Qué hacemos ahora (próximo paso)

## 1. Objetivo de la ruta
Construir un MVP del widget/plugin siguiendo una progresión natural:

- Aprender primero lo necesario (React → TypeScript → Node → Next.js).
- Implementar el proyecto en fases cortas y verificables.
- Evitar bloqueos por mezclar demasiadas piezas nuevas a la vez (Next + WP + Shadow DOM + licencias).

## 2. Principios de esta ruta
- Un solo “concepto nuevo” a la vez.
- Primero end-to-end mínimo, luego “pro”.
- Shadow DOM e hidratación van después de dominar SSR + endpoints.
- WordPress plugin se aborda cuando ya exista algo estable que pedir (SSR/JSON).

## 3. Fases del proyecto (en orden)

### Fase A — UI del Widget (solo React, datos fake)
**Objetivo:** diseñar la tabla comparativa y filtros con datos locales.

**Entregables:**
- Tabla comparativa renderizando una lista de casinos (mock).
- Estados: vacío, loading simulado, error simulado.
- Filtros (por texto, por feature, por rating).

**Checklist de skills:**
- Componentización.
- Listas + filtros + estado.

---

### Fase B — Next.js Básico (SSR + endpoint JSON)
**Objetivo:** aprender App Router con un mini backend que sirva:

- HTML SSR (para SEO).
- JSON público (para interactividad).

**Entregables:**
- Endpoint JSON `/api/...` con dataset mínimo.
- Página SSR que renderiza contenido inicial.
- Componente cliente que consume el JSON con loading/error/empty.

**Checklist de skills:**
- Server vs Client (qué corre dónde).
- Rutas (pages) + endpoints.

---

### Fase C — Plugin WordPress Básico (shortcode + settings + cache)
**Objetivo:** dominar el “wrapper” en WP antes de Shadow DOM.

**Entregables:**
- Shortcode `[mi_widget]` que imprime HTML.
- Página de ajustes (guardar `license_key`/config).
- Cache con `set_transient` y botón “clear cache”.
- Fallback (si API falla: mostrar cache anterior o mensaje controlado).

**Checklist de skills:**
- Estructura de plugin.
- `wp_remote_get` + `set_transient`.
- Sanitización antes de imprimir HTML.

---

### Fase D — Conexión WP ↔ Next (SSR embebible)
**Objetivo:** WordPress pide HTML SSR al backend Next y lo imprime.

**Entregables:**
- Endpoint SSR “embebible” (devuelve HTML listo para insertar).
- WP hace request server-to-server y lo cachea.
- Validación de dominio/licencia (primero mock, luego real).

---

### Fase E — Shadow DOM + Hidratación (aislamiento visual + filtros realtime)
**Objetivo:** hacer el widget “pixel-perfect” y con interactividad dentro del Shadow Root.

**Entregables:**
- WP inserta contenedor + Shadow Root.
- Se inyecta CSS dentro del Shadow Root.
- React hidrata y activa filtros en tiempo real.

---

### Fase F — Licenciamiento (Stripe + Supabase) y hardening
**Objetivo:** monetización y control de acceso.

**Entregables:**
- Webhook de Stripe que crea/actualiza licencia.
- Reglas por plan (rate limit, domains, quotas).
- Observabilidad mínima (logs, errores controlados).

## 4. Cómo encaja con el curso
Seguimos el orden previsto y usamos el proyecto como “aplicación práctica” cuando toque:

- React (R1–R3): avanzamos en la **Fase A**.
- TypeScript (TS1–TS2): tipamos el modelo de datos del widget.
- Node/Express (N1–N4): base de APIs y conceptos de seguridad.
- Next.js (NX1–NX4): ejecutamos la **Fase B** y luego **Fase D**.
- WordPress plugin: ejecutamos la **Fase C** cuando ya haya endpoints reales.

## 5. Qué hacemos ahora (próximo paso)
Como Next.js y WordPress plugin todavía no los has tocado, lo más eficiente es:

- Mantener el foco del curso.
- En paralelo, cuando practiquemos React, ir construyendo la UI del widget con datos fake (Fase A).

