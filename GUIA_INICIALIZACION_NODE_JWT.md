# 🚀 Guía Rápida: Inicialización Proyecto Node + TypeScript + JWT

Esta guía condensada te acompaña para montar un proyecto mínimo en Node + TypeScript + Express con soporte para JWT, listo para practicar middlewares y autenticación. No ejecuta nada por ti: úsalo como checklist.

---

## ✅ Prerrequisitos

- Node.js y npm instalados
- macOS (comandos de generación de secreto usan pbcopy; en Linux/Windows hay alternativas)

---

## 1) Crear carpeta y proyecto

```bash
mkdir jwt-ej1 && cd jwt-ej1
npm init -y
```

---

## 2) Instalar dependencias

Runtime:

```bash
npm i express jsonwebtoken bcrypt dotenv cors
```

Desarrollo (TypeScript + tipos):

```bash
npm i -D typescript @types/node @types/express @types/jsonwebtoken @types/bcrypt @types/cors
```

Opción A (coherente con el curso): nodemon + ts-node

```bash
npm i -D ts-node nodemon
```

Opción B (alternativa): ts-node-dev

```bash
npm i -D ts-node-dev
```

---

## 3) Inicializar TypeScript

```bash
npx tsc --init
```

Ajustes recomendados en `tsconfig.json` (revísalos según tu preferencia):

- "target": "ES2020"
- "module": "CommonJS"
- "rootDir": "./src"
- "outDir": "./dist"
- "strict": true

---

## 4) Estructura mínima

```bash
mkdir src
touch src/index.ts
```

Contenido inicial sugerido para `src/index.ts` (estructura mínima):

```ts
// Minimal Express bootstrap (fill as you progress)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 5) Scripts en package.json

Elige una opción para el entorno de desarrollo:

Opción A (nodemon + ts-node):

```bash
npm pkg set scripts.dev="nodemon --watch src --exec ts-node src/index.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/index.js"
```

Opción B (ts-node-dev):

```bash
npm pkg set scripts.dev="ts-node-dev --respawn --transpile-only src/index.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/index.js"
```

---

## 6) Variables de entorno (.env)

Crear archivo `.env`:

```bash
touch .env
```

Generar secreto aleatorio para JWT (macOS):

```bash
openssl rand -base64 32 | pbcopy
```

Pegar en `.env`:

```
JWT_SECRET=<tu_secreto>
PORT=3000
```

Uso en código:

```ts
// Example env usage
const JWT_SECRET = process.env.JWT_SECRET!;
```

---

## 7) Arranque y build

```bash
npm run dev
npm run build
npm run start
```

---

## 8) Siguientes pasos (práctica JWT + middlewares)

- POST /login → firmar JWT con payload { userId, email [, role] } y expiración
- Middleware auth → leer Authorization: Bearer <token>, verificar y adjuntar datos a req
- Rutas protegidas → usar req.userId / req.email
- Roles opcionales → middleware `requireAdmin` que verifique `req.role`

---

## 8.1) Plantilla mental (pseudocódigo)

Login (POST /login):

```
recibir email y password
validar credenciales
si válido:
  payload = { userId, email, role? }
  token = sign(payload, secret, { expiresIn })
  responder { token }
si no válido:
  responder 401
```

Auth middleware:

```
leer header Authorization
si no existe o formato incorrecto:
  responder 401
extraer token de "Bearer <token>"
try:
  decoded = verify(token, secret)
  req.userId = decoded.userId
  req.email = decoded.email
  req.role = decoded.role
  next()
catch error:
  responder 401
```

Require admin:

```
si req.role !== "admin":
  responder 403
si es admin:
  next()
```

Ruta protegida (GET /profile):

```
aplicar auth
controlador usa req.userId / req.email
responder con datos del usuario autenticado
```

---

## 9) Extras opcionales (calidad de código)

ESLint + Prettier:

```bash
npm i -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier
```

Husky (hooks de git):

```bash
npm i -D husky
npx husky init
```

---

## 🧭 Notas rápidas

- Usa el mismo `JWT_SECRET` para `sign` y `verify`.
- Diferencia entre `401 Unauthorized` (no autenticado) y `403 Forbidden` (sin permiso).

---

## 🧱 Mapa de errores y respuestas recomendadas (JWT + middlewares)

- Sin header Authorization:
  - 401 Unauthorized
  - mensaje: "Missing Authorization header"
- Formato inválido (no 'Bearer <token>'):
  - 401 Unauthorized
  - mensaje: "Invalid Authorization format"
- Token ausente o vacío:
  - 401 Unauthorized
  - mensaje: "Token missing"
- Token malformado (no decodificable):
  - 401 Unauthorized
  - mensaje: "Invalid token"
- Token expirado:
  - 401 Unauthorized
  - mensaje: "Token expired"
- Firma inválida / secret incorrecto:
  - 401 Unauthorized
  - mensaje: "Invalid token signature"
- Token válido pero rol insuficiente:
  - 403 Forbidden
  - mensaje: "Insufficient permissions"
- Ownership fallido (no eres dueño del recurso):
  - 403 Forbidden
  - mensaje: "Resource not owned"
- Usuario del token no existe (si hay BD):
  - 401 Unauthorized
  - mensaje: "User not found"
- Recurso no existe (ej. producto):
  - 404 Not Found
  - mensaje: "Resource not found"
- Error inesperado en servidor:
  - 500 Internal Server Error
  - mensaje: "Internal server error"

Estructura JSON consistente sugerida:

```json
{
  "error": {
    "message": "Token expired",
    "code": "AUTH_TOKEN_EXPIRED"
  }
}
```

Buenas prácticas:

- No exponer stack trace ni detalles internos en producción.
- Mantener códigos HTTP correctos y mensajes cortos, claros y consistentes.
- Centralizar el manejo en un middleware de errores para respuestas uniformes.
