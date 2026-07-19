import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { calculateSubnet } from "./calculator.js";
import { formatBinary, formatBoolean, formatCalculation, formatCopyAll, formatHex, formatReverseDns } from "./formatter.js";
import { historicalAddressClass, integerToIPv4, IPV4_SPECIAL_USE_RANGES, ipv4ToInteger, isInAnySubnet, isInSubnet, maskFromPrefix, netmaskFromPrefix, parseIPv4, parsePrefix, prefixFromNetmask, UINT32_MAX } from "./helpers.js";
import { validateCalculationInput, validateIPv4, validateNetmask, validatePrefix } from "./validation.js";

test("IPv4 helper conversions round-trip correctly", () => {
  const octets = parseIPv4("192.168.1.42");
  assert.deepEqual(octets, [192, 168, 1, 42]);
  assert.equal(ipv4ToInteger(octets), 3232235818);
  assert.equal(integerToIPv4(3232235818), "192.168.1.42");
  assert.equal(parseIPv4("300.1.1.1"), null);
  assert.equal(parsePrefix("/24"), 24);
  assert.equal(parsePrefix("33"), null);
});

test("exported helpers reject invalid input without throwing", () => {
  assert.equal(ipv4ToInteger([192, 168, 1]), null);
  assert.equal(ipv4ToInteger([192, 168, 1, 999]), null);
  assert.equal(integerToIPv4(-1), null);
  assert.equal(integerToIPv4(UINT32_MAX + 1), null);
  assert.equal(prefixFromNetmask([255, 255, 999, 0]), null);
  assert.equal(isInSubnet(-1, 0, 0), false);
  assert.equal(isInSubnet(0, UINT32_MAX + 1, 0), false);
  assert.equal(isInAnySubnet(0, null), false);
  assert.equal(isInAnySubnet(0, [[0, 99]]), false);
  assert.equal(historicalAddressClass(-1), null);
  assert.equal(historicalAddressClass(256), null);
});

test("every prefix from /0 through /32 produces the correct mask and size", () => {
  for (let prefix = 0; prefix <= 32; prefix += 1) {
    const mask = maskFromPrefix(prefix);
    const netmask = netmaskFromPrefix(prefix);
    assert.notEqual(mask, null, `mask /${prefix}`);
    assert.notEqual(netmask, null, `netmask /${prefix}`);
    assert.equal(prefixFromNetmask(netmask), prefix, `round-trip /${prefix}`);

    const result = calculateSubnet([203, 0, 113, 129], prefix);
    assert.notEqual(result, null, `calculation /${prefix}`);
    assert.equal(result.totalAddresses, 2 ** (32 - prefix), `address count /${prefix}`);
    assert.equal((result.network & result.mask) >>> 0, result.network, `network alignment /${prefix}`);
    assert.equal((result.broadcast | result.mask) >>> 0, UINT32_MAX, `broadcast boundary /${prefix}`);
  }
});

test("prefix and netmask helpers accept only valid contiguous masks", () => {
  assert.equal(maskFromPrefix(24), 0xffffff00);
  assert.equal(maskFromPrefix(33), null);
  assert.equal(netmaskFromPrefix(27), "255.255.255.224");
  assert.equal(prefixFromNetmask("255.255.255.0"), 24);
  assert.equal(prefixFromNetmask("0.0.0.0"), 0);
  assert.equal(prefixFromNetmask("255.0.255.0"), null);
  assert.equal(isInSubnet(0xc0a8012a, 0xc0a80100, 24), true);
  assert.equal(isInSubnet(0xc0a8022a, 0xc0a80100, 24), false);
  assert.equal(isInAnySubnet(0x64400000, IPV4_SPECIAL_USE_RANGES.sharedAddressSpace), true);
  assert.equal(historicalAddressClass(10), "A");
  assert.equal(historicalAddressClass(224), "D (multicast)");
});

