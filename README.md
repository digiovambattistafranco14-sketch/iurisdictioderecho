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
netlify.toml        Cabeceras de seguridad (ver "Seguridad")
img/logo.jpg        Logo optimizado (74 KB) — el que usa la página
img/og.jpg          Vista previa al compartir el link (2400x1260)
img/*.png           Material de referencia original del Instagram
```

## Dominio

El sitio vive en **https://iurisdictioderecho.netlify.app/**. Ese dominio está
escrito en cuatro lugares de `index.html`: `canonical`, `og:url`, `og:image` y
el bloque JSON-LD. Si algún día se pasa a un dominio propio, hay que cambiarlo
en los cuatro.

> `og:url` y `og:image` **tienen que ser URLs absolutas**. Los rastreadores de
> WhatsApp, Instagram y Facebook no resuelven rutas relativas: con una ruta
> relativa el link se comparte sin vista previa.

### La imagen de vista previa (`img/og.jpg`)

Es la tarjeta que aparece cuando alguien comparte el link por WhatsApp. Mide
2400x1260 (el doble de los 1200x630 recomendados, para que se vea nítida en
pantallas retina) y usa la misma identidad que la carátula del sitio: fondo
carbón, tipografía Fraunces, el logo y la leyenda de cobertura provincial.

Si hay que rehacerla, lo importante es respetar la proporción 1,91:1 y volver a
declarar las dimensiones reales en `og:image:width` / `og:image:height`.

## Datos de contacto (dónde cambiarlos)

Todo sale de las piezas gráficas del Instagram del estudio. Si algo cambia,
buscá y reemplazá en **`index.html`**:

| Dato | Valor actual | Aparece en |
|---|---|---|
| WhatsApp | `5492213585005` | 6 links `wa.me/...` |
| Teléfono | `221 358-5005` | sección Contacto + JSON-LD |
| Email | `garciayasociados_estjuridico@outlook.com` | sección Contacto + JSON-LD |
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
| **Sello de goma** circular | Reemplaza al típico marquee. Lleva la leyenda "Atención en toda la provincia de Buenos Aires" y se estampa al cargar. Va apoyado sobre la placa del logo, en la esquina inferior: así queda siempre sobre fondo oscuro y no puede chocar con nada, porque se mueve con ella |
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

| Folio | Sección | En el menú | Contenido |
|---|---|---|---|
| f. 01 | Carátula | — | Logo, slogan, presentación, sello |
| f. 02 | El estudio | sí | Quiénes son, nota al margen, libro mayor de cifras |
| f. 03 | Áreas de práctica | sí | Índice desplegable de 10 áreas |
| f. 03 bis | Previsional | **no** | Jubilaciones y pensiones (el fuerte comercial) |
| f. 04 | Consultas | sí | Tarjetas desplegables en el tono "Dr., una pregunta…" de su Instagram |
| f. 05 | Cómo trabajamos | sí | 3 pasos en romanos |
| f. 06 | Contacto | sí | WhatsApp, Instagram, teléfono, mail, jurisdicción |

### Por qué Previsional es "03 bis" y no está en el menú

Es un **área de práctica**, no una sección del sitio: puesta al lado de "El
estudio" o "Consultas" quedaba fuera de lugar, porque mezclaba dos niveles
distintos. Se llega desde la entrada 04 del índice de Áreas, que tiene un
enlace directo.

El folio `03 bis` sigue la técnica legislativa argentina, donde *bis* numera lo
que se inserta dentro de un artículo ya existente (art. 14 bis de la
Constitución). Dice exactamente lo que hace falta: esta hoja pertenece a Áreas
de práctica.

Gracias a eso el menú queda consecutivo —02, 03, 04, 05, 06— sin saltos.
**Si se agrega o se quita una sección, hay que renumerar los folios de las
siguientes** en tres lugares: el `data-folio` de la sección, el `f. NN` de su
encabezado, y los tres menús (escritorio, móvil y pie).

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
  nav se quedaba sin nombre accesible al ocultar el texto en mobile.
  Si cambiás el texto visible del botón flotante, cambiá también su `aria-label`:
  el segundo tiene que seguir conteniendo al primero
- Frases en latín (*in itinere*, *ab intestato*) marcadas `lang="la"` para que
  se pronuncien bien en un lector de pantalla en español
- Respeta `prefers-reduced-motion` (apaga el sello, los reveals y el scroll suave)
- Foliatura y sello marcados `aria-hidden`: son decorativos, y la leyenda de
  cobertura provincial está además en texto real para lectores de pantalla
- Hoja de estilos de impresión (los acordeones se imprimen abiertos)
- Cada sección tiene `isolation:isolate`: encapsula su propio z-index para que
  ningún elemento interno pueda terminar por accidente por encima del nav o
  la regla de margen fijos

## Seguridad

El sitio es estático: no hay backend, ni formularios, ni base de datos, ni datos
de usuarios. Eso ya elimina de entrada las vulnerabilidades más comunes
(inyección SQL, XSS por entrada de usuario, robo de sesiones). Lo que queda se
cubre desde **`netlify.toml`**, que Netlify aplica solo al desplegar.

| Cabecera | Qué evita |
|---|---|
| `Content-Security-Policy` | Lista blanca de lo único que el navegador puede cargar. Si algún día alguien inyectara un script o un iframe en el HTML, el navegador se niega a ejecutarlo |
| `X-Frame-Options` + `frame-ancestors` | *Clickjacking*: que otro sitio meta la web en un iframe invisible para robar clics |
| `X-Content-Type-Options: nosniff` | Que el navegador "adivine" el tipo de un archivo y ejecute como script algo servido como imagen o texto |
| `Referrer-Policy` | Al salir a WhatsApp o Instagram se manda solo el dominio, nunca la sección que la persona estaba leyendo |
| `Permissions-Policy` | Que el sitio pueda pedir cámara, micrófono, ubicación o pagos: se los niega explícitamente |
| `Cross-Origin-Opener-Policy` | Que una ventana abierta desde el sitio pueda manipular la original |
| `Strict-Transport-Security` | Fuerza HTTPS durante un año |

Además:

- Todos los enlaces externos llevan `rel="noopener"`, para que la pestaña que se
  abre no pueda tocar la que queda atrás
- `README.md` y `claude.md` devuelven 404: viven en el repo porque sirven para
  mantener el sitio, pero no son parte de la web pública. Sin esa regla
  quedarían accesibles en `tudominio.com/README.md`

### Notas para quien edite esto después

- **`'unsafe-inline'` está solo en `style-src`, y hace falta.** Los retardos de
  las animaciones viajan como atributos `style="--d:…"` en el HTML. Es un permiso
  de estilos, no de scripts: no permite ejecutar código. Si algún día esos
  retardos pasan a clases de CSS, se puede sacar
- **`Strict-Transport-Security` va sin `includeSubDomains` ni `preload`** a
  propósito: los dos son muy difíciles de revertir y el dominio definitivo
  todavía no está configurado. Se pueden agregar cuando el dominio esté firme
- **Si agregás un recurso externo** (un script de analítica, un mapa embebido,
  una fuente nueva), la CSP lo va a bloquear hasta que lo declares. Es la idea:
  el bloqueo avisa que entró una dependencia nueva. Se ve en la consola del
  navegador (F12)

### Mejora pendiente: alojar las tipografías

Hoy las fuentes vienen de Google Fonts, así que **la IP de cada visitante llega
a Google** en cada carga. En un estudio jurídico eso pesa: alguien que consulta
por un divorcio o una causa penal deja rastro en un tercero.

Descargar los `.woff2` y servirlos desde `/fonts` cerraría eso, y de paso
mejoraría la velocidad y permitiría endurecer la CSP (se caerían las dos
excepciones a `fonts.googleapis.com` y `fonts.gstatic.com`).

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
- [x] ~~Confirmar si la primera consulta es sin cargo~~ → **La consulta es
      remunerada**, y por decisión del cliente el sitio no habla del tema.
      La pregunta se sacó de la FAQ el 2026-08-01. Ojo al editar: no volver a
      escribir en ningún lado que la consulta es gratuita, y revisar que el
      botón flotante no diga "gratis"
- [ ] Que un abogado del estudio revise las respuestas de la FAQ (f. 05) antes
      de publicar: dos de ellas afirman cosas sobre la ley y sobre plazos
      —la de la cuota alimentaria y la del amparo de salud— y van con la firma
      del estudio. La de herencia vino redactada por el estudio, no hace falta
      revisarla
- [ ] Decidir el tratamiento en la FAQ: la respuesta sobre herencia usa "usted"
      y el resto del sitio usa "vos". Hoy conviven; unificar cuando el estudio
      defina cuál prefiere

## Verificación en PC y celular (2026-08-01)

Renderizado real con Chrome headless vía DevTools Protocol, en 8 anchos:
320, 360, 390, 820, 960, 1280, 1440 y 1920 px. Medido en cada uno el
desbordamiento horizontal, los errores de consola, las peticiones fallidas y
el tamaño de todos los objetivos táctiles.

**Resultado tras los arreglos:** 0 desbordes, 0 errores de consola, 0 peticiones
fallidas y 0 objetivos táctiles por debajo del mínimo, en los 8 anchos.

### Fallo crítico encontrado: la página quedaba en blanco sin JavaScript

`.reveal` arranca en `opacity:0` y es el JavaScript el que enciende `.is-in` al
hacer scroll. Medido con la ejecución de scripts desactivada: **48 de 48 bloques
invisibles**. Sin JS no se veían los títulos, ni los botones de WhatsApp, ni el
teléfono, ni el mail — la página se leía prácticamente vacía.

Cualquier motivo bastaba para provocarlo: JavaScript desactivado, un fallo de red
al pedir `main.js`, una extensión del navegador, o una CSP mal editada. Este
último caso es especialmente relevante ahora que el sitio tiene CSP.

Arreglado envolviendo el ocultado en `@media (scripting: enabled)`. Si no hay
scripting, el navegador no aplica la regla y todo el contenido se ve. Verificado:
de 48 bloques invisibles a 0, sin perder la animación cuando el JS sí carga.

### Objetivos táctiles por debajo del mínimo (WCAG 2.2, SC 2.5.8)

Diez enlaces medían menos de los 24 px que exige el criterio. Los dos peores
eran, justamente, los que más importan en un estudio jurídico:

| Enlace | Antes | Ahora |
|---|---|---|
| Email de contacto | 16 px | 30 px |
| Teléfono | 23 px | 37 px |
| 7 enlaces del pie | 23 px | 33 px |
| "Ver el detalle completo en f. 04" | 17 px | 27 px |

En los enlaces con subrayado se usó `background-origin: content-box`, para que
el relleno agrande el área táctil sin despegar la línea del texto.

### Nota sobre el texto del sello

Los cortes de línea de la leyenda están puestos a mano y **no son arbitrarios**:
los renglones cortos van arriba y abajo, donde la cuerda del círculo es más
angosta, y los largos al medio. Con el reparto anterior (el renglón más largo
primero) el texto se salía del círculo entre 4 y 17 px en todos los anchos.

Si se cambia el texto o el tamaño del sello, hay que volver a repartir los
cortes en forma de rombo y comprobar que entre.

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
