const tools = [
  ["ipv4", "IPv4 Calculator", "Calculate subnet boundaries, hosts, masks, and address metadata.", "IP"],
  ["ipv6", "IPv6 Calculator", "Expand, compress, classify, and calculate IPv6 subnet boundaries.", "v6"],
  ["subnet-tools", "Subnet Planner", "Calculate CIDR and wildcard masks, allocate VLSM networks, and summarize routes.", "Σ"]
];

export function render() {
  return `<section class="network-tools"><header class="page-header"><div><p class="eyebrow">Tool module</p><h1>Network</h1><p class="page-summary">Practical tools for planning, inspecting, and troubleshooting IP networks.</p></div></header><section class="dashboard-grid" aria-label="Network tools">${tools.map(([id, name, description, icon]) => `<a class="card tool-card" href="#/${id}"><span class="card-icon" aria-hidden="true">${icon}</span><h2>${name}</h2><p>${description}</p></a>`).join("")}</section></section>`;
}