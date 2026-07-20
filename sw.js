const CACHE_NAME = "netadmin-toolbox-v19";
const APP_SHELL = [
  "./", "index.html", "manifest.json", "assets/css/styles.css", "assets/js/app.js",
  "assets/js/router.js", "assets/js/theme.js", "assets/js/storage.js", "assets/js/tool-catalog.js",
  "assets/js/tool-state.js", "assets/js/command-palette.js", "assets/js/i18n.js",
  "assets/js/settings-transfer.js", "assets/js/version.js", "assets/icons/icon.svg",
  "modules/shared/csv-export.js", "modules/shared/category-page.js",
  "modules/dashboard/index.js", "modules/network/index.js", "modules/cisco/index.js",
  "modules/windows/index.js", "modules/linux/index.js", "modules/security/index.js",
  "modules/developer/index.js", "modules/network/ipv4/index.js",
  "modules/network/ipv4/calculator.js", "modules/network/ipv4/validation.js",
  "modules/network/ipv4/formatter.js", "modules/network/ipv4/helpers.js",
  "modules/network/ipv4/style.css", "modules/network/ipv6/index.js",
  "modules/network/ipv6/calculator.js", "modules/network/subnet-tools/index.js",
  "modules/network/subnet-tools/calculator.js", "modules/network/shared/validation.js",
  "modules/network/mac-converter/index.js", "modules/network/port-search/index.js",
  "modules/network/dns-reference/index.js"
];
const CACHEABLE_DESTINATIONS = new Set(["script", "style", "image", "font", "manifest"]);
const OFFLINE_DOCUMENT = "index.html";
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
function mayCache(request,response){const url=new URL(request.url);return url.origin===self.location.origin&&CACHEABLE_DESTINATIONS.has(request.destination)&&response.ok&&response.type==="basic";}
async function respondToNavigation(request){try{return await fetch(request);}catch{const cached=await caches.match(OFFLINE_DOCUMENT);return cached||Response.error();}}
async function respondToAsset(event){try{const response=await fetch(event.request);if(mayCache(event.request,response)){const copy=response.clone();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)));}return response;}catch{const cached=await caches.match(event.request);return cached||Response.error();}}
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;if(event.request.mode==="navigate"){event.respondWith(respondToNavigation(event.request));return;}event.respondWith(respondToAsset(event));});
