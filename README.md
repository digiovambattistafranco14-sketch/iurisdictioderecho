# Iurisdictio Derecho — sitio web

Sitio estático de una sola página para el estudio jurídico **Iurisdictio Derecho**
(García y Asociados), La Plata, Provincia de Buenos Aires.

Sin build, sin dependencias, sin framework. Se abre haciendo doble clic en
`index.html` y se sube tal cual a cualquier hosting.

## Estructura

```
index.html          Página completa (todas las secciones)
css/styles.css      Sistema de diseño + layout + animaciones
js/main.js          Nav, acordeones, reveal on scroll, menú móvil
img/logo.jpg        Logo optimizado (74 KB) — el que usa la página
img/*.png           Material de referencia original del Instagram
```

## Datos de contacto (dónde cambiarlos)

Todo sale de las piezas gráficas del Instagram del estudio. Si algo cambia,
buscá y reemplazá en **`index.html`**:

| Dato | Valor actual | Aparece en |
|---|---|---|
| WhatsApp | `5492213585005` | 6 links `wa.me/...` |
| Teléfono | `221 358-5005` | sección Contacto + JSON-LD |
| Email | `estudiojuridico@outlook.com` | sección Contacto + JSON-LD |
| Instagram | `iurisdictioderecho` | 3 links + JSON-LD |

> Formato de WhatsApp: `54` (país) + `9` (celular) + `221` (área sin el 0) +
> `3585005`. Si el número cambia, respetá ese formato o el link no abre el chat.

Mensaje precargado actual en los 6 links: **"Hola, quisiera hacer una consulta"**.
Para cambiarlo, editá el parámetro `?text=` — va URL-encodeado, con los espacios
como `%20` y la coma como `%2C`.

## Concepto de diseño: la página como expediente

Todo el sistema visual sale de un expediente judicial argentino. No es
decoración: es lo que separa al sitio de cualquier plantilla de estudio jurídico.

| Elemento | De dónde sale |
|---|---|
| **Regla de margen** vertical | La línea del papel oficio, fija durante todo el scroll |
| **Foliatura viva** (`f. 03 — Áreas`) | El folio en el margen izquierdo, que cambia según la sección |
| **Sello de goma** circular | Reemplaza al típico marquee. Lleva la leyenda "Atención en toda la provincia de Buenos Aires" y se estampa al cargar |
| **Índice con guías punteadas** | Las áreas de práctica compuestas como un índice de libro, no como tarjetas |
| **Párrafo justificado** con guionado | Como se compone un escrito judicial |
| **Botones de bordes rectos** | Sin píldoras: rectángulos con sombra desplazada, como un sello sobre papel |

El ritmo cromático está invertido respecto del cliché "todo negro con dorado":
domina el papel, y el negro aparece solo tres veces como puntuación —carátula,
previsional y contacto.

### Tokens

Paleta tomada de las piezas reales del estudio, al inicio de `styles.css`:

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0B0A08` | Fondos oscuros |
| `--gold` | `#C8A253` | Acento principal |
| `--paper` | `#EFEAE0` | Papel oficio |
| `--rail` | `clamp(2.75rem, 5.5vw, 6rem)` | Margen donde cae la regla vertical |

Tipografías (Google Fonts): **Fraunces** (serif editorial, títulos),
**Archivo** (texto), **JetBrains Mono** (foliatura, etiquetas, datos).

## Secciones

| Folio | Sección | Contenido |
|---|---|---|
| f. 01 | Carátula | Logo, slogan, presentación, sello |
| f. 02 | El estudio | Quiénes son, nota al margen, libro mayor de cifras |
| f. 03 | Áreas de práctica | Índice desplegable de 10 áreas |
| f. 04 | Previsional | Jubilaciones y pensiones (el fuerte comercial) |
| f. 05 | Consultas | Tarjetas desplegables en el tono "Dr., una pregunta…" de su Instagram |
| f. 06 | Cómo trabajamos | 3 pasos en romanos |
| f. 07 | Contacto | WhatsApp, Instagram, teléfono, mail, jurisdicción |

