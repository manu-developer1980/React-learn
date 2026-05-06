# Mapa Mental — Auth Dashboard (React + JWT)

## Tabla de contenidos

1. [Objetivo](#objetivo)
2. [Mapa general (de fuera hacia dentro)](#mapa-general-de-fuera-hacia-dentro)
3. [Flujos principales](#flujos-principales)
4. [Checklist para crear una app nueva](#checklist-para-crear-una-app-nueva)
5. [Reglas prácticas](#reglas-prácticas)
6. [Archivos clave en este repo](#archivos-clave-en-este-repo)

---

## Objetivo

Entender cómo se conectan las piezas de una app React con autenticación JWT para poder reproducir el patrón desde cero:

- Rutas públicas vs privadas
- Sesión global (user/token)
- “Porteros” (guards) para rutas protegidas y roles
- Consumo de API con `Authorization: Bearer <token>`
- Manejo de expiración (refresh) sin duplicar lógica

---

## Mapa general (de fuera hacia dentro)

### 1) Router (React Router)

**Qué es:** el GPS de la app (decide qué pantalla se ve según URL).  
**Por qué existe:** quieres URLs reales, navegación y “pantallas” separadas (`/login`, `/profile`, `/admin`).

**Qué responsabilidades tiene:**

- Definir rutas públicas (ej. `/login`)
- Definir rutas privadas (ej. `/profile`, `/admin`)
- “Enchufar” los porteros (guards) en las rutas privadas

**Qué NO hace:** no es seguridad real (el frontend se puede manipular). Es UX y estructura.

---

### 2) Providers en el entrypoint (`main.tsx`)

**Qué es:** el lugar donde inyectas “servicios globales” que toda la app necesita.  
**Por qué existe:** evita prop drilling y hace que cualquier componente pueda leer sesión (`useAuth()`).

Regla: si algo debe estar disponible “en toda la app”, va como Provider arriba de Router/App.

---

### 3) AuthContext / AuthProvider (estado de sesión)

**Qué guarda típicamente:**

- `user`: quién soy (datos seguros)
- `token`: credencial JWT
- `login(token, userData)`: setea estado + persiste en storage
- `logout()`: limpia estado + storage
- `hydration`: “ya leí storage, ya puedo decidir”

**Por qué existe `hydration`:**

- En el primer render, `user` suele ser `null`
- Luego, con `useEffect`, rehidratas desde `localStorage`
- Si decides demasiado pronto (sin hydration), rediriges a login por error en recargas

---

### 4) Guards / Porteros (ProtectedRoutes / AdminProtectedRoutes)

**Qué son:** componentes que deciden si dejas pasar a una ruta o rediriges/muestras bloqueo.

**Orden mental correcto:**

1. Si `hydration` es `false` → todavía no decidas (loading)
2. Si `hydration` es `true` y `user` es `null` → redirige a `/login` (no autenticado)
3. Si `hydration` es `true` y hay `user` → deja pasar
4. Para admin: además, si `user.role !== "admin"` → “Sin permisos” (403 UX)

**Regla clave:** guard de rol en frontend = UX. Seguridad real = backend.

---

### 5) Páginas (Login / Profile / Admin)

**Qué hacen:** UI + casos de uso (lo que el usuario “vive”).

- **Login**
  - Llama a `POST /api/auth/login`
  - Recibe `{ token, userData }`
  - Ejecuta `login(token, userData)`
  - Navega a `/profile`

- **Profile**
  - Llama a `GET /api/auth/profile`
  - Header: `Authorization: Bearer <token>`
  - Estados UI: loading / error / data
  - Si 401: normalmente `logout()` (luego entra refresh)

- **Admin**
  - Es UI “especial”
  - Además del guard de auth, aplica guard de rol

---

### 6) Backend (autoridad real)

**Qué hace:** valida tokens y decide permisos.  
**Por qué importa:** el frontend no puede proteger datos de verdad.

**Semántica de HTTP (muy importante):**

- **401 Unauthorized:** no autenticado (sin token / token inválido / token expirado)
- **403 Forbidden:** autenticado, pero sin permisos (rol incorrecto)

**Regla de oro:** nunca devolver `password` al frontend (ni hasheada).

---

### 7) Refresh (sesión continua)

**Qué es:** pedir un token nuevo sin re-login cuando el token expiró.

**Flujo mental:**

1. Haces request a un endpoint protegido
2. Si recibes 401 y el backend indica “Token expirado”
3. Llamas a `POST /api/auth/refresh` con el token expirado (en Authorization)
4. Si vuelves con token nuevo: lo guardas y reintentas la request original una vez
5. Si falla: logout

**Regla anti-bucle:** máximo 1 retry por request.

---

## Flujos principales

### Flujo 1 — Login

1. Usuario envía email/password
2. Backend valida credenciales
3. Backend responde token + userData seguro
4. Frontend guarda sesión (context + localStorage)
5. Router te lleva a `/profile`

---

### Flujo 2 — Entrar a `/profile` (ruta protegida)

1. Router entra en `/profile`
2. Guard revisa `hydration`
3. Si hay sesión, deja pasar
4. Profile llama API con Bearer token
5. Renderiza loading → data o error

---

### Flujo 3 — Entrar a `/admin` (rol)

1. Guard de auth: ¿hay sesión?
2. Guard de rol: ¿role === "admin"?
3. Si no: “Sin permisos” (403 UX) o redirección a una ruta segura

---

### Flujo 4 — Token expirado (con refresh)

1. Request protegida devuelve 401 “Token expirado”
2. Helper central intenta refresh
3. Si refresh ok: setea token nuevo y reintenta
4. Si refresh falla: logout

---

## Checklist para crear una app nueva

1. Crear rutas públicas/privadas en Router
2. Montar AuthProvider en el entrypoint
3. Implementar AuthContext: `user/token/login/logout/hydration`
4. Crear guards: auth + rol (si aplica)
5. Implementar Login (fetch + persistencia)
6. Implementar Profile (fetch con Bearer + estados UI)
7. Asegurar backend: 401/403 correctos + DTO seguro (sin password)
8. (Opcional) Centralizar fetch + refresh+retry en helper

---

## Reglas prácticas

- “Sé quién soy” (user) y “prueba de sesión” (token) son conceptos distintos.
- `localStorage` es cache, no fuente de verdad.
- Backend manda: el frontend solo mejora UX.
- Un guard nunca debe decidir antes de hydration.
- Si algo se repite (fetch+Authorization+parse+errores), primero repítelo 2-3 veces y luego abstrae a helper.

---

## Archivos clave en este repo

### Frontend (`auth-dashboard`)

- Entry: `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/main.tsx`
- Router: `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/App.tsx`
- AuthContext: `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/context/AuthContext.tsx`
- Guards:
  - `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/components/Layout/ProtectedRoutes.tsx`
  - `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/components/Layout/AdminProtectedRoutes.tsx`
- Pages:
  - `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/pages/Login.tsx`
  - `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/pages/Profile.tsx`
  - `/Users/manqui/Documents/Projects/React learn/auth-dashboard/src/pages/Admin.tsx`

### Backend (`jwt-ej1`)

- Rutas: `/Users/manqui/Documents/Projects/React learn/jwt-ej1/src/routes/authRoutes.ts`
- Controller: `/Users/manqui/Documents/Projects/React learn/jwt-ej1/src/controllers/authController.ts`
- Middlewares:
  - `/Users/manqui/Documents/Projects/React learn/jwt-ej1/src/middlewares/tokenCheck.ts`
  - `/Users/manqui/Documents/Projects/React learn/jwt-ej1/src/middlewares/adminCheck.ts`

