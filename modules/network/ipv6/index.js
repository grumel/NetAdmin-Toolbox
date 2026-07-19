import { calculateIPv6 } from "./calculator.js";
import { t } from "../../../assets/js/i18n.js";
import { exportCSV } from "../../shared/csv-export.js";

function resultRows(result) {
  return [
    ["Compressed", result.address],
    ["Expanded", result.expanded],
    ["Network", `${result.network}/${result.prefix}`],
    ["Last address", result.lastAddress],
    ["Address count", result.addressCount.toString()],
    ["Reverse DNS", result.reverseDns],
    ["Type", result.type]
  ].map(([label, value]) => `<div class="result-row"><dt>${label}</dt><dd>${value}</dd></div>`).join("");
}

export function render() {
  return `<section><header class="page-header"><div><p class="eyebrow">Network tool</p><h1>IPv6 Calculator</h1><p class="page-summary">Expand and compress IPv6 addresses and inspect subnet boundaries.</p></div></header><section class="card"><form id="ipv6-form"><div class="form-grid"><label>IPv6 address<input id="ipv6-address" name="address" value="2001:db8:1234::10" autocomplete="off" spellcheck="false"></label><label>Prefix<input id="ipv6-prefix" name="prefix" type="number" min="0" max="128" value="64"></label></div><button type="submit">Calculate</button><button type="button" id="ipv6-export">${t("exportCsv")}</button><p id="ipv6-error" class="form-error" role="alert"></p></form></section><section class="card" aria-live="polite"><h2>Result</h2><dl id="ipv6-result" class="result-list"></dl></section></section>`;
}

export function initialize(container) {
  const form = container.querySelector("#ipv6-form");
  const output = container.querySelector("#ipv6-result");
  const error = container.querySelector("#ipv6-error");
  let latest = null;
  const calculate = () => {
    try {
      const result = calculateIPv6(form.elements.address.value, form.elements.prefix.value);
      latest = result;
      output.innerHTML = resultRows(result);
      error.textContent = "";
    } catch (exception) {
      output.innerHTML = "";
      error.textContent = exception.message;
    }
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); calculate(); });
  container.querySelector("#ipv6-export").addEventListener("click", () => { if (latest) exportCSV("ipv6-calculator", ["Address", "Prefix", "Network", "First Host", "Last Host", "Address Count"], [[latest.address, latest.prefix, latest.network, latest.network, latest.lastAddress, latest.addressCount.toString()]]); });
  calculate();
}
