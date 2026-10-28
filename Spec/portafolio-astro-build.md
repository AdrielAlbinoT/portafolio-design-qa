# Build: Portafolio de Adriel Albino Tasayco en Astro

Instrucciones para construir el sitio. Este archivo es la única fuente de verdad: contiene el contenido, el diseño, el comportamiento y el orden de trabajo. No inventes textos, cifras, enlaces ni proyectos que no estén aquí. Si falta algo, deja un marcador visible con el formato `[PENDIENTE: descripción]` y repórtalo al final.

---

## 1. Objetivo

Sitio personal de una sola página para Adriel Albino Tasayco, diseñador UI/UX, QA tester y gráfico digital. Debe mostrar sus proyectos, su experiencia y sus servicios, y permitir el contacto por formulario, correo o WhatsApp.

Principios:
- Mostrar el trabajo antes que el texto.
- Información necesaria, pero jerárquica y fácil de captar en pocos segundos. Frases cortas, un mensaje por bloque.
- Fondo oscuro y un solo color protagonista: verde lima.
- Estático por defecto. Solo el menú, los filtros, el diálogo de proyectos, el formulario y el fondo animado llevan JavaScript.
- Responsive completo, de 360px a 1920px, con imágenes y elementos que escalan con fluidez.

---

## 2. Stack

- **Astro** (versión estable actual), con `output: 'static'`.
- **Content Collections** de Astro con esquemas Zod para proyectos y experiencia.
- **astro:assets** (`<Image />` y `<Picture />`) para generar WebP y AVIF con `srcset`.
- **CSS plano** con variables (tokens). No usar Tailwind ni librerías de componentes.
- **JavaScript vanilla** dentro de `<script>` en los componentes que lo necesiten. No instalar React, Vue ni Svelte.
- **Despliegue en Vercel**, sin adaptador: salida estática.

Comandos de referencia:
```
npm create astro@latest portafolio -- --template minimal --typescript strict
npm run dev
npm run build
```

Variables de entorno:
- `PUBLIC_FORM_ENDPOINT`: URL del servicio de formularios (por ejemplo Formspree). Se define en `.env` y en Vercel. Si está vacía, el formulario muestra el mensaje de error de red y los datos de contacto.

---

## 3. Estructura de carpetas

```
src/
  components/
    Nav.astro
    Hero.astro
    HeroImage.astro
    About.astro
    Skills.astro
    Experience.astro
    Services.astro
    Qa.astro
    Projects.astro
    ProjectCard.astro
    ProjectDialog.astro
    Contact.astro
    ContactForm.astro
    Footer.astro
    SmokeBg.astro
  content/
    config.ts
    projects/        (un archivo .md o .json por proyecto)
    experience/      (un archivo por empleo)
  layouts/
    Base.astro
  pages/
    index.astro
  styles/
    tokens.css
    global.css
  assets/
    hero/            (hero-composicion.png, pendiente)
    projects/        (portada 4:3 por proyecto, pendiente)
    mockups/         (una carpeta por proyecto: src/assets/mockups/<slug>/, pendiente)
    brands/
public/
  favicon.svg
```

Las imágenes de `src/assets/mockups/` y `src/assets/projects/` las preparará el autor en carpetas. Mientras no existan, se usan los espacios de la sección 12.

---

## 4. Tokens y tipografía

Archivo: `src/styles/tokens.css`.

**Fuentes** (Google Fonts, cargadas en `Base.astro` con `display=swap`):
- Anton: display. Título del hero, títulos de sección, titulares de proyecto y botones grandes.
- Montserrat 400, 600 y 700: texto, subtítulo, navegación, formularios y etiquetas.
- Pila de respaldo: Anton → Impact → "Arial Narrow" → sans-serif. Montserrat → "Helvetica Neue" → Arial → sans-serif.

**Colores**

Fondo oscuro con un leve tono verde, nunca negro puro. Un único color de acento: verde lima.

