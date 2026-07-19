import { allocateVlsm, cidrDetails, summarizeCidrs } from "./calculator.js";
import { t } from "../../../assets/js/i18n.js";
import { exportCSV } from "../../shared/csv-export.js";

function rows(entries) {
  return entries.map(([label, value]) => `<div class="result-row"><dt>${label}</dt><dd>${value}</dd></div>`).join("");
}

export function render() {
  return `<section><header class="page-header"><div><p class="eyebrow">Network tool</p><h1>Subnet Planner</h1><p class="page-summary">Calculate CIDR details and wildcard masks, allocate VLSM networks, and summarize routes.</p></div></header>
  <section class="card"><h2>CIDR and wildcard</h2><form id="cidr-form"><div class="form-grid"><label>IPv4 address<input name="address" value="192.168.10.42" autocomplete="off"></label><label>Prefix<input name="prefix" type="number" min="0" max="32" value="24"></label></div><button type="submit">Calculate</button><button type="button" id="cidr-export">${t("exportCsv")}</button><p class="form-error" role="alert"></p></form><dl id="cidr-result" class="result-list"></dl></section>
  <section class="card"><h2>VLSM allocation</h2><form id="vlsm-form"><div class="form-grid"><label>Base network<input name="address" value="10.0.0.0" autocomplete="off"></label><label>Base prefix<input name="prefix" type="number" min="0" max="32" value="24"></label></div><label>Requirements, one per line (name: hosts)<textarea name="requirements" rows="5">Users: 100
Voice: 40
Printers: 20
Management: 10</textarea></label><button type="submit">Allocate</button><button type="button" id="vlsm-export">${t("exportCsv")}</button><p class="form-error" role="alert"></p></form><div id="vlsm-result"></div></section>
  <section class="card"><h2>Route summarization</h2><form id="summary-form"><label>CIDR networks, one per line<textarea name="networks" rows="5">192.168.0.0/24
192.168.1.0/24
192.168.2.0/24
192.168.3.0/24</textarea></label><button type="submit">Summarize</button><button type="button" id="summary-export">${t("exportCsv")}</button><p class="form-error" role="alert"></p></form><dl id="summary-result" class="result-list"></dl></section></section>`;
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
  let cidrExport;
  let vlsmExport;
  let summaryExport;
  bindForm(container, "#cidr-form", (form) => {
    const result = cidrDetails(form.elements.address.value, form.elements.prefix.value);
    cidrExport = result;
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
    vlsmExport = allocations;
    container.querySelector("#vlsm-result").innerHTML = `<div class="table-wrapper"><table><thead><tr><th>Name</th><th>Hosts</th><th>CIDR</th><th>Range</th><th>Wildcard</th></tr></thead><tbody>${allocations.map((item) => `<tr><td>${item.name}</td><td>${item.requestedHosts}</td><td>${item.cidr}</td><td>${item.network} – ${item.broadcast}</td><td>${item.wildcard}</td></tr>`).join("")}</tbody></table></div>`;
  });

  bindForm(container, "#summary-form", (form) => {
    const result = summarizeCidrs(form.elements.networks.value.split(/\r?\n/).filter(Boolean));
    summaryExport = result;
    container.querySelector("#summary-result").innerHTML = rows([
      ["Summary", result.cidr], ["Netmask", result.netmask], ["Wildcard", result.wildcard], ["Range", `${result.network} – ${result.broadcast}`]
    ]);
  });
  container.querySelector("#cidr-export").addEventListener("click", () => { if (cidrExport) exportCSV("cidr-details", ["CIDR", "Netmask", "Wildcard", "Broadcast", "Addresses", "Hosts"], [[cidrExport.cidr, cidrExport.netmask, cidrExport.wildcard, cidrExport.broadcast, cidrExport.totalAddresses, cidrExport.usableHosts]]); });
  container.querySelector("#vlsm-export").addEventListener("click", () => { if (vlsmExport) exportCSV("vlsm-plan", ["Name", "Hosts", "CIDR", "Network", "Broadcast", "Wildcard"], vlsmExport.map((item) => [item.name, item.requestedHosts, item.cidr, item.network, item.broadcast, item.wildcard])); });
  container.querySelector("#summary-export").addEventListener("click", () => { if (summaryExport) exportCSV("route-summary", ["CIDR", "Network", "Broadcast", "Netmask", "Wildcard"], [[summaryExport.cidr, summaryExport.network, summaryExport.broadcast, summaryExport.netmask, summaryExport.wildcard]]); });
}
