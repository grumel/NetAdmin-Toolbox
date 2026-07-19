import { initialize, render } from "../../modules/network/ipv4/index.js";
import { setLocale } from "../../assets/js/i18n.js";

const results = document.querySelector("#test-results");
const fixture = document.querySelector("#test-fixture");
let failures = 0;

function report(name, passed, detail = "") {
  const item = document.createElement("li");
  item.className = passed ? "test-pass" : "test-fail";
  item.textContent = `${passed ? "PASS" : "FAIL"}: ${name}${detail ? ` — ${detail}` : ""}`;
  results.append(item);
  if (!passed) failures += 1;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function inputValue(element, value) {
  element.value = value;
  element.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: value }));
}

async function settleClick(button) {
  button.click();
  await Promise.resolve();
  await Promise.resolve();
}

async function run(name, test) {
  try {
    await test();
    report(name, true);
  } catch (error) {
    report(name, false, error instanceof Error ? error.message : String(error));
  }
}

setLocale("en");
fixture.innerHTML = render();
initialize(fixture);

const address = fixture.querySelector("#ipv4-address");
const prefix = fixture.querySelector("#ipv4-prefix");
const netmask = fixture.querySelector("#ipv4-netmask");
const message = fixture.querySelector("#ipv4-message");
const clear = fixture.querySelector('[data-action="clear"]');
const example = fixture.querySelector('[data-action="example"]');
const copyAll = fixture.querySelector('[data-action="copy-all"]');

await run("initial values calculate a subnet", () => {
  assert(fixture.querySelector('[data-result="network"]').textContent === "192.168.1.0", "initial network was not rendered");
  assert(copyAll.disabled === false, "copy-all should be enabled");
});

await run("invalid address updates only the address field", () => {
  inputValue(address, "192.168.1");
  assert(address.getAttribute("aria-invalid") === "true", "address was not marked invalid");
  assert(prefix.getAttribute("aria-invalid") === "false", "prefix should remain valid");
  assert(netmask.getAttribute("aria-invalid") === "false", "netmask should remain valid");
  assert(document.querySelector("#ipv4-address-error")?.textContent.includes("valid IPv4"), "address error was not associated with the field");
  assert(message.classList.contains("is-error"), "status message should expose the error state");
  assert(copyAll.disabled === true, "copy-all should be disabled for invalid input");
});

await run("correcting the address clears the live error", () => {
  inputValue(address, "10.0.0.1");
  assert(address.getAttribute("aria-invalid") === "false", "address error did not clear");
  assert(document.querySelector("#ipv4-address-error")?.textContent === "", "field error text did not clear");
  assert(fixture.querySelector('[data-result="network"]').textContent === "10.0.0.0", "results were not recalculated");
  assert(message.textContent === "", "successful typing should not be announced");
});

await run("prefix input synchronizes the netmask", () => {
  inputValue(prefix, "/30");
  assert(netmask.value === "255.255.255.252", "netmask did not follow the prefix");
  assert(fixture.querySelector('[data-result="totalAddresses"]').textContent === "4", "prefix result was not updated");
});

await run("invalid prefix state does not invalidate the other fields", () => {
  inputValue(prefix, "/40");
  assert(prefix.getAttribute("aria-invalid") === "true", "prefix was not marked invalid");
  assert(address.getAttribute("aria-invalid") === "false", "address should remain valid");
  assert(netmask.getAttribute("aria-invalid") === "false", "netmask should remain valid");
  inputValue(prefix, "/24");
});

await run("netmask input synchronizes the prefix", () => {
  inputValue(netmask, "255.255.255.128");
  assert(prefix.value === "/25", "prefix did not follow the netmask");
});

await run("controls are native keyboard-focusable elements", () => {
  for (const control of [address, prefix, netmask, copyAll, example, clear]) {
    assert(control.matches("input, button"), `${control.id || control.dataset.action} is not a native control`);
    control.focus();
    assert(document.activeElement === control, `${control.id || control.dataset.action} could not receive focus`);
  }
});

await run("example and clear actions preserve a useful keyboard focus target", () => {
  example.focus();
  example.click();
  assert(document.activeElement === address, "example action should return focus to the address field");
  assert(address.value === "198.51.100.42", "example values were not applied");

  clear.focus();
  clear.click();
  assert(document.activeElement === address, "clear action should return focus to the address field");
  assert(address.value === "" && prefix.value === "" && netmask.value === "", "clear action did not empty all fields");
});

await run("copy-all reports clipboard success", async () => {
  inputValue(address, "192.0.2.1");
  inputValue(prefix, "/24");
  let copied = "";
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (value) => { copied = value; } }
  });
  copyAll.focus();
  await settleClick(copyAll);
  assert(copied.includes("Network: 192.0.2.0"), "formatted results were not copied");
  assert(message.textContent === "Copied to clipboard.", "copy success was not announced");
});

await run("clipboard rejection uses the execCommand fallback", async () => {
  let fallbackCalled = false;
  let fallbackText = "";
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async () => { throw new DOMException("Denied", "NotAllowedError"); } }
  });
  const originalExecCommand = document.execCommand;
  document.execCommand = (command) => {
    fallbackCalled = command === "copy";
    fallbackText = document.querySelector("textarea")?.value ?? "";
    return true;
  };
  try {
    await settleClick(copyAll);
    assert(fallbackCalled, "execCommand copy fallback was not called");
    assert(fallbackText.includes("Network: 192.0.2.0"), "fallback textarea did not contain formatted results");
    assert(message.textContent === "Copied to clipboard.", "fallback success was not announced");
    assert(document.querySelector("textarea") === null, "temporary fallback textarea was not removed");
  } finally {
    document.execCommand = originalExecCommand;
  }
});

await run("missing clipboard API and failed fallback report an error", async () => {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
  const originalExecCommand = document.execCommand;
  document.execCommand = () => false;
  try {
    await settleClick(copyAll);
    assert(message.textContent === "Copy failed; select the value and copy it manually.", "copy failure guidance was not shown");
    assert(document.querySelector("textarea") === null, "temporary textarea remained after fallback failure");
  } finally {
    document.execCommand = originalExecCommand;
  }
});

await run("language changes re-render translated IPv4 UI and results", () => {
  setLocale("de");
  fixture.innerHTML = render();
  initialize(fixture);
  assert(fixture.querySelector("h1")?.textContent === "IPv4-Rechner", "IPv4 title was not translated");
  assert(fixture.querySelector("label[for='ipv4-address']")?.textContent.includes("IPv4-Adresse"), "IPv4 input label was not translated");
  assert(fixture.querySelector('[data-action="copy-all"]')?.textContent === "Alle kopieren", "copy-all button was not translated");
  assert(fixture.querySelector('[data-result="rfc1918"]')?.textContent === "Ja", "result text was not translated");
  setLocale("en");
});

const summary = document.createElement("p");
summary.id = "test-summary";
summary.textContent = failures === 0 ? "All browser tests passed." : `${failures} browser test(s) failed.`;
summary.className = failures === 0 ? "test-pass" : "test-fail";
results.after(summary);
document.documentElement.dataset.testStatus = failures === 0 ? "passed" : "failed";
