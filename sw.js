// Service worker sencillo: permite instalar la página y abrirla aunque no haya señal.
// Si cambias algo y no se actualiza en el celular, sube el número de VERSION.
const VERSION = "vh-v9";
const ARCHIVOS = ["./", "index.html", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return; // Spotify y las fuentes van directo
  if (req.mode === "navigate") {
    // La página: primero internet (para ver lo último), si no hay señal, la copia guardada
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(k => k.put("index.html", c)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(g => g || fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(k => k.put(req, c)); return r; })));
});
