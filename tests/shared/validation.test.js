import test from "node:test";
import assert from "node:assert/strict";

import {
  isValidCIDR,
  isValidFQDN,
  isValidHostname,
  isValidIPv4,
  isValidIPv6,
  normalizeHostname,
  normalizeIPv4,
  normalizeIPv6
} from "../../modules/network/shared/validation.js";

test("validates and normalizes IPv4 addresses", () => {
  assert.equal(isValidIPv4("192.168.1.42"), true);
  assert.equal(isValidIPv4(" 192.168.1.42 "), true);
  assert.equal(isValidIPv4("256.1.1.1"), false);
  assert.equal(isValidIPv4("1.2.3"), false);
  assert.equal(normalizeIPv4(" 10.0.0.1 "), "10.0.0.1");
});

test("validates and normalizes IPv6 addresses", () => {
  assert.equal(isValidIPv6("2001:db8::1"), true);
  assert.equal(isValidIPv6("2001:0db8:0000:0000:0000:0000:0000:0001"), true);
  assert.equal(isValidIPv6("::1"), true);
  assert.equal(isValidIPv6("2001:::1"), false);
  assert.equal(normalizeIPv6("2001:0db8:0000:0000:0000:0000:0000:0001"), "2001:db8::1");
});

test("validates IPv4 and IPv6 CIDR notation", () => {
  assert.equal(isValidCIDR("192.168.1.0/24"), true);
  assert.equal(isValidCIDR("192.168.1.0/33"), false);
  assert.equal(isValidCIDR("2001:db8::/64"), true);
  assert.equal(isValidCIDR("2001:db8::/129"), false);
});

test("validates hostnames and FQDNs", () => {
  assert.equal(isValidHostname("localhost"), true);
  assert.equal(isValidHostname("example.com"), true);
  assert.equal(isValidHostname("sub.domain.example"), true);
  assert.equal(isValidHostname("bad_name.example"), false);
  assert.equal(isValidHostname("-bad.example"), false);
  assert.equal(isValidHostname("bad-.example"), false);
  assert.equal(isValidHostname(`${"a".repeat(64)}.example`), false);
  assert.equal(isValidFQDN("example.com"), true);
  assert.equal(isValidFQDN("localhost"), false);
  assert.equal(normalizeHostname(" Example.COM. "), "example.com");
});
