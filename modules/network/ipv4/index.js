import { calculateSubnet } from "./calculator.js";
import { formatCalculation, formatCopyAll, resultFields } from "./formatter.js";
import { netmaskFromPrefix } from "./helpers.js";
import { validateCalculationInput, validateIPv4, validateNetmask, validatePrefix } from "./validation.js";
import { t } from "../../../assets/js/i18n.js";
import { exportCSV } from "../../shared/csv-export.js";

const STYLESHEET_ID = "ipv4-calculator-styles";

function ensureStyles() {
  if (document.getElementById(STYLESHEET_ID)) return;
  const link = document.createElement("link");
  link.id = STYLESHEET_ID;
  link.rel = "stylesheet";
  link.href = "modules/network/ipv4/style.css";
  document.head.append(link);
}

function outputMarkup() {
  return resultFields.map(([key, labelKey]) => {
    const label = t(labelKey);
    return `<div class="ipv4-result"><dt>${label}</dt><dd data-result="${key}">—</dd><button class="ipv4-copy" type="button" data-copy="${key}" aria-label="${t("ipv4CopyValue", { label })}" disabled>${t("copy")}</button></div>`;
  }).join("");
}

function fieldMarkup({ id, label, inputmode, value, spellcheck = true }) {
  const errorId = `${id}-error`;
  return `<label class="ipv4-field" for="${id}">${label}<input id="${id}" inputmode="${inputmode}" autocomplete="off" ${spellcheck ? "" : 'spellcheck="false"'} value="${value}" aria-describedby="${errorId}"><span class="ipv4-field-error" id="${errorId}"></span></label>`;
}

export function render() {
  return `<section class="ipv4-calculator"><header class="page-header"><div><p class="eyebrow">${t("ipv4Eyebrow")}</p><h1>${t("ipv4Title")}</h1><p class="page-summary">${t("ipv4Summary")}</p></div></header><section class="card" aria-label="${t("ipv4Workspace")}"><div class="ipv4-inputs">${fieldMarkup({ id: "ipv4-address", label: t("ipv4Address"), inputmode: "decimal", value: "192.168.1.42", spellcheck: false })}${fieldMarkup({ id: "ipv4-prefix", label: t("ipv4Prefix"), inputmode: "numeric", value: "/24" })}${fieldMarkup({ id: "ipv4-netmask", label: t("ipv4Netmask"), inputmode: "decimal", value: "255.255.255.0", spellcheck: false })}</div><div class="ipv4-actions"><button class="ipv4-button ipv4-button-primary" type="button" data-action="copy-all">${t("ipv4CopyAll")}</button><button class="ipv4-button" type="button" data-action="export-csv">${t("exportCsv")}</button><button class="ipv4-button" type="button" data-action="example">${t("ipv4Example")}</button><button class="ipv4-button" type="button" data-action="clear">${t("ipv4Clear")}</button></div><p class="ipv4-message" id="ipv4-message" role="status" aria-live="polite"></p></section><aside class="card ipv4-guidance" aria-labelledby="ipv4-guidance-title"><h2 id="ipv4-guidance-title">${t("ipv4GuidanceTitle")}</h2><p>${t("ipv4GuidanceSpecial")}</p><p>${t("ipv4GuidanceScope")}</p></aside><dl class="ipv4-results" aria-label="${t("ipv4Results")}">${outputMarkup()}</dl></section>`;
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    document.body.append(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  }
}

export function initialize(container) {
  ensureStyles();
  const address = container.querySelector("#ipv4-address");
  const prefix = container.querySelector("#ipv4-prefix");
  const netmask = container.querySelector("#ipv4-netmask");
  const message = container.querySelector("#ipv4-message");
  const copyAll = container.querySelector('[data-action="copy-all"]');
  const fields = { address, prefix, netmask };
  let formatted = null;

  const showMessage = (text, error = false) => {
    message.textContent = text;
    message.classList.toggle("is-error", error);
  };
  const setFieldState = (name, result) => {
    const field = fields[name];
    const error = container.querySelector(`#${field.id}-error`);
    field.setAttribute("aria-invalid", String(!result.valid));
    error.textContent = result.valid ? "" : t(result.message);
  };
  const renderResults = () => resultFields.forEach(([key]) => {
    container.querySelector(`[data-result="${key}"]`).textContent = formatted?.[key] ?? "—";
    container.querySelector(`[data-copy="${key}"]`).disabled = !formatted;
  });
  const invalidateCalculation = () => {
    formatted = null;
    copyAll.disabled = true;
    renderResults();
  };
  const recalculate = (source, announce = false) => {
    const addressResult = validateIPv4(address.value);
    let prefixResult = validatePrefix(prefix.value);
    let netmaskResult = validateNetmask(netmask.value);

    if (source === "netmask" && netmaskResult.valid) {
      prefix.value = `/${netmaskResult.value}`;
      prefixResult = validatePrefix(prefix.value);
    } else if (source !== "netmask" && prefixResult.valid) {
      netmask.value = netmaskFromPrefix(prefixResult.value);
      netmaskResult = validateNetmask(netmask.value);
    }

    setFieldState("address", addressResult);
    setFieldState("prefix", prefixResult);
    setFieldState("netmask", netmaskResult);

    const calculationInput = validateCalculationInput(address.value, prefix.value);
    if (!calculationInput.valid || !netmaskResult.valid) {
      invalidateCalculation();
      const firstError = addressResult.message || prefixResult.message || netmaskResult.message;
      showMessage(t(firstError), true);
      return;
    }

    formatted = formatCalculation(calculateSubnet(calculationInput.value.octets, calculationInput.value.prefix));
    copyAll.disabled = false;
    renderResults();
    showMessage(announce ? t("ipv4CalculationUpdated") : "");
  };

  address.addEventListener("input", () => recalculate("address"));
  prefix.addEventListener("input", () => recalculate("prefix"));
  netmask.addEventListener("input", () => recalculate("netmask"));
  container.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.action === "clear") {
      address.value = "";
      prefix.value = "";
      netmask.value = "";
      recalculate("address");
      address.focus();
      return;
    }
    if (button.dataset.action === "example") {
      address.value = "198.51.100.42";
      prefix.value = "/27";
      netmask.value = "255.255.255.224";
      recalculate("prefix", true);
      address.focus();
      return;
    }
    if (button.dataset.action === "export-csv" && formatted) {
      exportCSV("ipv4-calculator", ["IP", "CIDR", "Netmask", "Wildcard", "Network", "Broadcast", "First Host", "Last Host", "Host Count"], [[address.value, `${formatted.network}/${prefix.value.replace(/^\//, "")}`, netmask.value, formatted.wildcard, formatted.network, formatted.broadcast, formatted.firstHost, formatted.lastHost, formatted.usableHosts]]);
      return;
    }
    const text = button.dataset.copy && formatted ? formatted[button.dataset.copy] : button.dataset.action === "copy-all" && formatted ? formatCopyAll(formatted) : null;
    if (!text) return;
    showMessage(await copyText(text) ? t("ipv4Copied") : t("ipv4CopyFailed"));
  });
  recalculate("prefix");
}
