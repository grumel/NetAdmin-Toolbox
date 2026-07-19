import { searchTools } from "./tool-catalog.js";
import { getFavorites, toggleFavorite } from "./tool-state.js";

function renderResults(container, query) {
  const favorites = new Set(getFavorites());
  const matches = searchTools(query);
  container.innerHTML = matches.length ? matches.map((tool, index) => `
    <li class="command-result" data-index="${index}">
      <a href="#/${tool.id}" data-command-link>
        <span><strong>${tool.name}</strong><small>${tool.category} · ${tool.description}</small></span>
      </a>
      <button type="button" data-favorite="${tool.id}" aria-label="${favorites.has(tool.id) ? "Remove" : "Add"} ${tool.name} ${favorites.has(tool.id) ? "from" : "to"} favorites" aria-pressed="${favorites.has(tool.id)}">${favorites.has(tool.id) ? "★" : "☆"}</button>
    </li>`).join("") : '<li class="command-empty">No matching tools.</li>';
}

export function initializeCommandPalette() {
  const actions = document.querySelector(".header-actions");
  if (!actions || document.querySelector("#command-palette")) return;

  const openButton = document.createElement("button");
  openButton.className = "command-trigger";
  openButton.type = "button";
  openButton.innerHTML = '<span aria-hidden="true">⌕</span><span>Search tools</span><kbd>Ctrl K</kbd>';
  actions.prepend(openButton);

  const dialog = document.createElement("dialog");
  dialog.id = "command-palette";
  dialog.className = "command-palette";
  dialog.innerHTML = `
    <form method="dialog" class="command-panel">
      <label for="command-query">Search tools and commands</label>
      <div class="command-input-row"><input id="command-query" type="search" autocomplete="off" placeholder="IPv6, VLSM, wildcard…"><button value="cancel" aria-label="Close command palette">×</button></div>
      <ul id="command-results" class="command-results"></ul>
      <p class="command-help">Press ↑ or ↓ to move, Enter to open, Esc to close.</p>
    </form>`;
  document.body.append(dialog);

  const input = dialog.querySelector("#command-query");
  const results = dialog.querySelector("#command-results");
  let selected = 0;

  const refresh = () => { renderResults(results, input.value); selected = 0; };
  const open = () => { refresh(); dialog.showModal(); input.focus(); };
  const close = () => dialog.close();

  openButton.addEventListener("click", open);
  input.addEventListener("input", refresh);
  results.addEventListener("click", (event) => {
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) { event.preventDefault(); toggleFavorite(favorite.dataset.favorite); refresh(); return; }
    if (event.target.closest("[data-command-link]")) close();
  });

  input.addEventListener("keydown", (event) => {
    const links = [...results.querySelectorAll("[data-command-link]")];
    if (!links.length) return;
    if (event.key === "ArrowDown") { event.preventDefault(); selected = (selected + 1) % links.length; links[selected].focus(); }
    if (event.key === "ArrowUp") { event.preventDefault(); selected = (selected - 1 + links.length) % links.length; links[selected].focus(); }
    if (event.key === "Enter") { event.preventDefault(); links[selected].click(); }
  });

  window.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); dialog.open ? close() : open(); }
    if (event.key === "/" && !dialog.open && !/input|textarea|select/i.test(document.activeElement?.tagName)) { event.preventDefault(); open(); }
  });
}
