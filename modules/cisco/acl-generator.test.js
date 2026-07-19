import assert from "node:assert/strict";
import test from "node:test";
import { buildExtendedAcl, normalizeAction, normalizeAddress } from "./acl-generator.js";

test("builds an extended Cisco ACL with hosts and ports", () => {
  assert.equal(buildExtendedAcl({ action: "permit", protocol: "tcp", source: "10.0.0.10", sourceMode: "host", destination: "192.0.2.10", destinationMode: "host", destinationPort: "443" }), "permit tcp host 10.0.0.10 host 192.0.2.10 eq 443");
});

test("builds network and any ACL operands", () => {
  assert.equal(buildExtendedAcl({ action: "deny", protocol: "ip", source: "10.0.0.0", destination: "any", destinationMode: "any" }), "deny ip 10.0.0.0 any");
});

test("rejects invalid actions and addresses", () => {
  assert.throws(() => normalizeAction("allow"), /permit or deny/);
  assert.throws(() => normalizeAddress("300.1.1.1"), /valid IPv4/);
});