```css
:root {
  --base: #121411;        /* fondo del sitio, oscuro, no negro */
  --surface: #1B1E19;     /* tarjetas y bloques */
  --surface-2: #242820;   /* tarjetas en hover y campos de formulario */
  --fg: #F3F5EE;          /* texto principal */
  --muted: #B5BBAA;       /* texto secundario, contraste AA sobre --base */
  --line: rgba(243, 245, 238, 0.14);
  --lime: #C6F432;        /* color principal */
  --lime-ink: #0E1103;    /* texto sobre cualquier superficie lima */
  --lime-soft: rgba(198, 244, 50, 0.14);
  --case-tint: #3A4232;   /* tono neutro verdoso para el humo de fondo */
  --gutter: clamp(16px, 4vw, 56px);
  --max: 1200px;
  --gap: clamp(14px, 2vw, 22px);
  --radius-card: 16px;
  --radius-pill: 999px;
  color-scheme: dark;
}
```

**Regla de contraste**
- Todo texto sobre una caja lima usa `--lime-ink`. Nunca blanco sobre lima.
- Todo texto sobre `--surface` o `--base` usa `--fg` o `--muted`.
- Los colores de cada caso (sección 12) solo se usan como franja o punto de 6px. No se usan como fondo de texto.
- Los íconos de las apps conservan sus colores originales, porque son marcas ajenas al sistema.

**Escala tipográfica**
- Título del hero: `clamp(44px, 9vw, 132px)`, Anton, una sola línea en LG y XL, mayúsculas, interlineado 0.95.
- Subtítulo del hero: `clamp(18px, 2.2vw, 26px)`, Montserrat 600.
- Título de sección: `clamp(44px, 7vw, 96px)`, Anton.
- Titular de proyecto: `clamp(28px, 3vw, 40px)`, Anton.
- Cuerpo: `clamp(16px, 1.2vw, 18px)`, Montserrat 400, interlineado 1.6. Máximo 3 líneas por bloque de texto.
- Etiqueta: 12px, Montserrat 700, mayúsculas, espaciado de letras 0.12em.

**Reglas**
- Nada de píxeles fijos en el contenido. Usar `%`, `vw`, `fr`, `clamp()` o `max-width`.
- Usar `aspect-ratio` en todo contenedor de imagen.
- `text-wrap: balance` en títulos.
- `overflow-wrap: anywhere` en correos y enlaces largos.

---

## 5. Breakpoints

| Nombre | Ancho | Columnas | Comportamiento |
|---|---|---|---|
| XS | 360–479px | 1 | Menú compacto, carruseles, sin rotaciones |
| SM | 480–759px | 1 | Tarjetas y formulario en una columna |
| MD | 760–1023px | 2 | Menú completo, dos columnas en proyectos y servicios |
| LG | 1024–1279px | 12 | Layout completo, flotantes activos |
| XL | 1280px o más | 12 | Contenido máximo de 1200px |

Usar `grid-template-columns: repeat(12, minmax(0, 1fr))` donde haga falta. Usar `minmax(0, 1fr)` para evitar desbordes.

---

## 6. Layout base

`Base.astro`:
- Idioma `es`. `<title>Adriel Albino Tasayco — Diseñador UI/UX y QA Tester</title>`.
- Meta description: "Diseñador UI/UX, QA tester y gráfico digital. Proyectos de apps, identidad de marca, diseño editorial y redes sociales."
- Meta viewport con `viewport-fit=cover`.
- Open Graph con título, descripción e imagen de la composición del hero.
- Favicon en `public/favicon.svg`: cuadrado verde lima con una "A" en `--lime-ink`.
- Renderiza `SmokeBg`, `Nav` y el `<main>` con las secciones en este orden: Hero, Sobre mí, Servicios, QA, Proyectos, Contacto. Después `Footer`.

---

## 7. Navegación flotante (`Nav.astro`)

**Posición**
- `position: fixed`, centrada horizontalmente.
- `top: calc(16px + env(safe-area-inset-top, 0px))`.
- Ancho máximo de 960px. Ancho de 92vw en móvil.

**Forma**
- Pastilla de 60px de alto, `border-radius: var(--radius-pill)`.
- Fondo `rgba(18, 20, 17, 0.7)`, `backdrop-filter: blur(12px)`, borde de 1px con `var(--line)`.

**Contenido en MD y más**
- Izquierda: "ADRIEL" en Anton, enlace a `#inicio`.
- Centro: Inicio, Sobre mí, Servicios, QA, Proyectos, Contacto.
- Derecha: botón "Hablemos" en fondo `--lime` con texto `--lime-ink`, enlace a `#contacto`.

