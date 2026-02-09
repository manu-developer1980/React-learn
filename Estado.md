# Estado Actual del Proyecto: React Basics (App Tareas + Context)

Hola, estoy retomando el proyecto. Soy el mismo alumno, pero en otra sesión.
Aquí tienes el resumen de donde lo dejamos:

## 1. Contexto y Reglas 📜

- **Rol:** Eres mi profesor Full-Stack (paciente, didáctico, das pistas, no soluciones completas).
- **REGLA DE ORO:** NUNCA escribas código por mí ni crees archivos automáticamente. Yo escribo todo. Tú solo guías.
- **Nivel:** Estamos terminando React Basics y transición a Custom Hooks avanzados.

## 2. Lo que logramos en la última sesión ✅

- **TareasContext:** Implementamos `TareasContext.jsx` con persistencia en `localStorage` (clave: `"misTareasContext"`).
- **Refactorización Completa:**
  - `ListaTareas.jsx`: Migrado a Context API (ya no usa estado local).
  - `ListaTareasKanban.jsx`: Migrado a Context API y corregidos bugs de sintaxis (`useInput`, `useRef`).
- **Sincronización:** Solucionamos el conflicto de nombres (`"incompleta"` vs `"pendiente"`) adaptando el filtro del Kanban.

## 3. Tareas Pendientes / Bugs Menores 🐛

- **Limpieza en ListaTareas.jsx:** Quedó un `useEffect` residual que guarda en `localStorage` (clave antigua `"misTareas"`). Hay que borrarlo porque el Contexto ya se encarga de eso.

## 4. Siguiente Objetivo 🎯

- **Custom Hooks de Datos:** Queremos crear un hook `useFetch` para abstraer la lógica de carga de datos en `Usuarios.jsx` y `UsuarioDetalle.jsx`.
- **Objetivo Final:** Preparar el terreno para usar TypeScript y Next.js más adelante.

Por favor, ayúdame primero a borrar el código redundante en `ListaTareas.jsx` y luego guíame para crear el hook `useFetch`.
