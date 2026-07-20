import { localizedTools } from "../../assets/js/tool-catalog.js";
import { t } from "../../assets/js/i18n.js";

function renderToolCard(tool) {
  return `<a class="card tool-card" href="#/${tool.route}"><span class="card-icon" aria-hidden="true">${tool.icon}</span><h2>${tool.name}</h2><p>${tool.description}</p></a>`;
}

export function render() {
  const tools = localizedTools().filter((tool) => tool.categoryId === "network");

  return `<section class="network-tools"><header class="page-header"><div><p class="eyebrow">${t("overview")}</p><h1>${t("network")}</h1><p class="page-summary">${t("networkSummary")}</p></div></header><section class="dashboard-grid" aria-label="${t("networkTools")}">${tools.map(renderToolCard).join("")}</section></section>`;
}
