# Guía de Implementación Paso a Paso: iGaming MicroSaaS Widget

Esta guía detalla el proceso de desarrollo secuencial para construir el plugin. Está diseñada para ser seguida por un desarrollador (tu marido) y una diseñadora (tú) trabajando en paralelo.

---

## Fase 1: Configuración y Estructura Base (Semana 1)

**Objetivo:** Tener el plugin instalado y activado en un entorno local, con la estructura de archivos correcta.

### Paso 1.1: Entorno de Desarrollo

- [ ] Instalar **LocalWP** (o XAMPP) en el ordenador.
- [ ] Crear un sitio nuevo en LocalWP llamado `igaming-dev`.
- [ ] Configurar Git en la carpeta `/wp-content/plugins/`.

### Paso 1.2: "Scaffolding" del Plugin

- [ ] Crear carpeta `igaming-widget` dentro de `plugins`.
- [ ] Crear archivo principal `igaming-widget.php` con las cabeceras estándar de WP.
- [ ] Crear estructura de carpetas:
  - `/includes` (Lógica PHP: CPTs, Scrapers)
  - `/assets` (CSS, JS, Imágenes)
  - `/templates` (HTML/PHP para el frontend)
  - `/admin` (Configuración en el dashboard)

### Paso 1.3: Control de Versiones

- [ ] Inicializar repositorio Git (`git init`).
- [ ] Crear `.gitignore`.

---

## Fase 2: Backend SaaS (Tu "Mente" en Next.js) (Semana 2)

**Objetivo:** Crear la API que renderizará los widgets.

### Paso 2.1: Setup Next.js

- [ ] `npx create-next-app@latest igaming-backend`.
- [ ] Configurar base de datos (PostgreSQL/Supabase).
- [ ] Crear modelo `Casino` en Prisma/Drizzle.

### Paso 2.2: Endpoints de Renderizado

- [ ] Crear ruta API: `/api/render/table`.
- [ ] Esta ruta debe recibir parámetros (`?crypto=BTC`) y devolver un **JSON** con dos claves:
  - `html`: El string HTML pre-renderizado de la tabla.
  - `css`: Los estilos necesarios (si no usas Tailwind global).
  - `js`: URL del script de hidratación.

### Paso 2.3: Sistema de Suscripción (Stripe + Supabase)

- [ ] **Configuración Stripe**:
  - Crear productos en Stripe Dashboard: Starter, Pro, Agency.
  - Obtener claves API (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).
- [ ] **Base de Datos (Supabase)**:
  - Crear tabla `subscriptions` vinculada a `auth.users`.
  - Habilitar RLS (Row Level Security) para que cada usuario solo lea su licencia.
- [ ] **Webhook Handler**:
  - Crear ruta `/api/webhooks/stripe`.
  - Instalar librería `stripe` y `micro` (para leer el raw body).
  - Escuchar evento `checkout.session.completed`.
  - Lógica: Generar UUID (`crypto.randomUUID()`), insertarlo en `subscriptions` junto con `customer_id` y `plan_id`.
- [ ] **Seguridad de API**:
  - Actualizar el Middleware para consultar la tabla `subscriptions` y verificar `status === 'active'` antes de servir el widget.

### Paso 2.4: Scraper System

- [ ] Crear script en Node.js (dentro de Next.js API Routes o Worker separado) que actualice la DB de casinos diariamente.

---

## Fase 3: Plugin Cliente (El "Cuerpo" en WP) (Semana 3)

**Objetivo:** Un plugin ligero que solo pide y muestra datos.

### Paso 3.1: Shortcode Inteligente

- [ ] En `/includes/class-shortcode-remote.php`:
  - Función `render_remote_widget($atts)`.
  - Normalizar `$atts`.
  - Generar clave de caché única.
  - Verificar si existe `transient` con esa clave.
  - Si no, llamar a la API.
  - **SEGURIDAD**: Sanitizar la respuesta con `wp_kses_post($html)` antes de guardarla/mostrarla. Nunca confiar en el HTML externo ciegamente.
  - Guardar respuesta en `transient` por 1 hora.
  - Imprimir el HTML.

### Paso 3.2: Performance

- [ ] Asegurar que el `wp_remote_get` tiene un timeout bajo (3s) para no bloquear la web del cliente si tu API cae.
- [ ] Implementar "Fallback": Si falla la API, mostrar una versión cacheada antigua o un mensaje elegante.

### Paso 3.3: Panel de Configuración en WP Admin

- [ ] En `/admin/class-settings-page.php`:
  - Registrar página de configuración en el menú de WP (`add_options_page`).
  - Crear campo de entrada para la **API Key**.
  - Agregar botón AJAX para **borrar caché** (eliminar el transient).
  - Implementar selector de **contenido Fallback**.
  - Mostrar **Estado de Conexión**: Realizar un ping simple al backend Next.js al cargar la página y mostrar un indicador (Check verde / X roja).

---

## Fase 4: Interactividad y Filtros (Semana 4)

**Objetivo:** Implementar la lógica de filtrado en el cliente (navegador) para una experiencia instantánea.

### Paso 4.1: Componentes de UI (React)

- [ ] Crear componentes visuales para los filtros dentro de Next.js:
  - `FilterDropdown`: Para seleccionar categorías (ej: Crypto, Fiat).
  - `RangeSlider`: Para filtrar por Wagering (ej: 30x - 50x).
  - `ToggleSwitch`: Para opciones binarias (ej: "Solo Licencia ES").
- [ ] Implementar gestión de estado (`useState`, `useContext`) para controlar los filtros activos.

### Paso 4.2: Lógica de Hidratación Optimizada

- [ ] Instalar **TanStack Query** (React Query) en el frontend.
- [ ] Configurar endpoint público `/api/public/widgets/:id/data`.
- [ ] Usar `useQuery` para obtener el DTO sanitizado.
- [ ] **Aislamiento**: Encapsular los estilos del widget usando `Shadow DOM` o prefijos CSS únicos para evitar conflictos con el tema del cliente.

---

## Fase 5: Automatización y Datos Externos (Semana 6+)

**Objetivo:** Que los datos se actualicen solos.

### Paso 5.1: Integración API Crypto

- [ ] Conectar con CoinGecko API (gratuita).
- [ ] Crear Cron Job en WP (`wp_schedule_event`) que corra cada 12 horas.
- [ ] Guardar precios de BTC/ETH/SOL en `wp_options` para usarlos en conversores.

### Paso 5.2: Scraper Básico (Opcional Avanzado)

- [ ] Investigar estructura de una web objetivo (ej: un casino específico).
- [ ] Crear script PHP que lea el HTML de esa web y busque si el "Bono de Bienvenida" ha cambiado.
- [ ] Actualizar el campo `_casino_bonus_amount` automáticamente.

---

## Fase 6: Lanzamiento y Empaquetado

### Paso 6.1: Limpieza y Optimización

- [ ] Revisar que no haya `console.log` en JS ni `var_dump` en PHP.
- [ ] Minificar CSS y JS.

### Paso 6.2: Documentación de Usuario

- [ ] Crear un pequeño `README.txt` explicando cómo usar los shortcodes:
  - `[casino_list limit="5"]`
  - `[wagering_calculator]`

### Paso 6.3: Instalación en Producción

- [ ] Comprimir la carpeta en `.zip`.
- [ ] Instalar en vuestra web de nicho real.
