# Especificación Funcional y Técnica — Widget/Plugin WordPress: Comparador de Criptocasinos

## 1. Resumen y Objetivo
Producto B2B para afiliados iGaming orientado específicamente a criptocasinos: un widget embebible que muestra una tabla comparativa con filtros en tiempo real, enfoque mobile-first, rendimiento y SEO. El diferenciador es cripto-nativo: soporte de criptomonedas por casino (coins y redes) y cotizaciones en tiempo real para convertir valores (ej.: “1 BTC ≈ €X”). El widget se distribuye como plugin de WordPress con encapsulación visual mediante Shadow DOM y opcionalmente como bloque Gutenberg/shortcode. Backend headless en Next.js genera HTML SSR y sirve JSON público para la interactividad.

## 2. Público y Casos de Uso
- Afiliados y publishers que necesitan tablas comparativas actualizadas y de alta conversión.
- Embeds en páginas de reseñas, tops y listados filtrables (ej.: “Casinos con retiros instantáneos”, “Sin KYC”, “Redes baratas”). 

## 3. Alcance V1 (MVP) y Fuera de Alcance
- Alcance MVP:
  - Widget de comparativa con filtros locales y dataset mock o JSON público.
  - Estados loading/empty/error y detalle modal.
  - Panel de ajustes WP: license_key (mock), API base URL, TTL caché, apariencia básica (tema y densidad), visibilidad de columnas.
  - SSR simple + endpoint JSON mínimo en Next.js (cuando toque Fase B/D).
- Fuera de alcance inicial:
  - Licenciamiento real (Stripe/Supabase), hardening avanzado, dashboards de analítica. Se definen para fases futuras.

## 4. Arquitectura de Alto Nivel
- Next.js (App Router):
  - Página SSR para HTML inicial del widget (SEO).
  - Endpoint público JSON con dataset mínimo; CORS estricto y rate limit en fases futuras.
- Plugin WordPress:
  - Shortcode/bloque que inyecta contenedor y adjunta Shadow Root.
  - Inserta HTML SSR y activa hidratación React dentro del Shadow DOM.
  - Caché local vía transients; fallback controlado.
- Cliente (React):
  - Hidratación y filtros en tiempo real sobre datos obtenidos desde JSON.

## 5. Modelo de Datos (V1)
Concentrado para el widget; la fuente final podrá derivarse de tablas “casinos”, “bonuses” y “features” del backend.

Campos por casino:
- id, name, slug
- logo_url (WebP/SVG)
- rating (0–5)
- bonus.amount_label, bonus.wagering_req, min_deposit
- features[] (ej.: “Retiradas rápidas”, “Sin KYC”, “Crypto”, “App”)
- payment_methods[] (icon keys)
- accepted_cryptos[] (BTC, ETH, SOL, USDT, USDC, LTC, etc.)
- accepted_networks[] (BTC, Lightning, ERC20, TRC20, BEP20, Solana, Polygon, Base, Arbitrum, Optimism, etc.)
- license_region (ej.: Curaçao/Anjouan)
- withdrawal_speed (min)
- no_kyc (bool)
- pros[] (2), cons[] (2)
- promo_code (para click-to-copy)
- affiliate_link (deep link trackeado)
- terms_link
- crypto_quotes:
  - base_currency: EUR o USD
  - quotes: mapa de ticker->precio (ej.: BTC->58200.12)
  - last_updated_at (ISO 8601)
- bonus_value_fiat:
  - amount_fiat_label (ej.: “≈ €58.200”)
  - uses_quote_ticker (ej.: BTC) o null si no aplica

## 6. Interfaz de Usuario (Vistas y Componentes)
Vistas:
- Widget embebido Desktop: header compacto, barra de filtros, tabla con columnas clave (Casino, Rating, Bonus, Features, Depósito mín., Pagos, CTA), disclaimer al pie.
- Widget embebido Mobile: cards apiladas, filtros en drawer/bottom sheet, CTA prominente.
- Loading: skeletons de filtros y filas/cards.
- Empty: mensaje con sugerencias y botón reset.
- Error: mensaje con reintento y nota de fallback si hay datos cacheados.
- Modal de Detalle: logo, rating, bonus, redes, métodos de pago, pros/cons, depósito mín., licencia, T&C y CTA.

Componentes base:
- Button (primary/secondary/ghost), Input (text, search), Select/Slider (rating), Chip/Badge (features/networks), Tooltip, TableRow/Card, Modal, Skeleton, Alert/Notice.
Componentes cripto-nativos:
- CryptoTicker (mini indicador “BTC €58.200” + timestamp “Actualizado hace X min”).
- CoinIconList (iconos de coins aceptadas por casino) y NetworkBadge (redes).
- FiatConversionLabel (convierte amount_label a estimación fiat cuando aplica).

Accesibilidad:
- Contraste AA, focus visible, navegación por teclado, cierre modal con ESC, roles/aria adecuados.

## 7. Filtros y Ordenación
- Búsqueda por texto en name/bonus/features.
- Filtros multi-select por features, cryptos aceptadas y redes.
- Filtro de rating mínimo.
- Ordenación por: rating desc (default), withdrawal_speed asc, min_deposit asc.
Ordenación opcional (futuro):
- “Mayor bono en fiat” (requiere cotizaciones disponibles).

## 8. Estados y Casuística
- Loading: skeleton sin saltar layout; altura reservada para evitar CLS.
- Empty: no results por filtros; reset rápido.
- Error: fallo de red/API; opción reintentar + uso último caché si disponible.
- Degradación gradual si faltan datos (ej.: sin logo → placeholder).

