const routes = {
  dashboard: () => import("../../modules/dashboard/index.js"),
  network: () => import("../../modules/network/index.js"),
  ipv4: () => import("../../modules/network/ipv4/index.js"),
  cisco: () => import("../../modules/cisco/index.js"),
  windows: () => import("../../modules/windows/index.js"),
  linux: () => import("../../modules/linux/index.js"),
  security: () => import("../../modules/security/index.js"),
  developer: () => import("../../modules/developer/index.js")
};

export const navigationItems = [
  ["dashboard", "Dashboard", "▦"], ["network", "Network", "⌁"], ["cisco", "Cisco", "◈"],
  ["windows", "Windows", "⊞"], ["linux", "Linux", "◒"], ["security", "Security", "◉"], ["developer", "Developer", "⌘"]
];

export function activeRoute() {
  const route = location.hash.replace(/^#\/?/, "");
  return routes[route] ? route : "dashboard";
}

export function renderNavigation(active) {
  return navigationItems.map(([id, label, icon]) => `<a class="nav-link" href="#/${id}" ${id === active ? 'aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span></a>`).join("");
}

export async function renderRoute(route, container) {
  const page = await routes[route]();
  container.innerHTML = page.render();
  page.initialize?.(container);
}
