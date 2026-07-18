const CACHE_NAME = "netadmin-toolbox-v2";
const APP_SHELL = [
  "./", "index.html", "manifest.json", "assets/css/styles.css", "assets/js/app.js",
  "assets/js/modules/navigation.js", "assets/js/modules/views.js", "assets/icons/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

// Cache-first keeps the app shell usable without a connection; navigation falls back to the shell.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => event.request.mode === "navigate" ? caches.match("index.html") : Response.error())));
});
