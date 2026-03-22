# Estado Actual del Proyecto: Auth Dashboard + Auth JWT 🟢

Seguimos con el stack Full-Stack (Node/Express + Prisma + React). El foco actual está en conectar el Frontend `auth-dashboard` con el backend `jwt-ej1` y dejar preparada la app para rutas protegidas, roles y refresh de sesión.

## 1. Contexto y Reglas 📜

- **Rol:** Profesor Full-Stack.
- **REGLA DE ORO:** NUNCA escribas código por mí. Paso a paso y explicando el PORQUÉ.
- **Nivel:** Módulo 3 (Bases de Datos con PostgreSQL + Prisma) completado a nivel básico + Autenticación con JWT (incluyendo middlewares, roles y refresh).

## 2. Lo que acabamos de hacer (N2 Express + N3 DB + Auth avanzada) ✅

- **Infraestructura:**
  - Setup completo de Node + TypeScript + Express.
  - Configuración de `tsconfig.json` y `nodemon` para desarrollo ágil.
  - Estructura MVC (Model-View-Controller) profesional.
  - Integración con PostgreSQL en Supabase usando Prisma ORM.
- **API REST de Productos (con BD real, Supabase + Prisma):**
  - **GET**: Listar todos y buscar por ID leyendo desde PostgreSQL.
  - **POST**: Crear productos persistentes en la base de datos.
  - **PUT**: Actualizar productos existentes en la base de datos.
  - **DELETE**: Eliminar productos de la base de datos.
- **Mini‑proyecto jwt-ej1 (Node + TypeScript + Prisma SQLite + JWT avanzado):**
  - Proyecto separado de práctica para consolidar JWT y middlewares.
  - Prisma 6 con SQLite local y modelo `User` con campo `role` (`"user"` / `"admin"`).
  - Registro (`/register`) y login (`/login`) con contraseñas hasheadas con bcrypt y control de salt rounds.
  - Generación de JWT con `id`, `name`, `email` y `role` en el payload (nomenclatura unificada).
  - Rutas de perfil:
    - `/profile/:id` → consulta por ID.
    - `/profile` → usa `userId` del token para devolver el perfil autenticado.
  - Endpoint de refresh (`/refresh`):
    - Lee tokens expirados usando `ignoreExpiration`.
    - Verifica que el usuario sigue existiendo en BD.
    - Limpia `exp/iat` y genera un **nuevo** token con `expiresIn`.
  - Control de errores de JWT:
    - Diferencia entre token inválido y token expirado (`TokenExpiredError`).
    - Respuestas claras: `"Token not found"`, `"No autorizado"`, `"Token expirado"`.
  - Middleware `tokenCheck`:
    - Verifica el JWT y enriquece `req` con datos del payload.
  - Middleware `adminCheck`:
    - Vuelve a verificar el token.
    - Comprueba el rol y solo permite acceso si es `"admin"`.
    - Usado para rutas donde solo un admin puede crear otros usuarios.
  - Tipo `AuthedRequest`:
    - Extiende `Request` con `id`, `name`, `email`, `role` opcionales.
    - Permite tipar middlewares y controladores protegidos sin perder compatibilidad con Express.
- **Mini‑proyecto React “Auth Dashboard” (Setup Inicial):**
  - Proyecto inicializado con Vite + React + TypeScript.
  - Configuración de TailwindCSS v4 con soporte nativo de anidación CSS.
  - Implementación de React Router Dom con rutas: `/login`, `/profile`, `/admin`.
  - Estructura de carpetas limpia: `components/Layout`, `pages`.
  - Layout reutilizable con Header, Main y Footer.
  - `AuthProvider` integrado en el entrypoint (contexto de auth disponible en toda la app).
  - Login conectado contra `jwt-ej1` (obtiene `token` + `userData`, guarda en `localStorage` y navega a `/profile`).
  - Header reacciona a `user` (muestra saludo y logout) y hace `console.log` cuando cambia el estado.
  - `Profile` refactorizado para consumir el perfil usando `apiFetch` (menos duplicación de fetch/headers/errores).
  - `LoginForm` ajustado para guardar errores con `setError` y mostrarlos en UI (en vez de solo loguear).
  - `AuthContext` en refactor: lectura inicial desde `localStorage` con lazy init + helper `apiFetch` con refresh/retry (pendiente cerrar lint y detalles).