**Contenido en XS y SM**
- Izquierda: "ADRIEL".
- Derecha: botón circular de 44px con ícono de menú, en `--lime`. Abre un panel debajo de la pastilla con los enlaces en columna.
- El panel se cierra al elegir un enlace, al presionar Escape o al hacer clic fuera.

**Comportamiento**
- Al bajar más de 80px, se oculta con `transform: translateY(-140%)` en 250ms. Al subir, reaparece.
- El enlace de la sección visible se marca con un punto de `var(--lime)` debajo del texto. Usar `IntersectionObserver`.
- Cada enlace tiene área táctil de 44px.

**Accesibilidad**
- `aria-expanded` en el botón del menú.
- `aria-current="true"` en el enlace activo.
- Foco visible en todos los elementos, con contorno de 2px en `--lime`.

**JavaScript**: vanilla, en un `<script>` del componente.

---

## 8. Fondo animado (`SmokeBg.astro`)

Capa fija detrás de todo (`position: fixed; inset: 0; z-index: -1`), con `pointer-events: none`.

**Base**
- Fondo `var(--base)`. Sin degradado de color de fondo.
- Una capa de viñeta: `radial-gradient(ellipse 60% 55% at 50% 50%, rgba(18,20,17,0.8), rgba(18,20,17,0.4) 60%, transparent)`, para que el texto siempre sea legible.

**Cuatro manchas de humo**, con `border-radius: 50%`, `filter: blur(90px)`. Solo tonos derivados del lima y del neutro verdoso, con mezcla normal y baja opacidad:

| Mancha | Color | Tamaño | Posición | Duración | Opacidad |
|---|---|---|---|---|---|
| Lima | `--lime` | 52vmax | izquierda, arriba | 26s | 0.14 |
| Lima suave | `--lime` | 60vmax | izquierda, abajo | 32s | 0.08 |
| Neutro | `--case-tint` | 50vmax | derecha, arriba | 24s | 0.6 |
| Lima tenue | `--lime` | 34vmax | derecha, abajo | 20s | 0.1 |

Cada mancha usa `radial-gradient(circle, color 0%, transparent 68–70%)`.

**Animación**
- `drift`: de `translate(0,0) scale(1) rotate(0)` a `translate(5vw,-4vh) scale(1.12) rotate(18deg)` a `translate(-4vw,5vh) scale(0.92) rotate(-14deg)`.
- `morph`: `border-radius` que alterna entre dos formas orgánicas, en 18s.
- Usar `transform` y `opacity`. No animar `filter` ni posición.

**Reacción al cursor**
- Un contenedor `.px` recibe las variables `--px` y `--py`, de -1 a 1, con interpolación suave (factor 0.05 por cuadro).
- El desplazamiento máximo es de 36px en X y 28px en Y.
- Desactivado en dispositivos táctiles (`(pointer: coarse)`).

**Móvil**: en XS se muestran solo dos manchas (lima y neutro).

**Reduced motion**: con `prefers-reduced-motion: reduce`, sin animación ni reacción al cursor. El fondo queda estático con las mismas manchas.

**JavaScript**: solo para la reacción al cursor, en un `<script>` del componente, cargado sin bloquear (`defer` o al final del body).

---

## 9. Hero (`Hero.astro` y `HeroImage.astro`)

Dos columnas en LG y XL (texto 1–6, imagen 7–12). En MD y XS se apilan: texto y luego imagen.

**Texto**
- Título principal: "DISEÑO UI UX". Una sola línea en LG y XL, en Anton, color `--fg`. Tamaño según la escala de la sección 4. Es el protagonista de la página, con el nombre como subtítulo.
- Subtítulo: "Adriel Albino Tasayco", en Montserrat 600, color `--lime`.
- Descripción (una sola frase): "Diseño experiencias digitales claras y probadas, donde la usabilidad y la estética conectan con las personas."
- Botones: "Ver proyectos" (enlace a `#proyectos`, fondo `--lime`, texto `--lime-ink`) y "Sobre mí" (enlace a `#sobre-mi`, contorno de 1px en `--line`, texto `--fg`).
- Fila de tres datos, con número en Anton `--lime`:
  - "4" — productos UI/UX
  - "3" — identidades de marca
  - "5" — áreas creativas