test("validators produce structured live-validation results", () => {
  assert.equal(validateIPv4("10.0.0.1").valid, true);
  assert.equal(validateIPv4("10.0.0").valid, false);
  assert.equal(validatePrefix("/31").value, 31);
  assert.equal(validatePrefix("/40").valid, false);
  assert.equal(validateNetmask("255.255.255.224").value, 27);
  assert.equal(validateNetmask("255.0.255.0").valid, false);

  const validInput = validateCalculationInput("192.0.2.1", "/24");
  assert.deepEqual(validInput.value, { octets: [192, 0, 2, 1], prefix: 24 });
  assert.deepEqual(validInput.errors, {});
  assert.equal(validInput.fields.address.valid, true);
  assert.equal(validInput.fields.prefix.valid, true);

  const invalidInput = validateCalculationInput("192.0.2", "/40");
  assert.equal(invalidInput.valid, false);
  assert.deepEqual(Object.keys(invalidInput.errors), ["address", "prefix"]);
  assert.equal(invalidInput.errors.address, "ipv4InvalidAddress");
  assert.equal(invalidInput.errors.prefix, "ipv4InvalidPrefix");
});

test("IPv4 validation errors use high-contrast light and dark theme colors", () => {
  const stylesheet = fs.readFileSync(new URL("./style.css", import.meta.url), "utf8");
  assert.match(stylesheet, /\.ipv4-field-error\s*\{[^}]*color:\s*#991b1b/);
  assert.match(stylesheet, /\.ipv4-message\.is-error\s*\{[^}]*color:\s*#991b1b/);
  assert.match(stylesheet, /\[data-theme="dark"\]\s+\.ipv4-field-error\s*\{[^}]*color:\s*#fca5a5/);
  assert.match(stylesheet, /\[data-theme="dark"\]\s+\.ipv4-message\.is-error\s*\{[^}]*color:\s*#fca5a5/);
});

test("calculator derives the complete /24 subnet", () => {
  const result = calculateSubnet([192, 168, 1, 42], 24);
  assert.equal(integerToIPv4(result.network), "192.168.1.0");
  assert.equal(integerToIPv4(result.broadcast), "192.168.1.255");
  assert.equal(integerToIPv4(result.firstHost), "192.168.1.1");
  assert.equal(integerToIPv4(result.lastHost), "192.168.1.254");
  assert.equal(result.usableHosts, 254);
  assert.equal(result.totalAddresses, 256);
  assert.equal(result.rfc1918, true);
  assert.equal(result.multicast, false);
});

test("calculator handles RFC 3021 and single-host prefixes", () => {
  const pointToPoint = calculateSubnet([198, 51, 100, 10], 31);
  assert.equal(pointToPoint.usableHosts, 2);
  assert.equal(integerToIPv4(pointToPoint.firstHost), "198.51.100.10");
  assert.equal(integerToIPv4(pointToPoint.lastHost), "198.51.100.11");
  const host = calculateSubnet([203, 0, 113, 5], 32);
  assert.equal(host.usableHosts, 1);
  assert.equal(integerToIPv4(host.network), "203.0.113.5");
});

test("calculator classifies special-use and documentation addresses", () => {
  assert.equal(calculateSubnet([0, 1, 2, 3], 8).currentNetwork, true);
  assert.equal(calculateSubnet([100, 64, 0, 1], 10).sharedAddressSpace, true);
  assert.equal(calculateSubnet([198, 18, 0, 1], 15).benchmarking, true);
  assert.equal(calculateSubnet([240, 0, 0, 1], 4).futureReserved, true);
  assert.equal(calculateSubnet([255, 255, 255, 255], 32).limitedBroadcast, true);
  assert.equal(calculateSubnet([169, 254, 1, 1], 16).rfc3927, true);
  assert.equal(calculateSubnet([239, 1, 2, 3], 8).multicast, true);
  assert.equal(calculateSubnet([198, 51, 100, 7], 24).documentation, true);
  assert.equal(calculateSubnet([100, 128, 0, 1], 16).reserved, false);
  assert.equal(calculateSubnet([1, 2, 3], 24), null);
});

test("formatters keep presentation separate from calculations", () => {
  const result = calculateSubnet([192, 0, 2, 1], 24);
  const formatted = formatCalculation(result);
  assert.equal(formatBinary(result.address), "11000000.00000000.00000010.00000001");
  assert.equal(formatHex(result.address), "0xC0000201");
  assert.equal(formatReverseDns(result.address), "1.2.0.192.in-addr.arpa");
  assert.equal(formatted.documentation, "Yes");
  assert.equal(formatted.network, "192.0.2.0");
  assert.equal(formatBoolean(false), "No");
  assert.match(formatCopyAll(formatted), /Network: 192\.0\.2\.0/);
  assert.match(formatCopyAll(formatted), /Special-purpose \/ non-public: No/);
});
