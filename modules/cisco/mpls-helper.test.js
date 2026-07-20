import assert from "node:assert/strict";
import test from "node:test";
import { buildMplsConfig } from "./mpls-helper.js";
test("builds MPLS LDP configuration", () => { assert.match(buildMplsConfig({ routerId: "10.0.0.1", interfaces: ["GigabitEthernet1/0/1"] }), /mpls ip/); });
test("rejects invalid protocol and interfaces", () => { assert.throws(() => buildMplsConfig({ protocol: "foo", routerId: "10.0.0.1", interfaces: ["Gi1"] }), /Unsupported/); assert.throws(() => buildMplsConfig({ routerId: "bad", interfaces: ["Gi1"] }), /router ID/); });
