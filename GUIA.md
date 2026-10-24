# Guía de la página "Aventuras de Valeria y Henry"

Todo se cambia en un solo archivo: `index.html`. Los datos están arriba del todo, dentro de `CONFIG` y `AVENTURAS`.
Si dejas algo vacío (`""`), esa parte simplemente no sale.

## 1. Editar desde el celular (GitHub)

1. Abre github.com en el navegador (no hace falta la app) y entra con tu cuenta.
2. Ve al repositorio `aventuras-de-valeria-y-henry` y toca `index.html`.
3. Toca el lápiz ✏️ (arriba a la derecha) para editar.
4. Haz el cambio (los pasos de abajo dicen dónde).
5. Toca **Commit changes** → **Commit changes**.
6. Abre `sw.js`, toca el lápiz y sube el número de `VERSION` (por ejemplo `vh-v8` → `vh-v9`). Guarda igual. Así los celulares ven el cambio.
7. En 1 o 2 minutos se ve en la página.

> Consejo: para encontrar algo dentro del archivo, en la computadora usa Ctrl+F; en el celular, el menú del navegador → "Buscar en la página".

## 2. Añadir un lugar nuevo

Busca `PLANTILLA PARA AÑADIR UNO`. Copia la línea de la plantilla y pégala dentro de `AVENTURAS`, **al final, justo antes de la línea `];`**:

```js
{ nombre: "", emoji: "", lugar: "", fecha: "AAAA-MM-DD", lat: null, lon: null, tipos: [], texto: "", nota: null },
```

Ejemplo lleno:

```js
{ nombre: "Café en Jayuya", emoji: "☕", lugar: "Jayuya", fecha: "2026-11-02", lat: 18.2186, lon: -66.5916, tipos: ["cafe"], texto: "Café recién tostado en la montaña.", nota: 9 },
```

- **tipos** (para los filtros del mapa): `"cafe"`, `"comida"`, `"playa"`, `"diversion"`, `"paseo"`, `"especial"`. Puede tener varios: `["cafe", "especial"]`.
- **nota**: la nota de la guía sobre 10 (se convierte sola en tacitas: 9 = 4 tacitas y media). Si no hay nota, deja `null`.
- Si es un sitio de smash burgers, añade `smash: true` (entra en el ranking si tiene nota).
- Si no tiene coordenadas, deja `lat: null, lon: null`: sale en la línea de tiempo y el pasaporte, pero sin pin.
- El id, el color, el giro del sello y la zona del mapa se ponen solos.
- Ojo con las comillas: el texto va entre `"..."`. Si el texto lleva comillas dobles, escribe `\"` o usa comillas simples por fuera.

## 3. Sacar las coordenadas en Google Maps

- **Celular:** abre Google Maps, busca el sitio y **mantén el dedo** sobre el punto exacto. Sale un pin y arriba, en el buscador, dos números (ej. `18.4224, -66.0716`). Toca para copiarlos.
- **Computadora:** haz clic derecho sobre el sitio; el primer renglón del menú son los números. Haz clic para copiarlos.
- El primer número es `lat` y el segundo es `lon` (el segundo siempre empieza con `-66` o `-67` en Puerto Rico).

## 4. Ponerle título a un día nuevo

Busca `TITULOS_DIAS` y añade una línea con la fecha y el título:

```js
"2026-11-02": "Cafecito en la montaña",
```

Los lugares con la misma fecha salen juntos como un día ("Día 11 · 2 de noviembre — Cafecito en la montaña").

## 4b. Añadir fotos a un día

1. En GitHub, abre la carpeta `fotos` → **Add file → Upload files** → escoge la foto → **Commit changes**.
   Ponle un nombre sencillo, sin espacios ni acentos, por ejemplo `2026-10-09-flores.jpg`.
   (Si la foto es muy pesada, más de 1 MB, mándasela antes por WhatsApp a ti mismo y guárdala desde ahí: sale más liviana.)
2. En `index.html`, busca `FOTOS_DIAS` y añade la fecha del día con su foto:

```js
"2026-10-09": [
  { foto: "fotos/2026-10-09-flores.jpg", texto: "Las flores de ese día 💐" },
],
```

Para varias fotos del mismo día, pon varias líneas `{ foto: ..., texto: ... },` dentro de los corchetes.
Las fotos salen en la tarjeta de ese día en la línea de tiempo (y en "Un día como hoy") y se pueden tocar para verlas en grande.

> Ojo: las fotos quedan públicas para quien tenga el link. Las fotos del iPhone pueden guardar la ubicación donde se tomaron; mandarlas por WhatsApp primero se la quita.

## 4c. Añadir un lugar a "Lugares por descubrir"

Busca `DESEOS` y añade una línea en la categoría que toque:

