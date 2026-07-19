import assert from "node:assert/strict";
import test from "node:test";

import { calculateIPv6, classifyIPv6, compressIPv6, expandIPv6, parseIPv6 } from "../modules/network/ipv6/calculator.js";
import { allocateVlsm, cidrDetails, summarizeCidrs } from "../modules/network/subnet-tools/calculator.js";

test("IPv6 parsing, expansion and compression are canonical", () => {
  const value = parseIPv6("2001:0db8:0000:0000:0000:ff00:0042:8329");
  assert.equal(expandIPv6(value), "2001:0db8:0000:0000:0000:ff00:0042:8329");
  assert.equal(compressIPv6(value), "2001:db8::ff00:42:8329");
  assert.equal(compressIPv6(parseIPv6("::")), "::");
  assert.equal(compressIPv6(parseIPv6("::1")), "::1");
});

test("IPv6 calculator returns subnet boundaries", () => {
  const result = calculateIPv6("2001:db8:1234:5678::abcd", 64);
  assert.equal(result.network, "2001:db8:1234:5678::");
  assert.equal(result.lastAddress, "2001:db8:1234:5678:ffff:ffff:ffff:ffff");
  assert.equal(result.addressCount, 1n << 64n);
});

test("IPv6 address types are classified by prefix", () => {
  assert.equal(classifyIPv6("::"), "Unspecified");
  assert.equal(classifyIPv6("::1"), "Loopback");
  assert.equal(classifyIPv6("fd00::1"), "Unique local");
  assert.equal(classifyIPv6("fe80::1"), "Link-local");
  assert.equal(classifyIPv6("ff02::1"), "Multicast");
  assert.equal(classifyIPv6("2001:db8::1"), "Global unicast");
});

test("invalid IPv6 inputs are rejected", () => {
  assert.throws(() => parseIPv6("2001::db8::1"), TypeError);
  assert.throws(() => calculateIPv6("2001:db8::1", 129), RangeError);
});

test("CIDR details include netmask and wildcard", () => {
  assert.deepEqual(cidrDetails("192.168.10.42", 24), {
    cidr: "192.168.10.0/24",
    network: "192.168.10.0",
    broadcast: "192.168.10.255",
    netmask: "255.255.255.0",
    wildcard: "0.0.0.255",
    totalAddresses: 256,
    usableHosts: 254
  });
});

test("VLSM allocates largest requirements first without overlap", () => {
  const result = allocateVlsm("10.0.0.0", 24, [
    { name: "Small", hosts: 10 },
    { name: "Large", hosts: 100 },
    { name: "Medium", hosts: 40 }
  ]);
  assert.deepEqual(result.map(({ name, cidr }) => ({ name, cidr })), [
    { name: "Large", cidr: "10.0.0.0/25" },
    { name: "Medium", cidr: "10.0.0.128/26" },
    { name: "Small", cidr: "10.0.0.192/28" }
  ]);
});

test("VLSM rejects allocations that exceed the base network", () => {
  assert.throws(() => allocateVlsm("10.0.0.0", 30, [10]), RangeError);
});

test("route summarization returns the smallest covering supernet", () => {
  const result = summarizeCidrs([
    "192.168.0.0/24",
    "192.168.1.0/24",
    "192.168.2.0/24",
    "192.168.3.0/24"
  ]);
  assert.equal(result.cidr, "192.168.0.0/22");
  assert.equal(result.wildcard, "0.0.3.255");
});
