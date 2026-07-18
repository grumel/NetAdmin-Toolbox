const placeholderTools = ["IP Address Calculator", "DNS Lookup", "Port Scanner", "Subnet Planner"];

/** View renderers remain isolated so future tools can be added as independent modules. */
export function renderDashboard() {
  return `
    <header class="page-header">
      <div><p class="eyebrow">Overview</p><h1>Dashboard</h1><p class="page-summary">Start here to access your network administration workspace.</p></div>
      <button class="install-button" id="install-button" type="button" hidden>Install app</button>
    </header>
    <section class="dashboard-grid" aria-label="Dashboard overview">
      <article class="card"><h2>Connection</h2><p class="metric" id="dashboard-connection">Online</p><p>Application status is monitored locally.</p></article>
      <article class="card"><h2>Available tools</h2><p class="metric">4</p><p>Tool modules are ready to be connected.</p></article>
      <article class="card tool-card"><h2>Tool workspace</h2><p>Choose a tool when it is ready, or use these placeholders to shape the next additions.</p><div class="tool-list">${placeholderTools.map((tool) => `<div class="tool-placeholder">${tool}</div>`).join("")}</div></article>
    </section>`;
}

export function renderPlaceholder(title) {
  return `<header class="page-header"><div><p class="eyebrow">NetAdmin Toolbox</p><h1>${title}</h1><p class="page-summary">This section is ready for its future module.</p></div></header>`;
}
