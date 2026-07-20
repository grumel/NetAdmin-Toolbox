import { localizedTools } from "../../assets/js/tool-catalog.js";

function renderToolCard(tool) {
  return `<a class="card tool-card" href="#/${tool.route}"><span class="card-icon" aria-hidden="true">${tool.icon}</span><h2>${tool.name}</h2><p>${tool.description}</p></a>`;
}

export function renderCategoryPage({ categoryId, title, summary }) {
  const tools = localizedTools().filter((tool) => tool.categoryId === categoryId);
  return `<section class="category-tools"><header class="page-header"><div><p class="eyebrow">Toolbox</p><h1>${title}</h1><p class="page-summary">${summary}</p></div></header><section class="dashboard-grid" aria-label="${title} tools">${tools.map(renderToolCard).join("")}</section></section>`;
}
