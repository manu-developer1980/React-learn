# Documentación Técnica: iGaming MicroSaaS Widget/Plugin

## 1. Resumen Ejecutivo

Desarrollo de un **Plugin para WordPress** orientado a la industria del iGaming y Cripto-casinos. El objetivo es proporcionar una suite de herramientas "No-Code" para afiliados que automatice la actualización de datos (bonos, cuotas, precios cripto) y ofrezca widgets visuales de alta conversión (calculadoras, comparadores) para nichos específicos (Crash Games, L2 Casinos, Provably Fair).

## 2. Alcance del Proyecto (Scope)

El sistema funcionará como un plugin centralizado que convierte una instalación estándar de WordPress en un portal de afiliación avanzado.

### Módulos Principales (Widgets):

1.  **Core Data Engine**: Sistema de importación y sincronización de datos.
2.  **Display System**: Shortcodes y Bloques (Gutenberg) para mostrar tablas y listas.
3.  **Interactive Widgets**: Herramientas de cálculo y simulación para el usuario final.
    - **Tabla Comparativa**: Comparador dinámico de bonos de criptocasinos.
    - **Calculadora de Wager**: Herramienta para calcular requisitos de apuesta.
    - **Live Scores**: Sistema de puntuaciones en vivo optimizado para SEO.
    - **Calculadora de ROI de Bonos**: Herramienta avanzada para calcular el retorno de inversión de bonos.

## 3. Requerimientos Funcionales

### 3.1. Arquitectura SaaS "Headless Wrapper" (Shadow DOM)

El sistema utiliza un enfoque de **"Cápsula Aislada"**. El sitio de WordPress actúa como un anfitrión (Host), pero el widget vive en su propio ecosistema protegido.

- **Componente Servidor (Next.js)**:
  - Genera el HTML inicial (SSR) para SEO.
  - Expone endpoints API que devuelven JSON + CSS crítico.
- **Componente Cliente (Plugin WordPress)**:
  - **Shadow DOM Wrapper**: El plugin inyecta un `div` contenedor y adjunta un *Shadow Root*.
  - **Aislamiento de Estilos**: Dentro del Shadow Root, los estilos globales del tema del cliente (TwentyTwenty, Elementor, Divi) **NO penetran**. Esto garantiza que tu diseño se vea *pixel-perfect* en cualquier web.
  - **Hydration**: React se "hidrata" dentro de ese Shadow DOM para dar interactividad.

### 3.2. Visualización y SEO

- **SEO Perfecto**: Al usar SSR en Next.js y servir el HTML estático a través de PHP, Google ve el contenido como si fuera nativo de la web.
- **Performance**: El procesamiento pesado lo hace tu servidor, no el hosting barato del cliente.

### 3.3. Widgets Interactivos (Filtros en Tiempo Real)

El valor diferencial no es solo mostrar datos, sino permitir que el usuario interactúe con ellos **dentro de la tabla**.

- **Aislamiento Total (Shadow DOM)**:
  - Para evitar que los estilos de la plantilla del cliente rompan tu diseño (y viceversa), el widget se renderizará dentro de un **Shadow DOM** o usando una técnica de CSS Modules con prefijos automáticos estrictos.
- **Estrategia Híbrida de Datos (Progressive Hydration)**:
  - **SEO (Server)**: Next.js renderiza el HTML estático inicial.
  - **Seguridad y Carga**: No se inyectan datos crudos en el HTML.
  - **Interactividad (Client)**: React usa **TanStack Query** para obtener los datos desde un endpoint público optimizado, desacoplado de la lógica de negocio sensible.
- **Tecnología**: React State + TanStack Query + Shadow DOM.

## 4. Requerimientos Técnicos

### 4.1. Esquema de Base de Datos (PostgreSQL / Supabase)

El backend SaaS gestionará la información centralizada. Este es el esquema relacional propuesto:

