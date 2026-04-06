# Estado del Curso (Reset de foco) 🚀

Arrancamos una fase nueva con foco claro y alcance cerrado. Dejamos Auth en “MVP suficiente” y continuamos con el itinerario del curso.

## Progreso Real ✅

- Fase 1 (React Basics): mini‑proyecto Kanban completado.
- Fase 3 (Node+Express): API REST hecha en `jwt-ej1` con JWT.
- Auth Dashboard: base funcional (login, contexto, rutas protegidas). Estado: congelado para no dispersarnos.

## Siguiente Módulo

- Fase 4 → **Next.js Fundamentals (NX1)**.
- Objetivo: montar un blog básico con enrutado, layout y dos modalidades de data fetching.

## Decisiones NX1 (para no dispersarnos)

- Router: **App Router** (`/app`).
- Data fetching: **SSG** (Home + Post) y **SSR** (Server‑time).
- Fuente de posts: dataset local tipado (array/JSON) dentro del repo (sin CMS).
- Validación: `next build` debe pasar (y `next lint`/typecheck si están configurados).

## Mini‑proyecto Next.js (alcance cerrado)

- Páginas:
  - Home: lista de posts (SSG).
  - Post `[slug]`: detalle (SSG con paths estáticos).
  - About: estática.
  - Server‑time: SSR mostrando hora del servidor.
- Layout: header con navegación y slot de contenido.
- Tipado: TypeScript para el modelo `Post`.
- Estilos: Tailwind básico.
- Fuera de alcance: auth/roles, ISR, CMS, tests avanzados.

## Criterios de Done

- Navegación completa y layout visible en todas las páginas.
- SSG funcionando: build genera Home y Post estáticos.
- SSR funcionando: Server‑time renderiza en servidor.
- Tipos TS correctos en datos de `Post` (sin `any`).
- Estados mínimos: manejo de error donde aplique, sin loaders innecesarios.
- Comandos OK: `next build` (y `next lint`/typecheck si aplican en este repo).

## Backlog (no tocar ahora)

- Mejoras del Auth Dashboard (refresh avanzado, roles finos, interceptores).
- ISR y optimizaciones de Next.js (NX3).
- Integración con CMS / contenido dinámico.
- Batería de tests e2e/integración.

## Próxima Sesión

- Crear esqueleto de proyecto Next.js, layout, páginas básicas y navegación.
