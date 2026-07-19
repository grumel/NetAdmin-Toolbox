import { buildExtendedAcl } from "../acl-generator.js";
import { t } from "../../../assets/js/i18n.js";

export function render() {
  const de = t("network") === "Netzwerk";
  const labels = de ? ["Aktion", "Protokoll", "Quellmodus", "Quell-IPv4", "Zielmodus", "Ziel-IPv4", "Zielport (optional)", "Generieren"] : ["Action", "Protocol", "Source mode", "Source IPv4", "Destination mode", "Destination IPv4", "Destination port (optional)", "Generate"];
  return `<section><header class="page-header"><div><p class="eyebrow">Cisco</p><h1>${de ? "ACL-Generator" : "ACL Generator"}</h1><p class="page-summary">${de ? "Cisco Extended-IPv4-Zugriffslisteneinträge erstellen." : "Build a Cisco extended IPv4 access-control entry."}</p></div></header><section class="card tool-workspace"><form id="acl-form" class="tool-form"><label>${labels[0]}<select name="action"><option>permit</option><option>deny</option></select></label><label>${labels[1]}<select name="protocol"><option>ip</option><option>tcp</option><option>udp</option><option>icmp</option></select></label><label>${labels[3]}<input name="source" value="10.0.0.0" autocomplete="off"></label><label>${labels[2]}<select name="sourceMode"><option value="network">Network</option><option value="host">Host</option><option value="any">Any</option></select></label><label>${labels[5]}<input name="destination" value="192.0.2.0" autocomplete="off"></label><label>${labels[4]}<select name="destinationMode"><option value="network">Network</option><option value="host">Host</option><option value="any">Any</option></select></label><label>${labels[6]}<input name="destinationPort" inputmode="numeric" placeholder="443"></label><button type="submit">${labels[7]}</button></form><p id="acl-error" role="alert"></p><output id="acl-output" aria-live="polite"></output></section></section>`;
}

export function initialize(container) {
  const form = container.querySelector("#acl-form");
  const output = container.querySelector("#acl-output");
  const error = container.querySelector("#acl-error");
  const run = () => {
    try {
      output.textContent = buildExtendedAcl(Object.fromEntries(new FormData(form)));
      error.textContent = "";
    } catch (exception) { output.textContent = ""; error.textContent = exception.message; }
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); run(); });
  run();
}
