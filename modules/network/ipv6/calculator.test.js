import assert from "node:assert/strict";
import test from "node:test";

import { calculateIPv6, reverseDnsIPv6 } from "./calculator.js";

test("reverse DNS expands compressed IPv6 addresses into RFC 3596 nibbles", () => {
  assert.equal(
    reverseDnsIPv6("2001:db8::1"),
    "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa"
  );
});

test("reverse DNS handles loopback and fully expanded input", () => {
  assert.equal(reverseDnsIPv6("::1"), "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa");
  const result = calculateIPv6("2001:0db8:0000:0000:0000:0000:0000:0001", 64);
  assert.equal(result.reverseDns, reverseDnsIPv6(result.address));
});

test("reverse DNS rejects invalid IPv6 input", () => {
  assert.throws(() => reverseDnsIPv6("2001:::1"), /valid IPv6 address/);
});