**Espacio de imagen (`HeroImage.astro`)**
- Un solo cuadro vacío que marca dónde va la imagen del hero. No lleva apps flotantes ni capturas.
- Contenedor 1:1 con `max-width: 620px`. En LG ocupa unos 560px. En MD se centra con 70vw. En XS, relación 4:3 con 92vw.
- Borde punteado de 2px en `--lime`, fondo `--surface`, y el texto centrado: "Espacio para imagen del hero", con la nota "Reemplazar por la composición final del hero".
- Sin animación ni parallax en este bloque.
- Imagen futura: `src/assets/hero/hero-composicion.png`, con `<Picture />` en WebP y AVIF, anchos de 480, 768 y 1024. Carga `eager`. Se usará una composición de 3 pantallas de un proyecto de app real, por confirmar. [PENDIENTE: elegir proyecto para el hero]

---

## 10. Sobre mí (`About.astro` y `Skills.astro`)

Dos columnas en LG. Una columna en el resto.

**Columna izquierda**
- Etiqueta: "Acerca de mí".
- Título: "Diseño con criterio".
- Fortalezas en pastillas con borde `--line`: Empatía · Compromiso · Responsabilidad · Autoaprendizaje.
- Idiomas en pastillas: Español (nativo) · Inglés (intermedio-avanzado). La pastilla destacada va en `--lime` con texto `--lime-ink`.

**Columna derecha**
- Nombre completo: Adriel Albino Tasayco.
- Cargo: Diseñador UI/UX | QA Tester | Gráfico Digital.
- Texto (tres frases como máximo por bloque, lenguaje concreto):
  - Diseño interfaces para apps y web que son fáciles de usar y se ven bien.
  - Pruebo lo que diseño: detecto bugs y problemas de usabilidad, los reporto en tickets y verifico que cada corrección quede funcional.
  - Trabajo en equipo con desarrolladores y clientes, con metodologías ágiles. [PENDIENTE: revisar textos finales con el autor]

**Software (`Skills.astro`)**: lista de herramientas sin porcentajes. Cada herramienta en una pastilla con borde `--line`.
- Diseño: Figma · Photoshop · Illustrator · Framer · Rive · Miró.
- Testing: [PENDIENTE: herramientas de QA que usa, por ejemplo Linear para tickets o las que domine].
- Los porcentajes se eliminan: no reflejan una medida real.

**Experiencia (`Experience.astro`)**: línea de tiempo vertical con línea en `--line`. El elemento actual va primero y lleva un nodo relleno en `--lime`. Después, en orden manual según el campo `order`. Los demás llevan un nodo con contorno. Formato del periodo: solo año, salvo que se decida agregar meses en todas las entradas.

1. **Sys, Sistemas y Soluciones** · Lima, Perú · 2024 – Actualidad
   - Rediseño UI/UX de los principales productos digitales de la empresa.
   - Pruebas de QA (funcionales, de regresión y de usabilidad) en web, Android e iOS.
   - Piezas de gran formato y merchandising para eventos corporativos.
   - Landing pages y concepto visual.
2. **FractalUp, All-in-One** · España · 2022 – 2026
   - UI/UX de la plataforma y Design System con componentes escalables.
   - Animaciones interactivas en Rive y landing pages.
   - Redes sociales e identidad corporativa.
3. **Disisoft (freelance)** · Perú · 2025
   - Rediseño UI/UX de la aplicación AnalitixGo.
   - Asesoría en diseño UI/UX para mejorar el impacto del producto y la experiencia de usuario.
   - Componentes UI reutilizables y Design System base.
4. **Festiva App (freelance)** · Noruega · 2023 – 2024
   - Interfaces móviles.
   - Recursos visuales y gráficos.
   - Design System base.

---

## 11. Servicios (`Services.astro`)

Título: "Qué hago". Seis tarjetas en `--surface`: tres columnas en LG, dos en MD, una en XS. Cada tarjeta tiene un número (01 a 06) en `--lime`, el título y una línea de descripción corta. La tarjeta 01 lleva un borde de 1px en `--lime`; el resto, `--line`.

1. **UI/UX Design**: interfaces para apps móviles y web, desde aplicaciones funcionales hasta landing pages.
2. **QA testing**: pruebas funcionales, de regresión y de usabilidad en web, Android e iOS.
3. **Editorial**: brochures, manuales, revistas y material editorial.
4. **Branding**: logotipos e identidades de marca completas.
5. **Digital Design**: flyers, banners, gráficos digitales y material para impresión.
6. **Social Media**: contenido gráfico para Instagram, YouTube, TikTok y otras plataformas.