#### Tabla: `casinos`
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `name` | String | Nombre comercial (ej: "Stake") |
| `slug` | String | URL friendly (ej: "stake-casino") |
| `logo_url` | String | URL del logo en bucket S3/Supabase |
| `affiliate_link` | String | Tu link de tracking (Global fallback) |
| `primary_color` | String | Hex color para branding (ej: "#00b894") |
| `rating` | Float | Puntuación 0-5 (ej: 4.8) |
| `is_crypto` | Boolean | Si acepta criptomonedas nativas |
| `established_year` | Int | Año de fundación (Data de confianza) |

#### Tabla: `bonuses` (Relación 1:N con Casinos)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `casino_id` | UUID | Foreign Key -> casinos.id |
| `type` | Enum | `welcome`, `no_deposit`, `cashback`, `free_spins` |
| `amount_label` | String | Texto gancho (ej: "100% up to 1 BTC") |
| `wagering_req` | String | Requisito de apuesta (ej: "35x") |
| `min_deposit` | String | Depósito mínimo (ej: "$20") |
| `code` | String | Código promocional (ej: "BETWIDGETS") |

#### Tabla: `features` (Relación 1:N con Casinos)
*Etiquetas para filtrado rápido*
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `casino_id` | UUID | Foreign Key -> casinos.id |
| `label` | String | Característica (ej: "Instant Payouts", "No KYC") |
| `icon_key` | String | Identificador de icono (ej: "lightning", "shield") |

#### Tabla: `subscriptions` (Gestión SaaS)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `user_id` | UUID | Link a Auth Users |
| `license_key` | UUID | Key que el usuario pone en el Plugin WP |
| `plan` | Enum | `starter`, `pro`, `agency` |
| `status` | Enum | `active`, `past_due` |
| `allowed_domains` | Array | Lista de dominios permitidos (CORS) |

### 4.2. Stack Tecnológico

- **Backend SaaS (Tu Infraestructura)**:
  - **Framework**: **Next.js 14+** (App Router).
  - **Database**: PostgreSQL (Supabase o Neon).
  - **Cache**: Redis (Upstash) para Rate Limiting.
- **Plugin Cliente (Lo que instalas en WP)**:
  - **PHP 7.4+**.
  - **Lógica**: `wp_remote_get` + `set_transient`.

### 4.2. Flujo de Datos (Data Flow)

1.  **Renderizado Seguro (Server-to-Server)**: WP pide HTML a Next.js enviando su API Key privada.
2.  **Interactividad Pública (Client-to-Server)**: El navegador del usuario pide datos JSON a un endpoint público de Next.js. **IMPORTANTE**: Este endpoint NO usa API Key, sino que está protegido por **Rate Limiting** (IP based) y **CORS** estricto.

### 4.3. Seguridad y Licenciamiento

- **Split Auth Strategy**:
  - **Server-Side**: API Keys para autenticar al plugin de WP.
  - **Client-Side**: Origen (CORS) + Rate Limiting para proteger los datos JSON públicos. NUNCA exponer la API Key en el JS del cliente.
- **Sanitización**: El plugin de WP debe usar `wp_kses_post()` antes de imprimir cualquier HTML recibido para prevenir XSS.

### 4.4. Panel de Gestión en WordPress (Settings)

- **Propósito**: Configuración local del plugin "Wrapper".
- **Funciones**:
  - **Input para API Key**: Campo para validar la licencia SaaS.
  - **Gestión de Caché**: Botón para borrar manualmente el `transient` (caché local) y forzar una actualización inmediata desde el backend.
  - **Selector de Fallback**: Opción para definir qué mostrar si la API falla (HTML cacheado antiguo o un mensaje de error estilizado).
  - **Estado de Conexión**: Indicador visual (Verde/Rojo) que muestra si hay conexión exitosa con el Backend Next.js.
- **Nota Importante**: Este panel **NO** se usa para editar datos de casinos; esa gestión reside exclusivamente en el Backend SaaS.

### 4.5. Performance (WPO)

