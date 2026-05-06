export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
};

export const posts: Post[] = [
  {
    slug: "empezar-astrofotografia",
    title: "Cómo empezar en astrofotografía",
    excerpt:
      "Una guía sencilla para dar los primeros pasos fotografiando el cielo nocturno.",
    content:
      "Empezar en astrofotografía puede parecer complicado, pero no hace falta contar con un observatorio profesional para obtener resultados bonitos. Lo más importante al principio es entender el cielo, aprender a localizar objetos y dominar conceptos básicos como exposición, enfoque y seguimiento. Una cámara sencilla, un trípode estable y paciencia pueden ser suficientes para comenzar con paisajes nocturnos, la Vía Láctea o incluso algunas constelaciones. A medida que avanzas, descubres que cada mejora en el equipo abre nuevas posibilidades, pero también nuevos retos. La clave está en construir una base sólida y no obsesionarse con conseguir imágenes perfectas desde la primera noche. La práctica constante, el procesado y la observación son parte inseparable del aprendizaje.",
    date: "2026-04-10",
  },
  {
    slug: "errores-vialactea",
    title: "Errores comunes al fotografiar la Vía Láctea",
    excerpt:
      "Estos fallos pueden arruinar una sesión si no los tienes en cuenta.",
    content:
      "Fotografiar la Vía Láctea es uno de los objetivos más populares entre quienes se inician en astrofotografía, pero también uno de los que más errores acumula. Muchos principiantes disparan con demasiado tiempo de exposición y terminan con estrellas movidas, mientras otros no revisan el enfoque y descubren en casa que toda la sesión está blanda. También es frecuente subestimar la contaminación lumínica o no planificar la fase lunar, lo que reduce muchísimo el contraste del núcleo galáctico. Otro error habitual es levantar demasiado las sombras en el procesado, generando ruido agresivo y colores artificiales. La diferencia entre una imagen mediocre y una buena toma suele estar más en la planificación y en la técnica que en el precio del equipo. Con una metodología correcta, incluso una cámara modesta puede ofrecer resultados sorprendentes.",
    date: "2026-04-09",
  },
  {
    slug: "enfoque-clave",
    title: "Por qué el enfoque es clave en astrofotografía",
    excerpt: "Un pequeño error de enfoque puede arruinar horas de captura.",
    content:
      "En astrofotografía, el enfoque es uno de los aspectos más críticos y al mismo tiempo más fáciles de subestimar. A simple vista, una estrella desenfocada puede parecer aceptable en la pantalla de la cámara, pero al revisar la imagen en grande se convierte en un problema evidente. El punto de enfoque exacto no siempre coincide con lo que parece a simple vista, especialmente cuando la temperatura cambia durante la noche y altera el comportamiento óptico del equipo. Por eso muchos aficionados utilizan máscaras de Bahtinov, rutinas automáticas o revisiones periódicas entre capturas. Un enfoque preciso mejora la nitidez, reduce el tamaño estelar aparente y ayuda a revelar detalles finos en nebulosas y galaxias. Dedicar tiempo a este paso no es opcional: es una de las mejores inversiones de tiempo en cualquier sesión.",
    date: "2026-04-08",
  },
  {
    slug: "cielo-profundo",
    title: "Diferencias entre cielo profundo y paisaje nocturno",
    excerpt:
      "Dos ramas de la astrofotografía con técnicas y objetivos muy distintos.",
    content:
      "Aunque ambas disciplinas comparten el mismo cielo, la astrofotografía de cielo profundo y el paisaje nocturno son mundos bastante distintos. El paisaje nocturno busca integrar el firmamento con elementos terrestres, como montañas, árboles o edificios, y suele realizarse con objetivos angulares, exposiciones cortas y trípode fijo. En cambio, el cielo profundo se centra en objetos como nebulosas, galaxias o cúmulos, y normalmente requiere montura ecuatorial, guiado y tiempos de integración prolongados. También cambia mucho el procesado: en paisaje importa mantener un equilibrio visual con el entorno, mientras que en cielo profundo se trabaja intensamente la señal, el ruido y el contraste local. Comprender estas diferencias ayuda a elegir el equipo adecuado y a no frustrarse esperando resultados que pertenecen a otra categoría completamente distinta.",
    date: "2026-04-07",
  },
  {
    slug: "que-stacking",
    title: "Qué es el stacking y por qué mejora tus fotos",
    excerpt:
      "Apilar imágenes es una de las bases técnicas de la astrofotografía moderna.",
    content:
      "El stacking, o apilado de imágenes, consiste en combinar múltiples capturas del mismo objeto para aumentar la señal útil y reducir el ruido. Esta técnica es fundamental en astrofotografía porque el cielo nocturno ofrece muy poca luz y los sensores siempre introducen imperfecciones. Al apilar decenas o incluso cientos de subexposiciones, los detalles reales del objeto se refuerzan mientras el ruido aleatorio tiende a promediarse y disminuir. Esto permite obtener imágenes más limpias, con mejor rango dinámico y más capacidad de estirado en el procesado posterior. Además, el stacking facilita trabajar con exposiciones individuales moderadas, reduciendo el riesgo de perder una sesión completa por vibraciones, viento o errores puntuales. Entender bien esta técnica es uno de los grandes saltos de calidad para cualquier aficionado.",
    date: "2026-04-06",
  },
  {
    slug: "contaminacion-luminica",
    title: "Cómo afecta la contaminación lumínica a tus imágenes",
    excerpt: "La luz artificial puede limitar mucho más de lo que parece.",
    content:
      "La contaminación lumínica es uno de los mayores enemigos de la astrofotografía, especialmente cuando se intenta captar objetos débiles desde entornos urbanos o periurbanos. Las farolas, escaparates y núcleos urbanos generan un brillo de fondo que reduce el contraste del cielo y dificulta separar la señal del objeto astronómico. Esto se traduce en fondos más claros, colores extraños, gradientes difíciles de corregir y menor capacidad para sacar detalle fino. Aunque existen filtros y técnicas de procesado que ayudan a mitigar el problema, no hacen magia, y siempre será preferible un cielo oscuro. Aun así, no todo está perdido: ciertos objetos brillantes, la Luna, los planetas o nebulosas de emisión intensas siguen siendo objetivos viables desde zonas con contaminación moderada si se trabaja con cabeza y expectativas realistas.",
    date: "2026-04-05",
  },
  {
    slug: "montura-ecuatorial",
    title: "Ventajas de usar una montura ecuatorial",
    excerpt:
      "El seguimiento preciso cambia por completo lo que puedes fotografiar.",
    content:
      "Una montura ecuatorial es uno de los elementos que más transforma la experiencia en astrofotografía. Su principal ventaja es que compensa la rotación terrestre moviéndose sobre un solo eje, lo que permite mantener el objeto centrado durante exposiciones largas. Sin este seguimiento, las estrellas se convierten rápidamente en trazos y el potencial del equipo queda muy limitado. Además de mejorar la calidad de las imágenes, una buena montura permite aprovechar focales más largas, trabajar con guiado y acumular muchas horas de integración sin perder precisión. En la práctica, una montura estable suele ser más importante que tener un telescopio más grande o una cámara más cara. Muchos errores de principiantes vienen de invertir antes en óptica que en una base sólida de seguimiento.",
    date: "2026-04-04",
  },
  {
    slug: "objetos-principiantes",
    title: "Qué objetos del cielo profundo son ideales para principiantes",
    excerpt: "No todos los objetos son igual de agradecidos para empezar.",
    content:
      "Cuando uno empieza en cielo profundo, conviene elegir objetivos que ofrezcan buen tamaño aparente, brillo razonable y tolerancia a errores de seguimiento o enfoque. Nebulosas como Orión, Roseta, Norteamérica o la Laguna suelen ser elecciones muy agradecidas, especialmente con focales medias o cortas. También algunos cúmulos abiertos y galaxias brillantes pueden ser buenos candidatos según la época del año. En cambio, objetos pequeños y débiles como muchas galaxias lejanas suelen exigir más focal, mejor guiado y más horas de integración. Escoger bien el objetivo de cada sesión ahorra frustraciones y acelera el aprendizaje. En astrofotografía no gana quien apunta al objeto más espectacular del catálogo, sino quien sabe adaptar sus expectativas al equipo y al cielo disponible.",
    date: "2026-04-03",
  },
  {
    slug: "frames-calibracion",
    title: "La importancia de los frames de calibración",
    excerpt: "Darks, flats y bias ayudan a corregir defectos del sistema.",
    content:
      "Los frames de calibración son una parte esencial del flujo de trabajo astrofotográfico, aunque muchos principiantes los ven como una molestia innecesaria. Los darks ayudan a reducir ruido térmico y píxeles calientes, los flats corrigen viñeteo y motas de polvo, y los bias o equivalentes permiten modelar ciertas características de lectura del sensor. Cuando se usan correctamente, estas tomas mejoran mucho la calidad final del apilado y facilitan el procesado posterior. Ignorarlos puede traducirse en fondos irregulares, manchas difíciles de eliminar y pérdida de tiempo intentando corregir en software lo que debió hacerse en captura. Aunque cada flujo y cada cámara tienen sus matices, entender cuándo y cómo usar cada frame marca una diferencia real en consistencia y limpieza de las imágenes.",
    date: "2026-04-02",
  },
  {
    slug: "planificar-sesion",
    title: "Cómo planificar una sesión de astrofotografía",
    excerpt: "Una buena imagen empieza mucho antes de montar el trípode.",
    content:
      "Planificar una sesión de astrofotografía implica mucho más que mirar si va a hacer buen tiempo. Conviene revisar la fase lunar, la altura del objeto durante la noche, la previsión de nubes altas, el viento, la humedad y la dirección de la contaminación lumínica. También es importante decidir de antemano el encuadre, la duración de las subexposiciones, si habrá meridian flip, la estrategia de enfoque y la secuencia de calibración. Cuanto más claro esté todo antes de salir, menos energía mental se desperdicia bajo el cielo. La improvisación suele salir cara cuando el tiempo útil de oscuridad es limitado. Los astrofotógrafos más consistentes no son necesariamente los que tienen mejor equipo, sino los que preparan mejor cada sesión.",
    date: "2026-04-01",
  },
  {
    slug: "camaras-modificadas",
    title: "Cámaras modificadas para nebulosas de emisión",
    excerpt:
      "Retirar el filtro original puede mejorar mucho la sensibilidad al hidrógeno alfa.",
    content:
      "Muchas cámaras réflex de serie incorporan filtros que bloquean parte del espectro rojo profundo, incluyendo buena parte de la línea H-alfa emitida por numerosas nebulosas. Por eso, modificar una cámara para astrofotografía puede marcar una diferencia notable al capturar regiones de emisión. Con una cámara modificada, objetos como la nebulosa Roseta, California o la Norteamérica muestran estructuras mucho más intensas y ricas en detalle. Eso sí, la modificación también cambia el comportamiento del balance de blancos y puede requerir filtros adicionales o ajustes específicos para uso diurno. No es una decisión obligatoria para empezar, pero sí una mejora muy interesante para quienes quieren exprimir objetos de emisión sin dar el salto inmediato a una cámara astronómica dedicada.",
    date: "2026-03-31",
  },
  {
    slug: "guia-filtros",
    title: "Guía básica sobre filtros para astrofotografía",
    excerpt:
      "No todos los filtros sirven para lo mismo ni funcionan igual en cada equipo.",
    content:
      "Los filtros en astrofotografía cumplen funciones muy distintas según el tipo de objeto, el sensor utilizado y las condiciones del cielo. Algunos están diseñados para reducir parte de la contaminación lumínica, otros aíslan bandas concretas como H-alfa u OIII, y otros simplemente protegen o corrigen el tren óptico. Elegir mal un filtro puede empeorar el resultado en lugar de mejorarlo, especialmente si no se entiende qué señal deja pasar y cuál bloquea. Además, el rendimiento varía mucho según se use una cámara a color, monocroma, modificada o sin modificar. Por eso conviene evitar compras impulsivas y empezar comprendiendo bien el propósito de cada accesorio. Un filtro bien elegido puede convertir una noche mediocre en una sesión aprovechable.",
    date: "2026-03-30",
  },
  {
    slug: "reducir-ruido",
    title: "Cómo reducir el ruido en tus imágenes astronómicas",
    excerpt:
      "Hay formas de mejorar la limpieza de tus fotos sin destrozar el detalle.",
    content:
      "Reducir el ruido en astrofotografía no consiste únicamente en aplicar un filtro agresivo al final del procesado. La mejor estrategia empieza en la captura: sumar muchas horas de integración, exponer correctamente, controlar la temperatura del sensor cuando sea posible y trabajar con calibración adecuada. Después, en el procesado, hay que equilibrar la reducción de ruido con la preservación del detalle fino y de las estrellas pequeñas. Un exceso de suavizado deja las imágenes plásticas y artificiales, mientras que quedarse corto puede hacerlas parecer ásperas y pobres. El objetivo no es eliminar todo el ruido, sino gestionarlo de forma que no distraiga ni se coma la señal real. Cuanto mejor sea la base capturada, menos cirugía necesitará la imagen.",
    date: "2026-03-29",
  },
  {
    slug: "estrellas-alargadas",
    title: "Por qué las estrellas salen alargadas",
    excerpt:
      "El alargamiento estelar puede venir de varios problemas distintos.",
    content:
      "Cuando las estrellas aparecen alargadas en una imagen astronómica, no siempre significa lo mismo. A veces el problema está en un seguimiento deficiente o en una mala puesta en estación; otras veces puede deberse a tilt, flexiones mecánicas, backfocus incorrecto o incluso ráfagas de viento. La dirección y el patrón del alargamiento suelen dar pistas importantes: si es uniforme en todo el campo, probablemente el problema sea global; si empeora en los bordes o en una esquina concreta, hay que sospechar de la óptica o de la mecánica. Aprender a diagnosticar estas formas es una habilidad muy útil porque evita tocar veinte parámetros a la vez sin criterio. En astrofotografía, resolver problemas es parte del juego y casi siempre exige paciencia y método.",
    date: "2026-03-28",
  },
  {
    slug: "autoguiado-largo",
    title: "Beneficios del autoguiado en sesiones largas",
    excerpt: "Guiar bien permite sacarle mucho más rendimiento a la montura.",
    content:
      "El autoguiado consiste en utilizar una cámara secundaria para monitorizar una estrella de referencia y corregir en tiempo real los pequeños errores de seguimiento de la montura. Esta técnica es especialmente útil cuando se trabaja con focales medias o largas y se quieren hacer subexposiciones prolongadas. Aunque no convierte una montura modesta en una montura premium, sí mejora notablemente la consistencia y reduce el número de tomas arruinadas. También ayuda a compensar errores periódicos, pequeñas desalineaciones y otras imperfecciones mecánicas inevitables. Aprender a guiar bien implica entender parámetros como agresividad, histéresis, backlash o tiempo de exposición, pero una vez afinado el sistema, el salto de calidad suele ser muy evidente.",
    date: "2026-03-27",
  },
  {
    slug: "procesado-nebulosas",
    title: "Procesado básico para resaltar nebulosas",
    excerpt:
      "El procesado es donde la señal capturada empieza a convertirse en imagen.",
    content:
      "El procesado de una nebulosa no debería consistir en mover deslizadores al azar hasta que algo parezca vistoso. Lo primero es construir una base limpia con calibración y apilado correctos, y después trabajar el fondo, la neutralización, el estirado y el contraste de forma progresiva. A partir de ahí se puede potenciar la estructura interna de la nebulosa, separar mejor el color de las estrellas y controlar el ruido sin destruir la textura fina. Es fácil caer en la tentación de sobresaturar o forzar demasiado el contraste, pero eso suele generar imágenes estridentes y poco naturales. Un buen procesado no llama la atención por sus artificios, sino porque deja que el objeto destaque con coherencia visual y con un aspecto creíble.",
    date: "2026-03-26",
  },
  {
    slug: "sesion-humedad",
    title: "Qué hacer cuando hay humedad en la sesión",
    excerpt: "El rocío puede fastidiar una noche entera si no vas preparado.",
    content:
      "La humedad nocturna es un enemigo silencioso en astrofotografía porque puede empañar lentes, correctores, buscadores y cámaras sin que te des cuenta hasta que la imagen ya está degradada. En zonas húmedas o noches con fuerte enfriamiento, el rocío aparece con facilidad y obliga a tomar medidas preventivas. Las cintas calentadoras, parasoles y una buena gestión térmica del equipo ayudan mucho a evitar condensaciones. También conviene vigilar la previsión meteorológica y entender que una noche aparentemente despejada puede convertirse en una trampa si la humedad relativa sube demasiado. No hay nada más frustrante que perder horas de captura por no haber previsto un problema bastante común. La prevención aquí vale oro.",
    date: "2026-03-25",
  },
  {
    slug: "fotografiar-luna",
    title: "Fotografiar la Luna con equipo básico",
    excerpt:
      "La Luna es uno de los mejores objetivos para practicar técnica y procesado.",
    content:
      "La Luna es un objetivo excelente para quienes quieren iniciarse en astrofotografía sin complicarse con largas exposiciones o monturas avanzadas. Su brillo permite disparar con tiempos muy cortos, lo que reduce mucho las exigencias mecánicas y facilita obtener resultados nítidos incluso con equipo modesto. Además, es ideal para practicar enfoque preciso, encuadre, exposición y apilado de vídeo o ráfagas. Aunque parezca un objeto sencillo, la Luna también enseña mucho sobre contraste, relieve y procesado fino, especialmente cerca del terminador. Es un campo perfecto para aprender antes de dar el salto a planetaria más exigente o a cielo profundo.",
    date: "2026-03-24",
  },
  {
    slug: "primer-telescopio",
    title: "Cómo elegir tu primer telescopio para fotografía",
    excerpt:
      "No siempre conviene empezar con mucha focal ni con el tubo más grande.",
    content:
      "Elegir el primer telescopio para astrofotografía es una decisión que conviene tomar con cabeza, porque muchos errores vienen de empezar con configuraciones demasiado ambiciosas. Los tubos de focal corta o media suelen ser más tolerantes con el guiado, ofrecen encuadres agradecidos y hacen más llevadero el aprendizaje. En cambio, lanzarse de primeras a focales largas o tubos pesados puede convertir cada sesión en una lucha contra el seguimiento, el balanceo y la frustración. También hay que pensar en la relación entre el tubo, la montura, la cámara y el tipo de objetos que se quieren fotografiar. El mejor primer telescopio no es el más impresionante sobre el papel, sino el que más probabilidades tiene de darte resultados reales y repetibles.",
    date: "2026-03-23",
  },
  {
    slug: "paciencia-astrofoto",
    title: "Paciencia y constancia en astrofotografía",
    excerpt:
      "Una afición exigente donde el progreso llega sumando noches y experiencia.",
    content:
      "La astrofotografía es una disciplina que recompensa la paciencia como pocas aficiones técnicas. Hay noches que salen mal por nubes inesperadas, enfoque imperfecto, problemas de guiado o simples despistes, y eso forma parte del proceso. Mejorar no consiste solo en comprar mejor equipo, sino en repetir, comparar resultados, tomar notas y entender qué variable marcó la diferencia. Con el tiempo, se desarrolla una forma de trabajar más metódica y eficiente, y cada sesión deja de sentirse como una lotería. La constancia acaba pesando más que el entusiasmo puntual. Quien persevera aprende a leer el cielo, a leer su equipo y a disfrutar también del camino entre una imagen mediocre y una gran captura.",
    date: "2026-03-22",
  },
];
