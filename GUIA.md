# Guía de la página "Aventuras de Valeria y Henry"

## 1. Dónde están los datos

Todo está al principio del `<script>` de `index.html`, en `CONFIG` y en `AVENTURAS`.

| Campo | Qué es |
|---|---|
| `fechaInicio` | El día en que empezaron (AAAA-MM-DD). Sirve para "Día X de aventuras" |
| `cumpleValeria`, `aniversario` | Mes-día (MM-DD). Ese día sale confeti y un mensaje |
| `mensajeCumple`, `mensajeAniversario` | El mensaje de esos días |
| `cancion` | Enlace de Spotify (Compartir → Copiar enlace). Mientras diga `CAMBIAR`, el botón no aparece |
| `nombreGuia`, `cafeFavorito`, `datoBonito` | Su perfil (`datoBonito` vacío = no sale) |
| `cartaSecreta` | La carta que sale al tocar al turista 10 veces (`\n` = bajar de línea) |
| `DESEOS` | Lugares por visitar |
| `CAFES` | Cafeterías probadas: nombre, lugar, qué pidió cada uno, `tacitas` o `nota` |
| `RANKING_SMASH`, `notaRanking` | El ranking de smash de la guía (se ordena solo por nota) |
| `AVENTURAS` | Los lugares (ver abajo) |

Si dejas algo vacío (`""` o `0`), esa parte simplemente no sale.

## 2. Añadir un lugar

Cada bloque de `AVENTURAS` es un **lugar** con su pin. Los lugares con la **misma fecha** forman una salida (un "Día" en la línea de tiempo).

```js
{
  id: "nombre-corto", emoji: "☕", nombre: "Nombre del sitio", lugar: "Pueblo",
  lat: 18.4224, lon: -66.0716, zona: "sj", fecha: "2026-10-25", nota: 8,
  texto: "Lo que pasó.",
  versionGuia: "",
},
```

- `id`: corto, sin espacios ni acentos, que no se repita.
- `lat`/`lon`: en Google Maps toca el sitio y copia los dos números.
- `zona`: `"sj"` (área de San Juan), `"caguas"` o bórralo si es en otro sitio.
- `tacitas` (1 a 5, acepta medios como `3.5`) o `nota` (de la guía, sobre 10; 7 = 3.5 tacitas).
- `versionGuia`: cómo lo cuenta Valeria; si está vacío no sale el botón.
- `smash: true` si es un sitio de smash burgers.
- `secreto: true` para que no salga en el mapa ("ubicación clasificada").

**Cuando visiten un lugar de la lista de deseos:** bórrenlo de `DESEOS` y creen un bloque nuevo en `AVENTURAS`.

**Para probar las fechas especiales sin esperar:** abre la página con `?probar=cumple` o `?probar=aniversario` al final del enlace.

## 3. Cómo editar desde el celular o la computadora

1. Entra a github.com → repositorio `aventuras-de-valeria-y-henry`.
2. Toca `index.html` → el lápiz ✏️ (Edit).
3. Cambia lo que quieras → **Commit changes** → **Commit changes**.
4. Abre `sw.js` y sube el número de `VERSION` (por ejemplo de `vh-v6` a `vh-v7`) para que los celulares vean el cambio.
5. En 1 o 2 minutos se ve en la página.

## 4. Dominio propio (ej. valeriayhenry.com)

Cuesta unos $10–15 al año (no es gratis).

1. Compra el dominio en Cloudflare Registrar, Porkbun o Namecheap.
2. En el panel de DNS del dominio crea:
   - 4 registros **A** con nombre `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** con nombre `www` → `henryaliceahe-glitch.github.io`
3. En GitHub → repositorio → **Settings → Pages → Custom domain** → escribe `valeriayhenry.com` → **Save**. (GitHub crea un archivo `CNAME`.)
4. Espera (de minutos a 24 h) y marca **Enforce HTTPS**.
5. En `index.html` cambia las 2 direcciones de `og:url` y `og:image` al dominio nuevo.

## 5. Instalarla en el celular

- **iPhone (Safari):** botón Compartir → **Agregar a pantalla de inicio**.
- **Android (Chrome):** menú ⋮ → **Instalar app** (o "Agregar a la pantalla principal").

## Archivos

- `index.html` — la página
- `manifest.json`, `sw.js` — para instalarla como app
- `icon.svg`, `icon-*.png` — íconos (azul y café)
- `og.svg` — imagen de vista previa (editable); `og.png` — la misma, lista para WhatsApp
