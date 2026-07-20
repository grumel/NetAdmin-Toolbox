import assert from "node:assert/strict";
import test from "node:test";
import { localizedTools } from "../../assets/js/tool-catalog.js";

test("every catalogued tool has an accessible discovery name and route", () => {
  const tools = localizedTools();
  assert.ok(tools.length > 0);
  for (const tool of tools) {
    assert.equal(typeof tool.name, "string");
    assert.ok(tool.name.trim());
    assert.match(tool.route, /^[a-z0-9-]+$/);
    assert.ok(tool.description.trim());
  }
});