## 3. Estado Actual 🚧

- Tenemos una API de Productos totalmente funcional y **persistente** (datos en PostgreSQL vía Supabase).
- El código está limpio, modular, tipado y separado por responsabilidad (controllers, routes, middlewares, types).
- El sistema de autenticación con JWT está funcionando en dos contextos:
  - API principal de productos (auth básica para proteger rutas de escritura).
  - Mini‑proyecto `jwt-ej1` centrado en JWT avanzado (expiración, refresh, roles, admin‑only).
- **Frontend (Auth Dashboard):**
  - Estado global de auth implementado con Context API (`user`, `token`, `login`, `logout`) + persistencia en `localStorage`.
  - `hydration` / inicialización desde `localStorage`: en transición a lazy init para evitar redirecciones falsas al recargar rutas privadas.
  - Flujo de login funcional (frontend ↔ backend) y logout funcional (limpia estado + storage).
  - `ProtectedRoutes` conectado en el router para proteger `/profile`.
  - `AdminProtectedRoutes` implementado y conectado para proteger `/admin` por rol (UX “Sin permisos”).
  - `Profile` ya consume `/api/auth/profile` y maneja `loading/error/data` usando `apiFetch` del contexto.
  - URL del backend movida a `VITE_API_URL` (Vite) en `Profile` y `LoginForm`.
  - Pendiente: cerrar errores de lint de Fast Refresh en auth (separación/ajuste de `useAuth`) y pulir `apiFetch` (tipado + retry).
- **Backend (`jwt-ej1`):**
  - `login` devuelve `userData` seguro (sin `password`).
  - `profile` devuelve `userData` seguro usando `select` (sin `password`).
  - `adminCheck` valida `payload.role` y devuelve 403 cuando falta rol admin.
  - `refresh` valida existencia de usuario usando `payload.id`.

## 4. Próximos Pasos (Hoja de Ruta: Profundizar en DB + Auth + Frontend) 🗺️

1. **Roles y autorizaciones en API principal:** Llevar el modelo de roles (`user` / `admin`) y el patrón `adminCheck` del mini‑proyecto `jwt-ej1` a la API de productos en Supabase.
2. **Asociar productos a usuarios:** Guardar `userId` en la tabla de productos para saber el “owner” real y limitar edición/borrado solo al creador o admin.
3. **Validaciones y errores:** Mejorar manejo de errores, validaciones de entrada y mensajes de respuesta (por ejemplo usando una capa de validación tipo Zod/JOI en los controladores).
4. **Tests básicos:** Crear pruebas de integración para login, rutas protegidas, flujo de refresh y restricciones de rol.
5. **Mini‑proyecto React “Auth Dashboard” (Lógica):**
   - Consolidar `apiFetch` en `AuthContext` para no repetir `fetch + Bearer + parse + errores` (🟡 base hecha, falta pulir lint/tipos).
   - Implementar refresh real en frontend: 401 `"Token expirado"` → `/api/auth/refresh` → retry 1 vez → si falla `logout` (🟡 base en `apiFetch`, falta cerrar detalles).
   - Reutilizar `apiFetch` en `Profile` (✅ hecho) y luego en el resto de requests.
   - Normalizar UX de errores (401 → login, 403 → “Sin permisos”).
   - Limpiar logs de debug (`Header`, `LoadingSpinner`) cuando el flujo esté cerrado.
6. **Mapa mental del proyecto:** Mantener actualizado el documento `MAPA_MENTAL_AUTH.md` para recordar cómo encaja cada pieza.
7. **Preparar salto a Next.js:** Dejar APIs listas para ser consumidas desde Next.js, incluyendo:
   - Manejo de tokens en el cliente (almacenamiento seguro).
   - Uso de `/refresh` para renovar sesión sin re‑loguear al usuario.

## 5. Notas Técnicas (para la próxima sesión) 🧩

- `auth-dashboard/src/context/AuthContext.tsx`: al añadir `apiFetch`, mantener el Context consistente (type vs provider value) y evitar placeholders que no se usan.
- `auth-dashboard/src/components/Layout/ProtectedRoutes.tsx`: `hydration` debe decidir si “puedo decidir” (loading) antes de redirigir.
- `jwt-ej1`: mantener 401 para “no autenticado” y 403 para “autenticado sin permisos”.
