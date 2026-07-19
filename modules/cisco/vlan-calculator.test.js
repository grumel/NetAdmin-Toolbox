import assert from "node:assert/strict";
import test from "node:test";
import { buildVlanConfig, parseVlanId, vlanDetails } from "./vlan-calculator.js";
test("classifies normal and extended VLAN ranges", () => { assert.deepEqual(vlanDetails(100), { id: 100, range: "normal", usable: true }); assert.deepEqual(vlanDetails(2000), { id: 2000, range: "extended", usable: true }); });
test("builds Cisco access-port VLAN configuration", () => { assert.equal(buildVlanConfig({ id: 20, name: "Users", interfaceName: "GigabitEthernet1/0/2" }), "vlan 20\n name Users\ninterface GigabitEthernet1/0/2\n switchport mode access\n switchport access vlan 20"); });
test("rejects invalid IDs and names", () => { assert.throws(() => parseVlanId(4095), /1 to 4094/); assert.throws(() => buildVlanConfig({ id: 10, name: "bad name" }), /VLAN name/); });
