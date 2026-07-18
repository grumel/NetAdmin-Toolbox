const tools = [
  ["ipv4", "IPv4 Calculator", "IP", "Calculate subnet boundaries, host ranges, masks, and address metadata."],
  ["network", "Network Tools", "⌁", "Network diagnostics and address planning."],
  ["cisco", "Cisco", "◈", "Cisco-focused configuration helpers."],
  ["windows", "Windows", "⊞", "Windows administration utilities."],
  ["linux", "Linux", "◒", "Linux operations and system tools."],
  ["security", "Security", "◉", "Security checks and analysis tools."],
  ["developer", "Developer", "⌘", "Developer utilities for automation work."]
];

export function render() {
  return `<header class="page-header"><div><p class="eyebrow">Overview</p><h1>Dashboard</h1><p class="page-summary">Choose a workspace to get started with NetAdmin Toolbox.</p></div><button class="install-button" id="install-button" type="button" hidden>Install app</button></header><section class="dashboard-grid" aria-label="Tool modules">${tools.map(([id, name, icon, description]) => `<a class="card tool-card" href="#/${id}"><span class="card-icon" aria-hidden="true">${icon}</span><h2>${name}</h2><p>${description}</p></a>`).join("")}</section>`;
}
