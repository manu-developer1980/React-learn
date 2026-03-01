# Estado Actual del Proyecto: API con BD + Auth JWT 🟢

¡Bienvenido al Backend! Hemos completado los fundamentos de Node y Express. Ahora vamos a por la persistencia de datos y la autenticación avanzada con JWT (roles, expiración, refresh).

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
  - Generación de JWT con `userId`, `userName`, `userEmail` y `userRole` en el payload.
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
    - Verifica el JWT y enriquece `req` con `userId`, `userName`, `userEmail`.
  - Middleware `adminCheck`:
    - Vuelve a verificar el token.
    - Comprueba `userRole` y solo permite acceso si es `"admin"`.
    - Usado para rutas donde solo un admin puede crear otros usuarios.
  - Tipo `AuthedRequest`:
    - Extiende `Request` con `userId`, `userName`, `userEmail`, `userRole` opcionales.
    - Permite tipar middlewares y controladores protegidos sin perder compatibilidad con Express.
- **Mini‑proyecto React “Auth Dashboard” (Setup Inicial):**
  - Proyecto inicializado con Vite + React + TypeScript.
  - Configuración de TailwindCSS v4 con soporte nativo de anidación CSS.
  - Implementación de React Router Dom con rutas: `/login`, `/profile`, `/admin`.
  - Estructura de carpetas limpia: `components/Layout`, `pages`.
  - Layout reutilizable con Header, Main y Footer.

## 3. Estado Actual 🚧

- Tenemos una API de Productos totalmente funcional y **persistente** (datos en PostgreSQL vía Supabase).
- El código está limpio, modular, tipado y separado por responsabilidad (controllers, routes, middlewares, types).
- El sistema de autenticación con JWT está funcionando en dos contextos:
  - API principal de productos (auth básica para proteger rutas de escritura).
  - Mini‑proyecto `jwt-ej1` centrado en JWT avanzado (expiración, refresh, roles, admin‑only).
- **Frontend (Auth Dashboard):**
  - Esqueleto de la aplicación funcionando.
  - Navegación entre páginas implementada.
  - Estilos base con TailwindCSS v4 listos.
  - Pendiente: Integración con API `jwt-ej1` y lógica de autenticación.

## 4. Próximos Pasos (Hoja de Ruta: Profundizar en DB + Auth + Frontend) 🗺️

1. **Roles y autorizaciones en API principal:** Llevar el modelo de roles (`user` / `admin`) y el patrón `adminCheck` del mini‑proyecto `jwt-ej1` a la API de productos en Supabase.
2. **Asociar productos a usuarios:** Guardar `userId` en la tabla de productos para saber el “owner” real y limitar edición/borrado solo al creador o admin.
3. **Validaciones y errores:** Mejorar manejo de errores, validaciones de entrada y mensajes de respuesta (por ejemplo usando una capa de validación tipo Zod/JOI en los controladores).
4. **Tests básicos:** Crear pruebas de integración para login, rutas protegidas, flujo de refresh y restricciones de rol.
5. **Mini‑proyecto React “Auth Dashboard” (Lógica):**
   - Implementar `AuthContext` para manejo de estado global de usuario.
   - Conectar con API `jwt-ej1` (`/login`, `/profile`, `/refresh`).
   - Proteger rutas privadas y restringir acceso a admin.
   - Manejar persistencia de sesión y renovaciones automáticas.
6. **Preparar salto a Next.js:** Dejar APIs listas para ser consumidas desde Next.js, incluyendo:
   - Manejo de tokens en el cliente (almacenamiento seguro).
   - Uso de `/refresh` para renovar sesión sin re‑loguear al usuario.
