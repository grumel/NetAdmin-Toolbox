import assert from "node:assert/strict";
import test from "node:test";
import { buildDhcpScope } from "./dhcp-helper.js";
test("builds a PowerShell DHCP scope command", () => { assert.equal(buildDhcpScope({ name: "Office", network: "192.0.2.42", prefix: 24, start: "192.0.2.10", end: "192.0.2.200" }).command, "Add-DhcpServerv4Scope -Name 'Office' -StartRange 192.0.2.10 -EndRange 192.0.2.200 -SubnetMask 255.255.255.0"); });
test("rejects invalid DHCP scope data", () => { assert.throws(() => buildDhcpScope({ name: "bad\nname", network: "10.0.0.0", prefix: 24, start: "10.0.0.1", end: "10.0.0.2" }), /valid DHCP/); });
