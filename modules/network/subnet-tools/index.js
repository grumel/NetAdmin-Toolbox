import { allocateVlsm, cidrDetails, summarizeCidrs } from "./calculator.js";

function rows(entries) {
  return entries.map(([label, value]) => `<div class="result-row"><dt>${label}</dt><dd>${value}</dd></div>`).join("");
}

export function render() {
  return `<section><header class="page-header"><div><p class="eyebrow">Network tool</p><h1>Subnet Planner</h1><p class="page-summary">Calculate CIDR details and wildcard masks, allocate VLSM networks, and summarize routes.</p></div></header>
  <section class="card"><h2>CIDR and wildcard</h2><form id="cidr-form"><div class="form-grid"><label>IPv4 address<input name="address" value="192.168.10.42" autocomplete="off"></label><label>Prefix<input name="prefix" type="number" min="0" max="32" value="24"></label></div><button type="submit">Calculate</button><p class="form-error" role="alert"></p></form><dl id="cidr-result" class="result-list"></dl></section>
  <section class="card"><h2>VLSM allocation</h2><form id="vlsm-form"><div class="form-grid"><label>Base network<input name="address" value="10.0.0.0" autocomplete="off"></label><label>Base prefix<input name="prefix" type="number" min="0" max="32" value="24"></label></div><label>Requirements, one per line (name: hosts)<textarea name="requirements" rows="5">Users: 100
Voice: 40
Printers: 20
Management: 10</textarea></label><button type="submit">Allocate</button><p class="form-error" role="alert"></p></form><div id="vlsm-result"></div></section>
  <section class="card"><h2>Route summarization</h2><form id="summary-form"><label>CIDR networks, one per line<textarea name="networks" rows="5">192.168.0.0/24
192.168.1.0/24
192.168.2.0/24
192.168.3.0/24</textarea></label><button type="submit">Summarize</button><p class="form-error" role="alert"></p></form><dl id="summary-result" class="result-list"></dl></section></section>`;
}

function bindForm(container, id, handler) {
  const form = container.querySelector(id);
  const error = form.querySelector(".form-error");
  const run = () => {
    try { handler(form); error.textContent = ""; }
    catch (exception) { error.textContent = exception.message; }
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); run(); });
  run();
}

export function initialize(container) {
  bindForm(container, "#cidr-form", (form) => {
    const result = cidrDetails(form.elements.address.value, form.elements.prefix.value);
    container.querySelector("#cidr-result").innerHTML = rows([
      ["CIDR", result.cidr], ["Netmask", result.netmask], ["Wildcard", result.wildcard],
      ["Broadcast", result.broadcast], ["Addresses", result.totalAddresses], ["Usable hosts", result.usableHosts]
    ]);
  });

  bindForm(container, "#vlsm-form", (form) => {
    const requirements = form.elements.requirements.value.split(/\r?\n/).filter(Boolean).map((line, index) => {
      const match = line.match(/^\s*(?:(.*?):\s*)?(\d+)\s*$/);
      if (!match) throw new TypeError(`Invalid VLSM requirement on line ${index + 1}`);
      return { name: match[1]?.trim() || `Subnet ${index + 1}`, hosts: Number(match[2]) };
    });
    const allocations = allocateVlsm(form.elements.address.value, form.elements.prefix.value, requirements);
    container.querySelector("#vlsm-result").innerHTML = `<div class="table-wrapper"><table><thead><tr><th>Name</th><th>Hosts</th><th>CIDR</th><th>Range</th><th>Wildcard</th></tr></thead><tbody>${allocations.map((item) => `<tr><td>${item.name}</td><td>${item.requestedHosts}</td><td>${item.cidr}</td><td>${item.network} – ${item.broadcast}</td><td>${item.wildcard}</td></tr>`).join("")}</tbody></table></div>`;
  });

  bindForm(container, "#summary-form", (form) => {
    const result = summarizeCidrs(form.elements.networks.value.split(/\r?\n/).filter(Boolean));
    container.querySelector("#summary-result").innerHTML = rows([
      ["Summary", result.cidr], ["Netmask", result.netmask], ["Wildcard", result.wildcard], ["Range", `${result.network} – ${result.broadcast}`]
    ]);
  });
}
