import { calculateSubnet } from "./calculator.js";
import { formatCalculation, formatCopyAll, resultFields } from "./formatter.js";
import { netmaskFromPrefix } from "./helpers.js";
import { validateCalculationInput, validateNetmask } from "./validation.js";

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
  return resultFields.map(([key, label]) => `<div class="ipv4-result"><dt>${label}</dt><dd data-result="${key}">—</dd><button class="ipv4-copy" type="button" data-copy="${key}" aria-label="Copy ${label}" disabled>Copy</button></div>`).join("");
}

export function render() {
  return `<section class="ipv4-calculator"><header class="page-header"><div><p class="eyebrow">Network tools</p><h1>IPv4 Calculator</h1><p class="page-summary">Calculate IPv4 subnet details instantly from an address and either a prefix or netmask.</p></div></header><section class="card" aria-label="IPv4 calculator"><div class="ipv4-inputs"><label class="ipv4-field" for="ipv4-address">IPv4 address<input id="ipv4-address" inputmode="decimal" autocomplete="off" spellcheck="false" value="192.168.1.42" aria-describedby="ipv4-message"></label><label class="ipv4-field" for="ipv4-prefix">Prefix (for example /24)<input id="ipv4-prefix" inputmode="numeric" autocomplete="off" value="/24" aria-describedby="ipv4-message"></label><label class="ipv4-field" for="ipv4-netmask">Netmask<input id="ipv4-netmask" inputmode="decimal" autocomplete="off" spellcheck="false" value="255.255.255.0" aria-describedby="ipv4-message"></label></div><div class="ipv4-actions"><button class="ipv4-button ipv4-button-primary" type="button" data-action="copy-all">Copy all</button><button class="ipv4-button" type="button" data-action="example">Example</button><button class="ipv4-button" type="button" data-action="clear">Clear</button></div><p class="ipv4-message" id="ipv4-message" role="status" aria-live="polite"></p></section><dl class="ipv4-results" aria-label="IPv4 calculation results">${outputMarkup()}</dl></section>`;
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
  let formatted = null;

  const showMessage = (text, error = false) => { message.textContent = text; message.classList.toggle("is-error", error); };
  const renderResults = () => resultFields.forEach(([key]) => {
    container.querySelector(`[data-result="${key}"]`).textContent = formatted?.[key] ?? "—";
    container.querySelector(`[data-copy="${key}"]`).disabled = !formatted;
  });
  const recalculate = (source) => {
    let prefixValue = prefix.value;
    if (source === "netmask") {
      const netmaskResult = validateNetmask(netmask.value);
      if (!netmaskResult.valid) {
        formatted = null;
        [address, prefix, netmask].forEach((input) => input.setAttribute("aria-invalid", "true"));
        copyAll.disabled = true;
        renderResults();
        showMessage(netmaskResult.message, true);
        return;
      }
      prefixValue = `/${netmaskResult.value}`;
      prefix.value = prefixValue;
    }
    const input = validateCalculationInput(address.value, prefixValue);
    formatted = input.valid ? formatCalculation(calculateSubnet(input.value.octets, input.value.prefix)) : null;
    if (input.valid && source !== "netmask") netmask.value = netmaskFromPrefix(input.value.prefix);
    const invalid = !input.valid;
    [address, prefix, netmask].forEach((field) => field.setAttribute("aria-invalid", String(invalid)));
    copyAll.disabled = invalid;
    renderResults();
    showMessage(invalid ? input.message : "Calculation updated.", invalid);
  };

  address.addEventListener("input", () => recalculate("address"));
  prefix.addEventListener("input", () => recalculate("prefix"));
  netmask.addEventListener("input", () => recalculate("netmask"));
  container.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.action === "clear") { address.value = ""; prefix.value = ""; netmask.value = ""; recalculate("address"); address.focus(); return; }
    if (button.dataset.action === "example") { address.value = "198.51.100.42"; prefix.value = "/27"; netmask.value = "255.255.255.224"; recalculate("prefix"); address.focus(); return; }
    const text = button.dataset.copy && formatted ? formatted[button.dataset.copy] : button.dataset.action === "copy-all" && formatted ? formatCopyAll(formatted) : null;
    if (!text) return;
    showMessage(await copyText(text) ? "Copied to clipboard." : "Copy failed; select the value and copy it manually.");
  });
  recalculate("prefix");
}