---

## 12. Sección QA (`Qa.astro`)

Sección propia, entre Servicios y Proyectos. Muestra cómo trabaja el autor en calidad, con texto corto y visual.

Título: "Diseño y testing, juntos". Etiqueta: "QA testing".

**Tres pasos** en fila (una columna en XS), cada uno con número, título y una línea:
- **01 Detecto:** pruebas funcionales, de regresión y de usabilidad por módulo.
- **02 Documento:** cada hallazgo va en un ticket con pasos, resultado esperado y resultado obtenido.
- **03 Verifico:** reviso que la corrección quede funcional y propongo mejoras de experiencia y de UI.

**Plataformas**: Android · Web · iOS, en pastillas.

**Caso de referencia (texto)**: "Plataforma de gestión hotelera de housekeeping: aperturas de habitaciones, limpieza, progreso de tareas y órdenes de mantenimiento." Se puede mencionar en texto. Sin imágenes por ahora. [PENDIENTE: imágenes del caso, en `src/assets/mockups/clean-room/`, cuando el autor las tenga]

**Galería de ejemplo (opcional)**: un ticket de bug anonimizado en un bloque con borde `--line`: título, severidad, pasos, esperado y obtenido. [PENDIENTE: ejemplo real anonimizado]

Estilo: sin métricas inventadas. Si el autor aporta cifras, se agregan con su fuente.

---

## 13. Proyectos (`Projects.astro`, `ProjectCard.astro`, `ProjectDialog.astro`)

Título: "Trabajo seleccionado".

**Filtros**: Todos, UI/UX, Editorial, Brand Identity, Digital Design, Social Media. Pastillas con `aria-pressed`. La activa va en `--lime` con texto `--lime-ink`; las demás, con contorno `--line`.

**Cuadrícula**: tres columnas en LG, dos en MD, una en XS. Cada tarjeta sobre `--surface` tiene imagen 4:3, categoría en `--lime`, cliente y año en `--muted`, título y frase corta.

**Diálogo**: `<dialog>` nativo, fondo `--surface`. Muestra categoría, año, título, frase, bloque Problema (borde `--line`, texto `--fg`), bloque Solución (fondo `--lime` con texto `--lime-ink`), herramientas y, si existen, los mockups en galería. Se cierra con el botón, Escape o clic en el fondo. Al abrir, el foco va al botón de cerrar.

**Mockups en proyectos UI/UX**
- Cada proyecto UI/UX muestra de 3 a 4 pantallas en marco de teléfono, en una fila, o en escritorio/móvil para web.
- Flujo corto de 3 a 5 pasos cuando aplique.
- Antes y después cuando sea un rediseño.
- Ruta de archivos: `src/assets/mockups/<slug>/`. Mientras no existan, se muestra un bloque punteado con el texto "Mockup pendiente" y el número de pantallas esperadas.
- Trabajos de cliente sin permiso de publicación se marcan como "Concepto" o "Rediseño propio".

**Filtro y diálogo** van en el `<script>` de `Projects.astro`, no requieren framework.

**Contenido de proyectos**: vive en `src/content/projects/`. Cada archivo sigue el esquema de la sección 15.

**Textos cortos**: cada caso tiene frase, problema y solución de una línea cada uno. Sin párrafos largos en la tarjeta.

**Impacto**: el campo `highlight` es opcional. Solo se usa con un dato verificable: un paso de flujo que se redujo, un número de pantallas diseñadas o un tiempo de entrega. Sin cifras inventadas. [PENDIENTE: datos de impacto por proyecto, si el autor los confirma]

### Lista de proyectos

**UI/UX**
1. **InvenSys** · Gestión de inventarios · 2024 · Producto de SYS
   - Frase: Inventario al día, incluso sin conexión.
   - Problema: el stock en hojas de cálculo y mensajes genera errores y pérdidas.
   - Solución: escaneo, ubicaciones y sincronización en una sola app, también sin conexión.
   - Herramientas: Figma, Photoshop.
   - Dato destacado: 100% sincronizado.
   - Mockups: 3 a 4 pantallas (escaneo, ubicaciones, modo sin conexión).
