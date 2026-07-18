const tools = [
  ["ipv4", "IPv4 Calculator", "Calculate subnet boundaries, hosts, masks, and address metadata."]
];

export function render() {
  return `<section class="network-tools"><header class="page-header"><div><p class="eyebrow">Tool module</p><h1>Network</h1><p class="page-summary">Practical tools for planning, inspecting, and troubleshooting IP networks.</p></div></header><section class="dashboard-grid" aria-label="Network tools">${tools.map(([id, name, description]) => `<a class="card tool-card" href="#/${id}"><span class="card-icon" aria-hidden="true">IP</span><h2>${name}</h2><p>${description}</p></a>`).join("")}</section></section>`;
}
