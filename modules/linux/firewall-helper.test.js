import assert from "node:assert/strict";
import test from "node:test";
import { buildFirewallRule } from "./firewall-helper.js";
test("builds nftables and iptables rules", () => { assert.match(buildFirewallRule({ source:"192.0.2.0/24", destinationPort:443 }), /ip saddr/); assert.match(buildFirewallRule({ backend:"iptables", source:"any", destinationPort:22, action:"drop" }), /DROP/); });
test("rejects invalid rules", () => assert.throws(() => buildFirewallRule({ source:"bad", destinationPort:22 }), /source/));
