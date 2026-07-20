import assert from "node:assert/strict";
import test from "node:test";
import { buildStpConfig } from "./stp-helper.js";
test("builds primary STP configuration", () => { assert.equal(buildStpConfig({ vlan: 20, role: "root primary", priority: 4096 }), "spanning-tree vlan 20 root primary\nspanning-tree vlan 20 priority 4096"); });
test("rejects invalid VLAN and priority", () => { assert.throws(() => buildStpConfig({ vlan: 0 }), /1-4094/); assert.throws(() => buildStpConfig({ vlan: 10, priority: 100 }), /multiple/); });
