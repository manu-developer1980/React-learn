Diseña todas las pantallas y componentes para un **widget embebible** de WordPress que compara **criptocasinos** con filtros en tiempo real. El objetivo es un diseño moderno, mobile-first y listo para producción, con variantes Light/Dark y enfoque fuerte en accesibilidad y rendimiento.

Contexto del producto
- Producto: Widget/Plugin “Comparador de Criptocasinos” para sitios de afiliados.
- Uso: Se inserta como shortcode/bloque en páginas de reseñas. Debe verse impecable dentro de cualquier tema WP (TwentyTwenty, Elementor, Divi).
- Arquitectura: HTML inicial servido por SSR (Next.js) + interactividad con React dentro de un Shadow DOM. Datos públicos vía JSON (sin claves en cliente).

Estilo visual
- Dirección estética: SaaS/fintech confiable (no “casino flashy”). Minimal, preciso, “clean data”.
- Paleta: base neutra (slate/gray), acento verde/teal para CTAs; usa una escala “semáforo” sutil para ratings/estados.
- Tipografía: Inter o equivalente moderna sans-serif.
- Variantes: Light y Dark consistentes.
- Microinteracciones: transiciones 150–300ms sin “layout shift”.

Modelo de datos (para mock)
Cada item “casino” incluye, al menos:
- id, name, logo_url, rating (0–5)
- bonus: amount_label (ej. “100% hasta 1 BTC”), wagering_req (ej. “35x”)
- min_deposit (string), license_region
- features[] (chips: “Retiradas rápidas”, “Sin KYC”, “Crypto”, “App”)
- payment_methods[] (icons)
- accepted_cryptos[] (BTC, ETH, SOL, USDT, USDC, LTC…)
- accepted_networks[] (BTC, Lightning, ERC20, TRC20, BEP20, Solana, Polygon, Base…)
- withdrawal_speed (min), no_kyc (bool)
- pros[] (2), cons[] (2)
- promo_code (para click-to-copy), affiliate_link, terms_link
Incluye cotizaciones cripto (mock) para conversión a fiat:
- crypto_quotes: base_currency (EUR) + quotes (BTC/ETH/SOL/USDT…) + last_updated_at
El widget debe poder mostrar “1 BTC ≈ €X” y “Actualizado hace X min”.
Incluye 8–12 filas mock variadas.

Pantallas a generar
1) Widget embebido — Desktop
- Header compacto: título “Comparativa de Criptocasinos”, subtítulo corto, “Última actualización”.
- Barra de filtros: búsqueda por texto; chips multi-select para features; filtro por crypto aceptada (icon chips); filtro por red (badge/select); slider o select para rating mínimo; botón “Reset”.
- Módulo “Crypto Ticker” visible y compacto: muestra 3–5 cotizaciones (BTC, ETH, SOL, USDT) y el timestamp (“Actualizado hace X min”).
- Tabla comparativa con columnas clave: 
  - Casino (logo + nombre), Rating (estrellas + número), Bonus (label + wagering + conversión fiat cuando aplica), Crypto (coins aceptadas), Redes (badges), Depósito mín., Pagos (icons), CTA (Visitar + Ver detalles).
- Pie con disclaimer/T&C (“Aplican T&C. Juego responsable.”).

2) Widget embebido — Mobile
- Cards apiladas (1 casino por card) con información esencial visible y detalles plegables (acordeón).
- Filtros en drawer/bottom sheet; CTA prominente dentro de cada card.
- En cada card: fila de iconos de coins aceptadas + chips de red principales; si hay más, “+N”.
- Mostrar conversión fiat del bono cuando aplica y un fallback claro si no hay cotización disponible.

3) Estado Loading
- Skeletons para header, filtros y filas/cards; reservar altura para evitar CLS.

4) Estado Empty
- Mensaje “No hay resultados con estos filtros” + sugerencias y botón “Reset filtros”.

5) Estado Error
- Mensaje controlado “No se pudo cargar la información” + botón “Reintentar”.
- Nota: si existe caché previa, mostrar “Mostrando datos guardados” (solo UI).

6) Modal/Panel de Detalle de Casino
- Abre desde “Ver detalles”. Contenido: logo, rating, bonus, pros/cons, redes y métodos de pago (icons), depósito mín., licencia/región, enlace a términos, CTA principal.
- Accesible: focus trap, cierre con ESC, navegación teclado, aria labels.

7) Admin WordPress — Ajustes del Plugin (Settings)
- Secciones y controles:
  - Licencia: campo “License Key” + estado (válida/inválida) + botón Guardar.
  - Fuente de datos: input “API Base URL” + toggle “Usar dataset local (dev)”.
  - Caché: selector TTL (5m/15m/60m) + botón “Vaciar caché” con confirmación.
  - Apariencia: tema (Light/Dark/Auto), densidad (compacta/normal), mostrar/ocultar columnas.
- Mensajes de validación y confirmación de guardado.

8) Admin WordPress — Diagnóstico/Estado (opcional)
- Último fetch con timestamp, estado de API (OK/Error), botón “Probar conexión”.
- Resumen de caché (activada/TTL) y logs mínimos (UI mock).

Componentes (biblioteca y tokens)
- Tokens: colores (primary/neutral/success/warn/error), tipografía, espaciado (4/8/12/16/24), radios, sombras.
- Componentes y estados: 
  - Button (primary/secondary/ghost), Input (text/search), Select/Slider, Chip/Badge, Tooltip, TableRow/Card, Modal, Skeleton, Alert/Notice.
  - Estados default/hover/active/disabled/focus con indicadores claros.
- Iconografía: set lineal consistente (pagos/redes/features).
Componentes cripto-nativos
- CryptoTicker: mini lista de cotizaciones (BTC/ETH/SOL/USDT) con “Actualizado hace X min”.
- CoinIconList: iconos de coins aceptadas por casino (con tooltip con el ticker).
- NetworkBadgeList: badges de redes (ERC20/TRC20/etc.) con prioridad visual para redes “baratas/rápidas”.
- FiatConversionLabel: muestra “≈ €X” cuando la cotización existe; si no, oculta sin romper layout.

Requisitos UX/A11y
- Contraste AA mínimo; focus visible; navegación por teclado completa.
- Tap targets ≥44px en mobile; no depender solo del color para los estados (rating/alertas).
- Microcopy en español, tono neutral y profesional.

Restricciones y notas de integración
- El widget vivirá dentro de un Shadow DOM; diseña como si estuviera aislado de estilos externos.
- Contenedor embed variable entre 320–1200px. Evitar headers voluminosos; diseño compacto y claro.
- Prever que en el futuro se hidrata con React y se alimenta por endpoint JSON público.
Estados específicos de cotización
- Si falla la cotización: mantener el UI estable, mostrar solo el valor en cripto y un indicador discreto “Cotización no disponible”.

Entrega esperada
- Todas las pantallas y sus variantes responsive (Desktop/Mobile) completas.
- Una “Component Overview” con todos los componentes y estados.
- Dos temas: Light y Dark. Usa tokens para que sea fácil de tematizar.
