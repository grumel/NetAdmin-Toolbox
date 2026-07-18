/** Shared, protocol-neutral numeric primitives for future network tools. */
export const UINT32_MAX = 0xffffffff;

/** RFC and IANA special-use ranges used by IPv4 tools. */
export const IPV4_SPECIAL_USE_RANGES = Object.freeze({
  rfc1918: [[0x0a000000, 8], [0xac100000, 12], [0xc0a80000, 16]],
  rfc3927: [[0xa9fe0000, 16]],
  loopback: [[0x7f000000, 8]],
  multicast: [[0xe0000000, 4]],
  documentation: [[0xc0000200, 24], [0xc6336400, 24], [0xcb007100, 24]],
  // Non-public-use blocks: "this network", shared address space, benchmarking,
  // future-reserved space, and the limited broadcast address.
  reserved: [[0x00000000, 8], [0x64400000, 10], [0xc6120000, 15], [0xf0000000, 4], [UINT32_MAX, 32]]
});

export function parseIPv4(value) {
  const octets = String(value).trim().split(".");
  if (octets.length !== 4 || octets.some((octet) => !/^\d{1,3}$/.test(octet))) return null;
  const numbers = octets.map(Number);
  return numbers.every((octet) => octet <= 255) ? numbers : null;
}

export function parsePrefix(value) {
  const normalized = String(value).trim().replace(/^\//, "");
  return /^(?:[0-9]|[12]\d|3[0-2])$/.test(normalized) ? Number(normalized) : null;
}

export function ipv4ToInteger(octets) {
  return octets.reduce((address, octet) => ((address << 8) | octet) >>> 0, 0);
}

export function integerToIPv4(address) {
  return [24, 16, 8, 0].map((shift) => (address >>> shift) & 255).join(".");
}

export function maskFromPrefix(prefix) {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return null;
  return prefix === 0 ? 0 : (UINT32_MAX << (32 - prefix)) >>> 0;
}

export function netmaskFromPrefix(prefix) {
  const mask = maskFromPrefix(prefix);
  return mask === null ? null : integerToIPv4(mask);
}

export function prefixFromNetmask(value) {
  const octets = Array.isArray(value) ? value : parseIPv4(value);
  if (!octets) return null;
  const inverse = (~ipv4ToInteger(octets)) >>> 0;
  return (inverse & (inverse + 1)) === 0 ? Math.clz32(inverse) : null;
}

export function isInSubnet(address, network, prefix) {
  const mask = maskFromPrefix(prefix);
  return mask !== null && (address & mask) === (network & mask);
}

export function isInAnySubnet(address, entries) {
  return entries.some(([network, prefix]) => isInSubnet(address, network, prefix));
}

export function historicalAddressClass(firstOctet) {
  if (firstOctet <= 127) return "A";
  if (firstOctet <= 191) return "B";
  if (firstOctet <= 223) return "C";
  if (firstOctet <= 239) return "D (multicast)";
  return "E (experimental)";
}
