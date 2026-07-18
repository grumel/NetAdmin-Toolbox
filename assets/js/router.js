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

/**
 * Creates a route renderer that commits only the newest requested view.
 * This prevents a slow dynamic import from replacing a newer navigation.
 */
export function createRouteRenderer(routeLoaders = routes) {
  let latestRequest = 0;

  return async function renderRequestedRoute(route, container) {
    const request = ++latestRequest;
    const loader = routeLoaders[route];
    if (!loader) return false;

    const page = await loader();
    if (request !== latestRequest) return false;

    container.innerHTML = page.render();
    page.initialize?.(container);
    return true;
  };
}

export const renderRoute = createRouteRenderer();