```js
{ nombre: "Nombre del sitio", emoji: "☕", lat: 18.4660, lon: -66.1160, tipos: ["cafe"], pueblo: "Viejo San Juan", nota: "Por qué queremos ir." },
```

Los `tipos` de la lista de deseos son: `"cafe"` (cafés y haciendas), `"playa"`, `"comida"`, `"diversion"` (go-karts y aventura) y `"paseo"` (turismo y naturaleza).
En el mapa, el botón **por visitar** muestra u oculta todos estos pines.

## 5. Pasar un deseo a visitado

1. En `DESEOS`, busca el lugar (ej. Rincón) y **borra su línea**.
2. Añádelo como lugar nuevo en `AVENTURAS` (paso 2), copiando su emoji, nombre, `lat` y `lon`, y poniéndole la fecha y la historia.

## 6. Añadir una frase célebre

Busca `FRASES` y añade una línea:

```js
{ texto: "Lo que dijo", quien: "La guía", donde: "en Caguas" },
```

Con 1 o 2 frases se ven fijas; con 3 o más se convierten solas en carrusel.

## 7. Escribir una cápsula del tiempo

Busca `CAPSULAS`. Cada una tiene su fecha; escribe la carta dentro de `carta: "..."`. Para bajar de línea usa `\n`:

```js
{ titulo: "San Valentín", emoji: "💙", fecha: "2027-02-14", carta: "Valeria:\nFeliz San Valentín..." },
```

- Una cápsula con la carta vacía no se muestra (si todas están vacías, la sección no aparece).
- Antes de su fecha sale con candado y "Faltan X días"; desde ese día (hora de Puerto Rico) se puede leer.
- Ojo: la carta va dentro del código de la página, así que alguien que sepa ver el código podría leerla antes.

## 8. Otros datos de `CONFIG`

| Campo | Qué es |
|---|---|
| `fechaInicio` | El día en que empezaron (AAAA-MM-DD): "Día X de aventuras", mensaje de cada mes y logros de tiempo |
| `cumpleValeria`, `cumpleHenry`, `aniversario` | Mes-día (MM-DD). Ese día sale confeti y un mensaje |
| `cancion` | Enlace de Spotify (Compartir → Copiar enlace). Mientras diga `CAMBIAR`, el botón no aparece |
| `cafeFavorito`, `datoBonito` | El perfil de la guía |
| `cartaSecreta` | La carta que sale al tocar al turista 10 veces |
| `CAFES` | El pasaporte cafetero |
| `PLANES` | Ideas para la ruleta "¿Qué hacemos hoy?" (también usa la lista de deseos) |

Para las frases que dice el turista al tocarlo, busca `const FRASES = [` (más abajo, en la parte del turista) y añade una línea entre comillas.

## 9. Probar fechas sin esperar

Añade al final del enlace:
- `?hoy=2026-11-08` hace que la página crea que hoy es ese día (mensaje del mes, "Un día como hoy", cápsulas, logros).
- `?probar=cumple`, `?probar=cumpleHenry`, `?probar=aniversario` o `?probar=mes` muestran ese mensaje especial.

## 10. Compartir una aventura

Cada aventura tiene **Compartir**: en el celular abre el menú de compartir; en la computadora copia el link. El link lleva directo a esa aventura (termina en `#nombre`, por ejemplo `#pergamino`).

## 11. Dominio propio (ej. valeriayhenry.com)

Cuesta unos $10–15 al año (no es gratis).

1. Compra el dominio en Cloudflare Registrar, Porkbun o Namecheap.
2. En el panel de DNS del dominio crea:
   - 4 registros **A** con nombre `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** con nombre `www` → `henryaliceahe-glitch.github.io`
3. En GitHub → repositorio → **Settings → Pages → Custom domain** → escribe `valeriayhenry.com` → **Save**.
4. Espera (de minutos a 24 h) y marca **Enforce HTTPS**.
5. En `index.html` cambia las direcciones de `og:url`, `og:image` y `twitter:image` al dominio nuevo.

## 12. Instalarla en el celular

- **iPhone (Safari):** botón Compartir → **Agregar a pantalla de inicio**.
- **Android (Chrome):** menú ⋮ → **Instalar app** (o "Agregar a la pantalla principal").

## Archivos

- `index.html` — la página
- `manifest.json`, `sw.js` — para instalarla como app
- `icon.svg`, `icon-*.png` — íconos
- `og.svg` — imagen de vista previa (editable); `og.png` — la misma, lista para WhatsApp. Si la cambias, sube el `?v=2` de `og:image` y `twitter:image` a `?v=3` para que WhatsApp no use la vieja.
- La página tiene `noindex`: no aparece en Google.
