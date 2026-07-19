import { findTool, tools } from "../../assets/js/tool-catalog.js";
import { getFavorites, getRecentTools, toggleFavorite } from "../../assets/js/tool-state.js";

function toolCard(tool, favorite = false) {
  return `<article class="card tool-card-shell"><a class="tool-card" href="#/${tool.id}"><span class="card-icon" aria-hidden="true">${tool.icon}</span><h2>${tool.name}</h2><p>${tool.description}</p></a><button class="favorite-button" type="button" data-favorite="${tool.id}" aria-pressed="${favorite}" aria-label="${favorite ? "Remove" : "Add"} ${tool.name} ${favorite ? "from" : "to"} favorites">${favorite ? "★" : "☆"}</button></article>`;
}

function toolSection(title, ids) {
  const favorites = new Set(getFavorites());
  const selected = ids.map(findTool).filter(Boolean);
  if (!selected.length) return "";
  return `<section class="dashboard-section"><h2>${title}</h2><div class="dashboard-grid">${selected.map((tool) => toolCard(tool, favorites.has(tool.id))).join("")}</div></section>`;
}

export function render() {
  const favorites = getFavorites();
  const recents = getRecentTools();
  return `<header class="page-header"><div><p class="eyebrow">Overview</p><h1>Dashboard</h1><p class="page-summary">Search with Ctrl+K, pin favorites, or reopen a recently used tool.</p></div><button class="install-button" id="install-button" type="button" hidden>Install app</button></header>${toolSection("Favorites", favorites)}${toolSection("Recently used", recents)}<section class="dashboard-section"><h2>All tools</h2><div class="dashboard-grid">${tools.map((tool) => toolCard(tool, favorites.includes(tool.id))).join("")}</div></section>`;
}

export function initialize(container) {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("[data-favorite]");
    if (!button) return;
    toggleFavorite(button.dataset.favorite);
    container.innerHTML = render();
    initialize(container);
  }, { once: true });
}