- **Carga Condicional**: Cargar scripts y estilos (JS/CSS) solo en las páginas donde se usa el shortcode/bloque.
- **Optimización de Imágenes**: Servir logos en WebP.
- **Core Web Vitals**: El CLS (Cumulative Layout Shift) debe ser 0. Los widgets deben tener altura reservada mientras cargan.

### 4.6. Sistema de Licenciamiento y Suscripción (Stripe + Supabase)

El sistema de monetización y control de acceso se basa en tres pilares: **Stripe (Pagos)**, **Supabase (Datos)** y **Next.js (Lógica)**.

1.  **Modelo de Suscripción (Stripe)**:
    - Se definen 3 Productos en Stripe con facturación anual/mensual:
      - **Starter (199€/año)**: Acceso básico, tablas estáticas, límite de 500 peticiones/día.
      - **Pro (499€/año)**: Widgets interactivos, API de precios cripto, 5,000 peticiones/día.
      - **Agency (999€/año)**: Marca blanca, dominios ilimitados, soporte prioritario.

2.  **Gestión de Licencias (Supabase)**:
    - Tabla `subscriptions`:
      - `user_id`: Link a la tabla `auth.users` de Supabase.
      - `stripe_customer_id`: ID del cliente en Stripe.
      - `stripe_subscription_id`: ID de la suscripción activa.
      - `status`: `active`, `past_due`, `canceled`.
      - `plan_tier`: `starter`, `pro`, `agency`.
      - `license_key`: UUID generado automáticamente al confirmar el pago (Webhook).
      - `allowed_domains`: Array de dominios donde se puede usar la Key.

3.  **Flujo de Alta (Webhook)**:
    - El usuario paga en Stripe Checkout.
    - Stripe envía evento `checkout.session.completed` a tu endpoint `/api/webhooks/stripe`.
    - Next.js verifica la firma del webhook, crea el usuario en Supabase (si no existe) y genera una nueva `license_key`.
    - Se envía un email al usuario con su Key y las instrucciones de instalación.

## 5. Metodologías de Desarrollo

### 5.1. Flujo de Trabajo

1.  **Entorno Local**: Usar **LocalWP** o **XAMPP**.
2.  **Control de Versiones**: **Git**. Repositorio con ramas `main` (producción) y `develop` (desarrollo).
3.  **Code Standards**: Seguir los _WordPress Coding Standards_ (PHPCS) para asegurar compatibilidad y seguridad.

### 5.2. Fases de Implementación (Roadmap Técnico)

- **Fase 1 (MVP)**: CPT de Casinos + Campos básicos + Shortcode de tabla simple.
- **Fase 2 (Automation)**: Scripts de importación (CSV/XML/Scraping básico) y Cron Jobs.
- **Fase 3 (Widgets)**: Desarrollo de la Calculadora de Wagering y Filtros AJAX.
- **Fase 4 (Release)**: Empaquetado, Licenciamiento (si se vende a otros) y Documentación.

## 6. Recursos y Herramientas

### Librerías y Frameworks

- **Scraping (PHP)**: [Goutte](https://github.com/FriendsOfPHP/Goutte) o [Symfony Panther](https://github.com/symfony/panther) (si se requiere JS rendering).
- **Interactividad**: [Alpine.js](https://alpinejs.dev/) (Ideal para widgets ligeros en WP).
- **Meta Boxes**: [Carbon Fields](https://carbonfields.net/) o [CMB2](https://github.com/CMB2/CMB2).

### APIs Útiles (Gratuitas/Freemium)

- **Cripto Precios**: [CoinGecko API](https://www.coingecko.com/en/api).
- **Gas Fees**: [Etherscan Gas Tracker API](https://etherscan.io/apis).

### Documentación Oficial

- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [React en WordPress (Gutenberg)](https://developer.wordpress.org/block-editor/)

### Herramientas de Diseño (Para ti)

- **Figma**: Para prototipar los widgets antes de programar.
- **Schema Markup Generator**: Para asegurar que las reviews tengan rich snippets (estrellitas en Google).
