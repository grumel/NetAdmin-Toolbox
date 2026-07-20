import assert from "node:assert/strict";
import test from "node:test";
import { buildVxlanConfig } from "./vxlan-helper.js";
test("builds a VXLAN NVE configuration", () => { assert.match(buildVxlanConfig({ vni: 10010, vlan: 10 }), /member vni 10010/); });
test("rejects invalid VXLAN identifiers", () => { assert.throws(() => buildVxlanConfig({ vni: 0, vlan: 10 }), /VNI/); assert.throws(() => buildVxlanConfig({ vni: 10, vlan: 5000 }), /VLAN/); });
