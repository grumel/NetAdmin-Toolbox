import { renderNavigation } from "./modules/navigation.js";
import { renderDashboard, renderPlaceholder } from "./modules/views.js";

const content = document.querySelector("#app-content");
const navigation = document.querySelector("#primary-navigation");
const status = document.querySelector("#connection-status");
const themeToggle = document.querySelector("#theme-toggle");
let deferredInstallPrompt;

function currentView() { return location.hash.slice(1) || "dashboard"; }

function render() {
  const view = currentView();
  navigation.innerHTML = renderNavigation(view);
  content.innerHTML = view === "dashboard" ? renderDashboard() : renderPlaceholder(view === "tools" ? "Tools" : "Settings");
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

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#0b1220" : "#f5f7fb";
  localStorage.setItem("netadmin-theme", theme);
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

themeToggle.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
window.addEventListener("hashchange", render);
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); deferredInstallPrompt = event; setupInstallButton(); });

applyTheme(localStorage.getItem("netadmin-theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch((error) => console.error("Service worker registration failed", error)));
}
