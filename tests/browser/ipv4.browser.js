import { initialize, render } from "../../modules/network/ipv4/index.js";

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

async function run(name, test) {
  try {
    await test();
    report(name, true);
  } catch (error) {
    report(name, false, error instanceof Error ? error.message : String(error));
  }
}

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
  copyAll.click();
  await Promise.resolve();
  await Promise.resolve();
  assert(copied.includes("Network: 192.0.2.0"), "formatted results were not copied");
  assert(message.textContent === "Copied to clipboard.", "copy success was not announced");
});

const summary = document.createElement("p");
summary.id = "test-summary";
summary.textContent = failures === 0 ? "All browser tests passed." : `${failures} browser test(s) failed.`;
summary.className = failures === 0 ? "test-pass" : "test-fail";
results.after(summary);
document.documentElement.dataset.testStatus = failures === 0 ? "passed" : "failed";