## 9. Reglas UX/A11y Clave
- Mobile-first real: tap targets ≥44px, filtros accesibles, CTA claro.
- No depender solo de color para rating/estados; acompañar con texto/icono.
- Microcopy en español, profesional y conciso.
- Sin shifts en hover; transiciones suaves (150–300ms).

## 10. Performance y SEO
- HTML SSR para contenido inicial indexable.
- Imágenes optimizadas (WebP/SVG); lazy para no críticas.
- Caché transients en WP para SSR y para datos JSON (TTL configurable).
- Caché de cotizaciones cripto separada de la caché de casinos:
  - refresco recomendado 1–5 minutos (configurable), usando cache server-side.
  - fallback: si falla la cotización, mostrar el valor cripto sin conversión fiat y mantener el último quote cacheado si existe.
- Reserva de espacio para evitar CLS; tiempos objetivo: TTI < 1s en embed típico, 0 errores a11y.

## 11. Seguridad
- Sanitización HTML en WP antes de imprimir (wp_kses_post).
- No exponer API keys en cliente; JSON público sin secretos, reforzado con CORS+rate limit en fases siguientes.
- Encapsulamiento visual con Shadow DOM para evitar colisiones de estilos.

## 12. Panel de Ajustes (WP)
Secciones y campos:
- Licencia: license_key (mock V1), estado simulado, botón Guardar.
- Fuente de datos: api_base_url, toggle “Usar dataset local (dev)”.
- Caché: TTL selector (ej.: 5m/15m/60m) + botón “Vaciar caché” (confirmación).
- Apariencia: tema Light/Dark/Auto, densidad (compacta/normal), visibilidad de columnas.
- Diagnóstico (opcional V1): último fetch, estado API, probar conexión.

## 13. Embebido, Theming e i18n
- El widget debe adaptarse a anchos 320–1200px.
- Temas Light/Dark/Auto. Tokens de color definidos (primary/neutral/success/warn/error), espaciado 4/8/12/16/24, radios y sombras.
- Textos externalizables para localización (ES como default).

## 14. Telemetría y Logs (mínimos, posteriores)
- Eventos básicos: vista del widget, interacción con filtros, clic en CTA.
- Reporte opt-in y anonimizado en fases futuras.

## 15. Roadmap por Fases
- Fase A (UI local): Componentes, lista mock, filtros, estados.
- Fase B (Next básico): endpoint JSON mínimo + página SSR.
- Fase C (Plugin WP básico): shortcode + settings + caché + fallback.
- Fase D (Conexión WP↔Next): SSR embebible y caché WP.
- Fase E (Shadow DOM + hidratación): aislamiento + filtros realtime.
- Fase F (Licencias Stripe + Supabase) y hardening.

## 16. Criterios de Aceptación (MVP)
- Renderiza 8–12 casinos mock en Desktop y Mobile con filtros funcionales.
- Muestra por casino las criptos aceptadas (coins) y permite filtrar por al menos 1 coin.
- Muestra cotización cripto en UI (ej.: BTC/EUR) con indicador de “actualizado hace X”.
- Estados loading/empty/error cubiertos y testeados.
- CTA abre enlace de afiliado en nueva pestaña; click-to-copy de promo_code cuando existe.
- Panel ajustes guarda y aplica api_base_url y TTL de caché; “Vaciar caché” invalida correctamente.
- Light/Dark consistentes; contrastes AA y focus visibles.
- SSR básico disponible y JSON público accesible cuando corresponda a su fase.

## 17. Dataset Mock de Referencia (recorte)
Ejemplo de objeto de casino (campos clave):

{
  "id": "stake",
  "name": "Stake",
  "logo_url": "/logos/stake.webp",
  "rating": 4.8,
  "bonus": { "amount_label": "100% hasta 1 BTC", "wagering_req": "35x" },
  "min_deposit": "€20",
  "features": ["Retiradas rápidas", "Crypto", "App"],
  "payment_methods": ["visa", "mastercard", "btc", "eth"],
  "accepted_cryptos": ["BTC", "ETH", "SOL", "USDT"],
  "accepted_networks": ["BTC", "Lightning", "ERC20", "Solana"],
  "license_region": "Curaçao",
  "withdrawal_speed": 15,
  "no_kyc": true,
  "pros": ["Soporte 24/7", "Retiros rápidos"],
  "cons": ["No PayPal", "Geo-restricciones"],
  "promo_code": "BETWIDGETS",
  "affiliate_link": "https://partner.stake.com/?a=XXXX",
  "terms_link": "https://stake.com/terms",
  "crypto_quotes": {
    "base_currency": "EUR",
    "quotes": { "BTC": 58200.12, "ETH": 3100.55, "SOL": 148.22, "USDT": 0.92 },
    "last_updated_at": "2026-04-09T10:15:00Z"
  },
  "bonus_value_fiat": { "amount_fiat_label": "≈ €58.200", "uses_quote_ticker": "BTC" }
}

## 18. QA Checklist
- Visual: iconos consistentes, bordes y sombras coherentes, sin saltos en hover.
- Interacción: todos los elementos interactivos con cursor-pointer y focus state.
- A11y: navegación teclado completa, roles/aria en modal y filtros, contraste AA.
- Rendimiento: imágenes optimizadas, caché activa, sin consultas redundantes.
- Embebido: prueba en contenedores de 320/768/1024/1440px, sin scroll horizontal.
