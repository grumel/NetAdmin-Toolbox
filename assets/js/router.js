const routes = {
  dashboard: () => import("../../modules/dashboard/index.js"),
  network: () => import("../../modules/network/index.js"),
  ipv4: () => import("../../modules/network/ipv4/index.js"),
  ipv6: () => import("../../modules/network/ipv6/index.js"),
  "subnet-tools": () => import("../../modules/network/subnet-tools/index.js"),
  "mac-converter": () => import("../../modules/network/mac-converter/index.js"),
  "port-search": () => import("../../modules/network/port-search/index.js"),
  "dns-reference": () => import("../../modules/network/dns-reference/index.js"),
  "acl-generator": () => import("../../modules/cisco/acl-generator/index.js"), "acl-optimizer": () => import("../../modules/cisco/acl-optimizer/index.js"), "vlan-calculator": () => import("../../modules/cisco/vlan-calculator/index.js"), "interface-converter": () => import("../../modules/cisco/interface-converter/index.js"), "ospf-helper": () => import("../../modules/cisco/ospf-helper/index.js"), cisco: () => import("../../modules/cisco/index.js"), windows: () => import("../../modules/windows/index.js"), linux: () => import("../../modules/linux/index.js"), security: () => import("../../modules/security/index.js"), developer: () => import("../../modules/developer/index.js")
};
export const navigationItems = [["dashboard","Dashboard","▦"],["network","Network","⌁"],["cisco","Cisco","◈"],["windows","Windows","⊞"],["linux","Linux","◒"],["security","Security","◉"],["developer","Developer","⌘"]];
export function activeRoute(){const route=location.hash.replace(/^#\/?/,"");return routes[route]?route:"dashboard";}
export function renderNavigation(active){return navigationItems.map(([id,label,icon])=>`<a class="nav-link" href="#/${id}" ${id===active?'aria-current="page"':""}><span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span></a>`).join("");}
export function createRouteRenderer(routeLoaders=routes){let latestRequest=0;return async function(route,container){const request=++latestRequest;const loader=routeLoaders[route];if(!loader)return false;const page=await loader();if(request!==latestRequest)return false;container.innerHTML=page.render();page.initialize?.(container);return true;};}
export const renderRoute=createRouteRenderer();