2. **Festiva** · Entretenimiento · 2024
   - Frase: Descubre dónde está la fiesta.
   - Problema: eventos dispersos entre redes sociales y chats.
   - Solución: eventos, locales y artistas en una sola plataforma, con mapa y categorías.
   - Herramientas: Figma, Photoshop.
   - Mockups: 3 a 4 pantallas (inicio, mapa, detalle del evento).
3. **Cochera App** · Estacionamientos · 2024
   - Frase: Encuentra espacio antes de llegar.
   - Problema: poca información de disponibilidad, con congestión y tiempo perdido.
   - Solución: espacios disponibles, tickets con QR y tarifas claras para conductores y administradores.
   - Herramientas: Figma, Photoshop.
   - Mockups: 3 a 4 pantallas (búsqueda, disponibilidad, ticket QR).
4. **PlanSys Web** · Recursos Humanos · 2025 · Producto de SYS
   - Frase: Tu información laboral en un solo lugar.
   - Problema: préstamos, vacaciones y novedades repartidos en distintos sistemas.
   - Solución: panel centralizado para trabajadores y administradores.
   - Herramientas: Figma.
   - Mockups: escritorio y móvil, antes y después.

**Editorial**
5. **Todo a la luz** · Movimiento Tabú · 2020 – 2026
   - Frase: Hablar de lo que incomoda.
   - Problema: temas incómodos que se evitan en casa y en la iglesia.
   - Solución: revistas, artículos y folletos con estadísticas e infografías claras para padres.
   - Herramientas: diseño editorial.
   - Mockups: páginas de revista y folleto. [PENDIENTE: confirmar si puede mostrarse públicamente]

**Brand Identity**
6. **Gianca** · Restaurante · 2021
   - Frase: Postres, jugos y sándwich con identidad propia.
   - Problema: una marca nueva que debía verse cálida y reconocible en todos sus puntos de contacto.
   - Solución: logotipo, vaso, van de reparto y papelería completa.
7. **Carlos Ángel** · Agropecuaria
   - Frase: Identidad y tarjetas para una agropecuaria.
   - Problema: necesitaban una imagen clara y confiable para el campo.
   - Solución: identidad visual, tarjetas personales y flyer.
8. **D'Beto** · Bakery and Pastry
   - Frase: Bakery and pastry con carácter artesanal.
   - Problema: una panadería que debía verse artesanal y apetitosa en cada pieza.
   - Solución: identidad visual, tarjetas personales y flyer.

**Digital Design**
9. **Vida en Cristo** · Centro de Desarrollo Familiar
   - Frase: Banners para cada reunión de la semana.
   - Problema: cada actividad necesitaba una pieza clara y repetible.
   - Solución: serie de banners con horario visible y estilo unificado para proyección.
10. **Flyers y afiches** · Varios clientes
    - Frase: Piezas para eventos, aniversarios y graduaciones.
    - Problema: eventos de distinto tipo que necesitaban piezas propias.
    - Solución: flyers y afiches adaptados a cada tono, del cómic a la agenda semanal.

**Social Media**
11. **Keropi Plus · Miniaturas** · Podcast y noticias
    - Frase: Miniaturas de YouTube que invitan a dar clic.
    - Problema: videos que necesitaban destacar en un feed saturado.
    - Solución: miniaturas con tipografía fuerte, recortes y colores de contraste.
12. **Keropi Plus · Piezas para redes** · Noticias
    - Frase: Noticias y reacciones listas para publicar.
    - Problema: contenido que debía viralizarse en Instagram y Facebook.
    - Solución: flyers con formato de noticia y títulos de alto impacto.

**Imágenes de proyectos**: relación 4:3, en `src/assets/projects/`. Si no existen, usa un bloque `--surface` con el título en texto y una franja de 6px del color del caso.

Color de caso (franja de 6px, nunca de fondo de texto): InvenSys verde, Festiva coral, Cochera App violeta, PlanSys azul profundo, Todo a la luz coral, Gianca naranja, Carlos Ángel verde oscuro, D'Beto amarillo, Vida en Cristo cian, Flyers naranja, Keropi Miniaturas amarillo, Keropi redes coral.

---

## 14. Contacto (`Contact.astro`) y pie (`Footer.astro`)

### Sección Contacto
Título: "Trabajemos juntos". Dos columnas en LG.

