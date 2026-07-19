import { t } from "../../assets/js/i18n.js";
import { downloadSettings, importSettings } from "../../assets/js/settings-transfer.js";
import { findTool, tools } from "../../assets/js/tool-catalog.js";
import { getFavorites, getRecentTools, toggleFavorite } from "../../assets/js/tool-state.js";

function toolCard(tool, favorite = false) {
  const favoriteLabel = favorite
    ? t("removeFavorite", { name: tool.name })
    : t("addFavorite", { name: tool.name });
  return `<article class="card tool-card-shell"><a class="tool-card" href="#/${tool.id}"><span class="card-icon" aria-hidden="true">${tool.icon}</span><h2>${tool.name}</h2><p>${tool.description}</p></a><button class="favorite-button" type="button" data-favorite="${tool.id}" aria-pressed="${favorite}" aria-label="${favoriteLabel}">${favorite ? "★" : "☆"}</button></article>`;
}

function toolSection(title, ids) {
  const favorites = new Set(getFavorites());
  const selected = ids.map(findTool).filter(Boolean);
  if (!selected.length) return "";
  return `<section class="dashboard-section"><h2>${title}</h2><div class="dashboard-grid">${selected.map((tool) => toolCard(tool, favorites.has(tool.id))).join("")}</div></section>`;
}

function settingsPanel() {
  return `<section class="dashboard-section" aria-labelledby="settings-title"><h2 id="settings-title">${t("settings")}</h2><div class="card settings-panel"><label for="locale-select">${t("language")}</label><select id="locale-select"><option value="en">${t("english")}</option><option value="de">${t("german")}</option></select><button class="install-button" id="export-settings" type="button">${t("exportSettings")}</button><label class="install-button import-label" for="import-settings">${t("importSettings")}</label><input id="import-settings" type="file" accept="application/json,.json" hidden><p id="settings-status" role="status"></p></div></section>`;
}

export function render() {
  const favorites = getFavorites();
  const recents = getRecentTools();
  return `<header class="page-header"><div><p class="eyebrow">${t("overview")}</p><h1>${t("dashboard")}</h1><p class="page-summary">${t("dashboardSummary")}</p></div><button class="install-button" id="install-button" type="button" hidden>${t("installApp")}</button></header>${toolSection(t("favorites"), favorites)}${toolSection(t("recent"), recents)}<section class="dashboard-section"><h2>${t("allTools")}</h2><div class="dashboard-grid">${tools.map((tool) => toolCard(tool, favorites.includes(tool.id))).join("")}</div></section>${settingsPanel()}`;
}

export function initialize(container) {
  const locale = container.querySelector("#locale-select");
  if (locale) locale.value = document.documentElement.lang || "en";

  container.onclick = (event) => {
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) {
      toggleFavorite(favorite.dataset.favorite);
      container.innerHTML = render();
      initialize(container);
      return;
    }
    if (event.target.closest("#export-settings")) downloadSettings();
  };

  locale?.addEventListener("change", () => {
    localStorage.setItem("netadmin-toolbox:locale", locale.value);
    location.reload();
  });

  container.querySelector("#import-settings")?.addEventListener("change", async (event) => {
    const status = container.querySelector("#settings-status");
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      importSettings(JSON.parse(await file.text()));
      status.textContent = t("importSuccess");
      location.reload();
    } catch {
      status.textContent = t("importError");
    }
  });
}