## Botones de contacto

- **WhatsApp flotante** abajo a la derecha, aparece a los 420 px de scroll
- **WhatsApp** además en nav, carátula, áreas, previsional y contacto (6 en total,
  contando el flotante), todos con el mismo mensaje precargado
- **Instagram** en contacto y en el pie (sin botón flotante, por decisión del cliente)

## Accesibilidad

- Contraste WCAG AA en todos los pares de color, incluido el texto chico
  (foliatura, etiquetas de categoría)
- Navegable por teclado, con `:focus-visible` dorado y skip link
- **Un solo mecanismo de acordeón en todo el sitio**: tanto las 10 áreas de
  práctica como las consultas frecuentes usan `<details>/<summary>` nativo.
  Sin JavaScript, las áreas se pueden seguir abriendo a mano (antes quedaban
  cerradas para siempre); con JavaScript, se agrega la regla de "un panel
  abierto a la vez" por grupo
- Los índices decorativos (`02`, `03`… en el nav; `i, ii, iii`… en previsional;
  `I, II, III` en "cómo trabajamos") están `aria-hidden`: un lector de pantalla
  ya anuncia el orden por la lista, no hace falta que lo lea dos veces
- El botón flotante de WhatsApp y el del nav tienen `aria-label` que **contiene**
  el texto visible del botón (WCAG 2.5.3, *Label in Name*) — antes el flotante
  tenía una etiqueta que no coincidía con lo que se leía en pantalla, y el del
  nav se quedaba sin nombre accesible al ocultar el texto en mobile
- Frases en latín (*in itinere*, *ab intestato*) marcadas `lang="la"` para que
  se pronuncien bien en un lector de pantalla en español
- Respeta `prefers-reduced-motion` (apaga el sello, los reveals y el scroll suave)
- Foliatura y sello marcados `aria-hidden`: son decorativos, y la leyenda de
  cobertura provincial está además en texto real para lectores de pantalla
- Hoja de estilos de impresión (los acordeones se imprimen abiertos)
- Cada sección tiene `isolation:isolate`: encapsula su propio z-index para que
  ningún elemento interno pueda terminar por accidente por encima del nav o
  la regla de margen fijos

## Publicar

Cualquier hosting estático sirve. Las opciones más simples:

- **Netlify / Vercel / Cloudflare Pages** — arrastrar la carpeta, listo
- **GitHub Pages** — subir el repo y activar Pages
- **Hosting tradicional** — subir todo por FTP a `public_html/`

Después de publicar, actualizá la URL en las dos líneas `canonical` y `og:url`
de `index.html`.

## Pendiente / a confirmar con el cliente

- [ ] Dirección exacta de la oficina en La Plata (hoy figura solo la ciudad)
- [ ] Horarios de atención
- [ ] Nombre y matrícula del titular para la sección "El estudio"
- [ ] Dominio definitivo
- [ ] Confirmar que la primera consulta es sin cargo (está afirmado en la FAQ)

## Revisión crítica (2026-08-01)

Pasada de control de calidad sobre el sitio ya entregado, antes de darlo por
cerrado para un cliente real. Cambios de esta pasada:

- Unificado el acordeón de áreas de práctica al mismo patrón `<details>` nativo
  que ya usaban las consultas — antes eran dos mecanismos distintos (uno con
  JS a medida, sin fallback) conviviendo en la misma página
- Corregidos dos incumplimientos de WCAG 2.5.3 (ver arriba)
- `--tx-faint` pasó de `#8A8377` a `#6C6555`: el original daba ~3.75:1 de
  contraste sobre el papel, por debajo del 4.5:1 que exige AA en texto chico
- Sacado el dato **"135 municipios alcanzados"** del libro mayor — era un
  cálculo mío, no algo que el estudio hubiera afirmado. Lo reemplacé por
  "PBA · cobertura total en la provincia", que sí está respaldado por su bio
  de Instagram
- Agregado `og:image:width/height/alt` para que la vista previa en redes no
  salte al cargar
