import { t } from "../../../assets/js/i18n.js";

export function normalizeMac(value) {
  const hex = String(value).replace(/[^0-9a-f]/gi, "").toUpperCase();
  if (!/^[0-9A-F]{12}$/.test(hex)) throw new TypeError("Invalid MAC address");
  return hex;
}

export function convertMac(value) {
  const hex = normalizeMac(value);
  const first = Number.parseInt(hex.slice(0, 2), 16);
  return {
    plain: hex,
    colon: hex.match(/../g).join(":"),
    hyphen: hex.match(/../g).join("-"),
    cisco: `${hex.slice(0, 4)}.${hex.slice(4, 8)}.${hex.slice(8, 12)}`,
    multicast: Boolean(first & 1),
    local: Boolean(first & 2),
    broadcast: hex === "FFFFFFFFFFFF"
  };
}

function resultRow(label, value) {
  return `<div class="result-row"><span>${label}</span><code>${value}</code><button type="button" data-copy="${value}">${t("copy")}</button></div>`;
}

export function render() {
  return `<header class="page-header"><div><p class="eyebrow">${t("network")}</p><h1>${t("macTitle")}</h1><p class="page-summary">${t("macSummary")}</p></div></header><section class="card tool-workspace"><label for="mac-input">${t("macInput")}</label><div class="tool-input-row"><input id="mac-input" autocomplete="off" placeholder="00:11:22:33:44:55"><button class="primary-button" id="mac-convert" type="button">${t("convert")}</button></div><p class="field-error" id="mac-error" role="alert"></p><div id="mac-results" class="result-list" aria-live="polite"></div></section>`;
}

export function initialize(container) {
  const input = container.querySelector("#mac-input");
  const results = container.querySelector("#mac-results");
  const error = container.querySelector("#mac-error");
  const run = ({ showError = true } = {}) => {
    try {
      const data = convertMac(input.value);
      error.textContent = "";
      const type = data.broadcast ? t("macBroadcast") : data.multicast ? t("macMulticast") : t("macUnicast");
      results.innerHTML = resultRow(t("macColon"), data.colon) + resultRow(t("macHyphen"), data.hyphen) + resultRow(t("macCisco"), data.cisco) + resultRow(t("macPlain"), data.plain) + `<div class="result-row"><span>${t("macType")}</span><strong>${type}</strong></div><div class="result-row"><span>${t("macAdministration")}</span><strong>${data.local ? t("macLocal") : t("macGlobal")}</strong></div>`;
    } catch {
      results.innerHTML = "";
      error.textContent = showError ? t("macInvalid") : "";
    }
  };
  container.querySelector("#mac-convert").addEventListener("click", run);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") run(); });
  input.addEventListener("input", () => {
    if (!input.value.trim()) {
      results.innerHTML = "";
      error.textContent = "";
      return;
    }
    run({ showError: false });
  });
  container.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (button) await navigator.clipboard?.writeText(button.dataset.copy);
  });
}