- Texto: "Cuéntame sobre tu proyecto y te respondo pronto."
- Botón principal "Escríbeme" (lleva al formulario) y, debajo, una línea: "[PENDIENTE: tiempo de respuesta, por ejemplo 24 a 48 horas]".
- Filas con etiqueta, valor y acción, separadas por `--line`:
  - Correo: adriel.designstudio@gmail.com, botón "Copiar".
  - WhatsApp: +51 955 003 641, botón "Copiar".
  - Behance: behance.net/adrielalbino, enlace "Abrir" en nueva pestaña (`rel="noopener"`).
  - Instagram: @adrieloficial02, enlace "Abrir" en nueva pestaña (`rel="noopener"`).
- Los botones de copiar usan `navigator.clipboard.writeText` dentro del clic. Si falla, se selecciona el texto. El botón muestra "Copiado" durante 2 segundos.

### Pie de página
Fondo `--surface`, con borde superior `--line`. Dos columnas en LG: texto a la izquierda y formulario a la derecha. Una columna en el resto.

**Columna izquierda**
- Título: "Escríbeme".
- Texto: "Si tienes una idea, una marca o un proyecto en mente, cuéntamelo."
- Correo y WhatsApp como texto seleccionable.

**Formulario (`ContactForm.astro`)**

Campos en `--surface-2`, con borde `--line`. Foco con contorno de 2px en `--lime`. El botón "Enviar" va en `--lime` con texto `--lime-ink`.

| Campo | Tipo | Obligatorio | Validación |
|---|---|---|---|
| Nombre | text | Sí | 2 a 80 caracteres |
| Correo | email | Sí | Formato válido |
| Mensaje | textarea | Sí | 10 a 500 caracteres, con contador |
| `website` | text, oculto | No | Si tiene valor, descartar el envío sin mostrar error |

- `action` apunta a `PUBLIC_FORM_ENDPOINT`. Envío por `fetch` con `method: POST` y `Accept: application/json`.
- Validación en el cliente antes de enviar. Los errores aparecen debajo de cada campo, con texto claro, por ejemplo "Escribe un correo válido, como nombre@dominio.com".
- Estados: inicial; enviando (botón deshabilitado, texto "Enviando…"); éxito ("Gracias, recibí tu mensaje. Te respondo pronto.", el formulario se limpia); error de red ("No pudimos enviarlo. Escríbeme por correo o WhatsApp.", con los datos visibles).
- Si `PUBLIC_FORM_ENDPOINT` está vacío, el formulario muestra el error de red desde el inicio.
- Accesibilidad: `label` visible en cada campo, `aria-live="polite"` para mensajes, y foco en el primer campo con error.
- Sin formularios en iframes. Sin `mailto:` como acción principal.

**Barra inferior**
- "© 2026 Adriel Albino Tasayco. Todos los derechos reservados."
- Enlaces: Sobre mí, Servicios, QA, Proyectos, Contacto.
- Botón "Volver arriba" a `#inicio`.

---

## 15. Esquemas de contenido

`src/content/config.ts` con Zod:

**projects**
```
title: string
category: enum ['UI/UX', 'Editorial', 'Brand Identity', 'Digital Design', 'Social Media']
client: string
year: string
hook: string                 // frase corta, una línea
problem: string              // una línea
solution: string             // una línea
tools: string[]
highlight?: string           // solo dato verificable, opcional
accent: string               // un solo color hex, para la franja de 6px
cover?: image                // opcional, en src/assets/projects/
mockups?: string             // carpeta en src/assets/mockups/<slug>/, opcional
mockupCount?: number         // pantallas esperadas, para el marcador pendiente
order: number
```

**experience**
```
role: string
company: string
location: string
period: string               // "2024 – Actualidad", "2022 – 2026", "2025"
current: boolean             // true solo para el empleo actual
items: string[]              // máximo 3 por empleo
order: number                // orden manual; el current va primero
```

Regla de orden de experiencia: primero el elemento con `current: true`; después, todos los demás por `order` ascendente. El `startYear` ya no define el orden. Si un empleo tiene `current: true`, su nodo va relleno.

---

## 16. Imágenes y rendimiento

