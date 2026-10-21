# Guía de la página "Aventuras de Valeria y Henry"

## 1. Qué llenar en `index.html`

Abre `index.html` y busca `// CAMBIAR`. Todo está al principio del `<script>`, en `CONFIG` y en `AVENTURAS`.

| Campo | Qué poner | Ejemplo |
|---|---|---|
| `fechaInicio` | El día en que empezaron (AAAA-MM-DD) | `"2025-09-01"` |
| `cumpleValeria` | Mes-día de su cumpleaños | `"03-15"` |
| `aniversario` | Mes-día del aniversario | `"09-01"` |
| `mensajeCumple`, `mensajeAniversario` | El mensaje que sale ese día | |
| `cancion` | Enlace de Spotify (Compartir → Copiar enlace) | `"https://open.spotify.com/track/..."` |
| `nombreGuia`, `cafeFavorito`, `datoBonito` | Su perfil | |
| `cartaSecreta` | La carta que sale al tocar al turista 10 veces (`\n` = bajar de línea) | |
| `DESEOS` | Lugares por visitar | |
| `CAFES` | Cafeterías probadas (borra `muestra: true` cuando pongas una de verdad) | |
| `firebase` | Solo si quieres comentarios (paso 3) | |
| En cada aventura: `fecha`, `tacitas` (1–5), `versionGuia` | Fecha, cuántas tacitas, y cómo lo cuenta ella | |

Si dejas algo vacío (`""` o `0`), esa parte simplemente no sale.

**Para probar las fechas especiales sin esperar:** abre la página con `?probar=cumple` o `?probar=aniversario` al final del enlace.

**Cuando visiten un lugar de la lista de deseos:** bórrenlo de `DESEOS` y creen un bloque nuevo en `AVENTURAS` con su emoji, nombre, lat, lon, texto y fecha.

## 2. Cómo editar desde el celular o la computadora

1. Entra a github.com → repositorio `aventuras-de-valeria-y-henry`.
2. Toca `index.html` → el lápiz ✏️ (Edit).
3. Cambia lo que quieras → **Commit changes** → **Commit changes**.
4. En 1 o 2 minutos se ve en la página.

## 3. Firebase (comentarios y aventuras de Valeria) — gratis

1. Ve a https://console.firebase.google.com y entra con tu cuenta de Google.
2. **Crear un proyecto** → nombre `aventuras-vh` → desactiva Google Analytics → **Crear**.
3. Menú izquierdo → **Compilación → Firestore Database** → **Crear base de datos** → ubicación `nam5 (United States)` → **Iniciar en modo de producción** → **Crear**.
4. Menú → **Compilación → Authentication** → **Comenzar** → pestaña **Método de acceso** → **Anónimo** → activar → **Guardar**.
5. En Authentication → **Configuración → Dominios autorizados** → **Agregar dominio** → `henryaliceahe-glitch.github.io`.
6. En Firestore → pestaña **Reglas** → borra todo, pega lo de abajo, **cambia `ESCRIBE-AQUI-TU-CODIGO`** por su código secreto (una frase larga que solo ustedes sepan, por ejemplo `cafecito-en-jayuya-2025`) → **Publicar**.
7. Rueda ⚙️ → **Configuración del proyecto** → abajo, **Tus apps** → icono `</>` (Web) → nombre `pagina` → **Registrar app**. Te muestra un `firebaseConfig`. Copia `apiKey`, `authDomain`, `projectId` y `appId` dentro de `CONFIG.firebase` en `index.html`.
8. Guarda (commit). Abre la página → sección **Proponer** → escribe el código → listo. Cada uno lo escribe una vez en su celular.

> El código secreto **no** va en `index.html`, porque cualquiera puede ver el código de una página web. Va solo en las reglas de Firebase, que nadie más ve. La `apiKey` de Firebase sí puede estar en la página: es pública por diseño.
> Los comentarios se pueden **leer** sin código (como el resto de la página). Solo escribir y borrar necesita el código.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function esMiembro() {
      return request.auth != null && exists(/databases/$(database)/documents/miembros/$(request.auth.uid));
    }
    function autorValido(d) { return d.autor in ['guia', 'turista']; }

    match /miembros/{uid} {
      allow get: if request.auth != null && request.auth.uid == uid;
      allow create: if request.auth != null && request.auth.uid == uid
        && request.resource.data.keys().hasOnly(['codigo', 'creado'])
        && request.resource.data.codigo == 'ESCRIBE-AQUI-TU-CODIGO';
      allow list, update, delete: if false;
    }

    match /comentarios/{id} {
      allow read: if true;
      allow create: if esMiembro()
        && request.resource.data.keys().hasOnly(['aventuraId', 'autor', 'texto', 'creado'])
        && autorValido(request.resource.data)
        && request.resource.data.aventuraId is string && request.resource.data.aventuraId.size() <= 60
        && request.resource.data.texto is string && request.resource.data.texto.size() > 0 && request.resource.data.texto.size() <= 500
        && request.resource.data.creado == request.time;
      allow delete: if esMiembro();
      allow update: if false;
    }

    match /propuestas/{id} {
      allow read: if true;
      allow create: if esMiembro()
        && request.resource.data.keys().hasOnly(['nombre', 'texto', 'emoji', 'autor', 'lugar', 'fecha', 'tacitas', 'lat', 'lon', 'creado'])
        && autorValido(request.resource.data)
        && request.resource.data.nombre is string && request.resource.data.nombre.size() > 0 && request.resource.data.nombre.size() <= 40
        && request.resource.data.texto is string && request.resource.data.texto.size() > 0 && request.resource.data.texto.size() <= 600
        && request.resource.data.creado == request.time;
      allow delete: if esMiembro();
      allow update: if false;
    }
  }
}
```

**Para borrar una aventura propuesta:** Firebase → Firestore → colección `propuestas` → el documento → ⋮ → Eliminar.

## 4. Dominio propio (ej. valeriayhenry.com)

Cuesta unos $10–15 al año (no es gratis).

1. Compra el dominio en Cloudflare Registrar, Porkbun o Namecheap.
2. En el panel de DNS del dominio crea:
   - 4 registros **A** con nombre `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** con nombre `www` → `henryaliceahe-glitch.github.io`
3. En GitHub → repositorio → **Settings → Pages → Custom domain** → escribe `valeriayhenry.com` → **Save**. (GitHub crea un archivo `CNAME`.)
4. Espera (de minutos a 24 h) y marca **Enforce HTTPS**.
5. En `index.html` cambia las 2 direcciones de `og:url` y `og:image` al dominio nuevo.
6. Si usas Firebase, añade el dominio nuevo en Authentication → Dominios autorizados.

## 5. Instalarla en el celular

- **iPhone (Safari):** botón Compartir → **Agregar a pantalla de inicio**.
- **Android (Chrome):** menú ⋮ → **Instalar app** (o "Agregar a la pantalla principal").

Si cambias algo y el celular sigue mostrando lo viejo, sube el número de `VERSION` en `sw.js` (por ejemplo `vh-v2`).

## Archivos

- `index.html` — la página
- `manifest.json`, `sw.js` — para instalarla como app
- `icon.svg`, `icon-*.png` — íconos (azul y café)
- `og.svg` — imagen de vista previa (editable); `og.png` — la misma, lista para WhatsApp
