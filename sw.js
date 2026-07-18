const CACHE_NAME = "netadmin-toolbox-v5";
const APP_SHELL = [
  "./", "index.html", "manifest.json", "assets/css/styles.css", "assets/js/app.js",
  "assets/js/router.js", "assets/js/theme.js", "assets/js/storage.js", "assets/icons/icon.svg",
  "modules/dashboard/index.js", "modules/network/index.js", "modules/cisco/index.js",
  "modules/windows/index.js", "modules/linux/index.js", "modules/security/index.js",
  "modules/developer/index.js", "modules/network/ipv4/index.js",
  "modules/network/ipv4/calculator.js", "modules/network/ipv4/validation.js",
  "modules/network/ipv4/formatter.js", "modules/network/ipv4/helpers.js",
  "modules/network/ipv4/style.css"
];
const CACHEABLE_DESTINATIONS = new Set(["script", "style", "image", "font", "manifest"]);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

function mayCache(request, response) {
  const url = new URL(request.url);
  return url.origin === self.location.origin
    && CACHEABLE_DESTINATIONS.has(request.destination)
    && response.ok
    && response.type === "basic";
}

// App-shell resources are cache-first. Navigations use the network and fall back to the shell.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("index.html")));
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (mayCache(event.request, response)) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)));
    }
    return response;
  })));
});