- Todas las imágenes pasan por `astro:assets`. Formatos AVIF y WebP, con PNG solo cuando hay transparencia.
- Pesos máximos: 250 KB por imagen de grilla, 600 KB para el hero.
- `loading="lazy"` en todo, excepto las imágenes del hero (`eager`).
- Cada imagen tiene `width`, `height` o `aspect-ratio` para evitar saltos.
- Fuentes con `display=swap` y `preconnect` a Google Fonts.
- El JavaScript total debe quedar por debajo de 15 KB. Sin librerías externas.
- Meta: Lighthouse de 90 o más en rendimiento, accesibilidad y SEO, en móvil.

---

## 17. Responsive

Probar en estos anchos, en vertical y horizontal: 360×780, 390×844, 412×915, 768×1024, 1024×1366, 1280×800, 1440×900, 1920×1080, 844×390.

Criterios:
- Sin desplazamiento horizontal en ningún ancho.
- La barra flotante no tapa el título del hero.
- El cuadro de espacio de imagen del hero no tapa el texto.
- Ninguna imagen se deforma.
- El título "DISEÑO UI UX" no se corta ni pasa de una línea en LG y XL.
- Los marcos de mockup no se salen del contenedor en XS.
- El formulario se completa con teclado y con pantalla táctil.

---

## 18. Accesibilidad

- Contraste AA en todo el texto. Verificar `--muted` sobre `--base` y `--lime-ink` sobre `--lime`.
- Ningún texto blanco sobre lima. Ningún texto lima sobre lima.
- Foco visible en todos los elementos interactivos.
- Orden de lectura del DOM correcto, aunque los elementos flotantes se vean en otra posición.
- Imágenes decorativas con `alt=""`. Imágenes de proyecto y mockups con texto alternativo descriptivo.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Las áreas táctiles tienen al menos 44px.

---

## 19. Despliegue

- Repositorio en GitHub.
- Proyecto en Vercel, detectado como Astro. Salida estática.
- Variable `PUBLIC_FORM_ENDPOINT` configurada en Vercel, en Production y Preview.
- Dominio: pendiente de confirmar.

---

## 20. Orden de trabajo

1. Crear el proyecto Astro con TypeScript estricto y verificar que `npm run build` funciona.
2. Configurar `tokens.css`, `global.css` y `Base.astro`, con las fuentes.
3. Crear `content/config.ts` y los archivos de proyectos y experiencia con el contenido de este documento.
4. Construir `SmokeBg` y `Nav` con sus comportamientos.
5. Construir `Hero` y `HeroImage`, con el cuadro de espacio para la imagen.
6. Construir `About`, `Skills`, `Experience`, `Services`.
7. Construir `Qa`, con los tres pasos y el espacio para el caso de referencia.
8. Construir `Projects`, `ProjectCard` y `ProjectDialog`, con filtro, diálogo y marcadores de mockup.
9. Construir `Contact`, `ContactForm` y `Footer`.
10. Revisar responsive en todos los anchos de la sección 17.
11. Revisar accesibilidad y rendimiento de las secciones 16 y 18.
12. Desplegar en Vercel y configurar la variable de entorno.
13. Entregar un reporte con lo que quedó pendiente.

---

## 21. Reporte final

Al terminar, entrega en este orden:
- Lo que se construyó y dónde está cada parte.
- Los marcadores `[PENDIENTE]` que quedaron, con su ubicación.
- Los resultados de `npm run build` y de Lighthouse.
- Lo que no se pudo verificar, por ejemplo el envío real del formulario sin endpoint configurado.

---

## 22. Pendientes del contenido

- Confirmar el verde lima exacto (propuesta: `#C6F432`) y el fondo oscuro (propuesta: `#121411`).
- Confirmar la tipografía Anton y Montserrat en el archivo original.
- Elegir qué proyecto va en el hero.
- Confirmar los titulares y la solución de InvenSys.
- Confirmar si el proyecto "Todo a la luz" puede mostrarse públicamente.
- Confirmar si el logotipo de Gianca se escribe con C.
- Entregar las imágenes de mockups y de portadas en las carpetas de `src/assets/`.
- Entregar la imagen y el ejemplo anonimizado para la sección QA, si se decide mostrarlos.
- Confirmar las herramientas de QA que se mostrarán.
- Confirmar el tiempo de respuesta para el contacto.
- Confirmar si los periodos de experiencia llevarán meses o solo años.
- Elegir el servicio de formularios y dar el endpoint.
- Confirmar el dominio.
- Entregar la imagen final del hero (se guardará en `src/assets/hero/hero-composicion.png`).
