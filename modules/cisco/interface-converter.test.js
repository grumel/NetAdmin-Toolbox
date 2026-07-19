import assert from "node:assert/strict";
import test from "node:test";
import { convertInterface, parseInterface } from "./interface-converter.js";

test("converts Cisco interface abbreviations to canonical names", () => {
  assert.deepEqual(convertInterface("Gi1/0/24"), { input: "Gi1/0/24", canonical: "GigabitEthernet1/0/24", abbreviated: "Gi1/0/24", type: "GigabitEthernet", number: "1/0/24" });
});
test("accepts full names and rejects malformed interfaces", () => { assert.equal(parseInterface("Loopback0").canonical, "Loopback0"); assert.throws(() => parseInterface("Port1"), /valid Cisco interface/); });
