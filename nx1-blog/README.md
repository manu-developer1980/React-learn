This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Roadmap (NX1)

- [Objetivo](#objetivo)
- [Alcance](#alcance)
- [Pasos](#pasos)
- [Criterios-de-done](#criterios-de-done)
- [Notas-mentales](#notas-mentales)

### Objetivo

Construir un blog básico con App Router para practicar:

- Layout + navegación
- SSG (Home + Post `[slug]` desde dataset local tipado)
- SSR (página “Server-time”)

### Alcance

- Páginas:
  - `/` Home (SSG): lista de posts
  - `/posts/[slug]` Post (SSG): detalle de post
  - `/about` estática
  - `/server-time` SSR: hora del servidor
- Fuente de posts: dataset local tipado (sin CMS)
- Estilos: Tailwind básico

Fuera de alcance:

- Auth, roles, ISR, CMS, tests avanzados

### Pasos

1. Base App Router (layout)
   - `app/layout.tsx` con header y navegación (usar `next/link`)
2. Páginas estáticas de apoyo
   - `app/about/page.tsx`
3. SSR (Server-time)
   - `app/server-time/page.tsx` mostrando hora del servidor
4. Dataset local tipado
   - Definir `type Post`
   - Crear `posts: Post[]` (2–4 posts) con `slug` único
5. SSG Home + Post `[slug]`
   - Home: renderiza lista de `posts`
   - Post: renderiza detalle del post por `slug`
   - Generar rutas estáticas (paths) para los slugs
6. Validación final
   - `npm run build` debe pasar
   - `npm run lint` debe pasar

### Criterios de Done

- Navegación completa y layout visible en todas las páginas.
- SSG funcionando: build genera Home y Post estáticos.
- SSR funcionando: Server-time renderiza en servidor.
- Tipos TS correctos en datos de `Post` (sin `any`).

### Notas mentales

- `layout.tsx` define “marco común” (header/footer). `page.tsx` define el contenido de la ruta.
- SSR: se calcula en servidor en cada request (útil para contenido que cambia siempre).
- SSG: se pre-genera en build (útil para contenido estable, como posts).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
