import { activeRoute, renderNavigation, renderRoute } from "./router.js";
import { currentTheme, initializeTheme, toggleTheme } from "./theme.js";

const content = document.querySelector("#app-content");
const navigation = document.querySelector("#primary-navigation");
const status = document.querySelector("#connection-status");
const themeToggle = document.querySelector("#theme-toggle");
let deferredInstallPrompt;

async function render() {
  const view = activeRoute();
  navigation.innerHTML = renderNavigation(view);
  await renderRoute(view, content);
  content.focus({ preventScroll: true });
  updateConnectionStatus();
  setupInstallButton();
}

function updateConnectionStatus() {
  const online = navigator.onLine;
  status.textContent = online ? "Online" : "Offline mode";
  status.classList.toggle("is-offline", !online);
  const dashboardStatus = document.querySelector("#dashboard-connection");
  if (dashboardStatus) dashboardStatus.textContent = online ? "Online" : "Offline";
}

function setupInstallButton() {
  const button = document.querySelector("#install-button");
  if (!button || !deferredInstallPrompt) return;
  button.hidden = false;
  button.addEventListener("click", async () => {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = undefined;
    button.hidden = true;
  }, { once: true });
}

function updateThemeButton() {
  const dark = currentTheme() === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  document.querySelector("#theme-toggle-label").textContent = dark ? "Use light mode" : "Use dark mode";
}

themeToggle.addEventListener("click", () => { toggleTheme(); updateThemeButton(); });
window.addEventListener("hashchange", render);
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); deferredInstallPrompt = event; setupInstallButton(); });

initializeTheme();
updateThemeButton();
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch((error) => console.error("Service worker registration failed", error)));
}
