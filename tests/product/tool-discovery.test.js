import assert from "node:assert/strict";
import test from "node:test";
import { localizedTools, searchTools } from "../../assets/js/tool-catalog.js";

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value))
  };
}

test("tool search matches names, descriptions and keywords", () => {
  assert.deepEqual(searchTools("ipv6").map(({ id }) => id), ["ipv6", "ipv6-prefix-delegation"]);
  assert.deepEqual(searchTools("wildcard summary").map(({ id }) => id), ["subnet-planner"]);
  assert.equal(searchTools("does-not-exist").length, 0);
});

test("tools are assigned to their owning product category", () => {
  assert.equal(localizedTools().find(({ id }) => id === "ipv4").category, "Network");
  assert.equal(localizedTools().find(({ id }) => id === "acl-generator").category, "Cisco");
  assert.equal(localizedTools().find(({ id }) => id === "powershell-generator").category, "Windows");
  assert.equal(localizedTools().find(({ id }) => id === "password-generator").category, "Security");
});

test("tools retain stable category identifiers across localization", () => {
  assert.equal(localizedTools().find(({ id }) => id === "password-generator").categoryId, "security");
  assert.equal(localizedTools().find(({ id }) => id === "json-formatter").categoryId, "developer");
});

test("favorites and recents persist in namespaced storage", async () => {
  global.localStorage = createStorage();
  const state = await import(`../../assets/js/tool-state.js?test=${Date.now()}`);
  assert.deepEqual(state.toggleFavorite("ipv4"), ["ipv4"]);
  assert.equal(state.isFavorite("ipv4"), true);
  assert.deepEqual(state.toggleFavorite("ipv4"), []);
  state.recordRecentTool("ipv4");
  state.recordRecentTool("ipv6");
  state.recordRecentTool("ipv4");
  assert.deepEqual(state.getRecentTools(), ["ipv4", "ipv6"]);
  delete global.localStorage;
});
