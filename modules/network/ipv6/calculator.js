const MAX_IPV6 = (1n << 128n) - 1n;

export function parsePrefix(value) {
  const prefix = Number(value);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 128) {
    throw new RangeError("IPv6 prefix must be an integer from 0 to 128");
  }
  return prefix;
}

export function parseIPv6(input) {
  const text = String(input).trim().toLowerCase();
  if (!text || text.includes(".")) throw new TypeError("Enter a valid IPv6 address");
  if ((text.match(/::/g) || []).length > 1) throw new TypeError("Enter a valid IPv6 address");

  const [leftText, rightText] = text.split("::");
  const left = leftText ? leftText.split(":") : [];
  const right = rightText ? rightText.split(":") : [];
  const explicit = left.length + right.length;
  const hasCompression = text.includes("::");
  if ((!hasCompression && explicit !== 8) || (hasCompression && explicit >= 8)) {
    throw new TypeError("Enter a valid IPv6 address");
  }

  const groups = hasCompression
    ? [...left, ...Array(8 - explicit).fill("0"), ...right]
    : left;
  if (groups.length !== 8 || groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) {
    throw new TypeError("Enter a valid IPv6 address");
  }

  return groups.reduce((value, group) => (value << 16n) | BigInt(`0x${group}`), 0n);
}

export function expandIPv6(value) {
  const numeric = typeof value === "bigint" ? value : parseIPv6(value);
  if (numeric < 0n || numeric > MAX_IPV6) throw new RangeError("IPv6 value is outside 128 bits");
  return Array.from({ length: 8 }, (_, index) => {
    const shift = BigInt((7 - index) * 16);
    return ((numeric >> shift) & 0xffffn).toString(16).padStart(4, "0");
  }).join(":");
}

export function compressIPv6(value) {
  const groups = expandIPv6(value).split(":").map((group) => group.replace(/^0+/, "") || "0");
  let bestStart = -1;
  let bestLength = 0;
  for (let start = 0; start < groups.length;) {
    if (groups[start] !== "0") { start += 1; continue; }
    let end = start;
    while (end < groups.length && groups[end] === "0") end += 1;
    const length = end - start;
    if (length > bestLength && length >= 2) { bestStart = start; bestLength = length; }
    start = end;
  }
  if (bestStart < 0) return groups.join(":");
  const before = groups.slice(0, bestStart).join(":");
  const after = groups.slice(bestStart + bestLength).join(":");
  return `${before}::${after}` || "::";
}

export function classifyIPv6(value) {
  const address = typeof value === "bigint" ? value : parseIPv6(value);
  if (address === 0n) return "Unspecified";
  if (address === 1n) return "Loopback";
  if ((address >> 120n) === 0xffn) return "Multicast";
  if ((address >> 121n) === 0x7en) return "Unique local"; // fc00::/7
  if ((address >> 118n) === 0x3fan) return "Link-local"; // fe80::/10
  if ((address >> 125n) === 1n) return "Global unicast"; // 2000::/3
  return "Special or reserved";
}

export function calculateIPv6(input, prefixInput) {
  const address = parseIPv6(input);
  const prefix = parsePrefix(prefixInput);
  const hostBits = 128 - prefix;
  const mask = prefix === 0 ? 0n : (MAX_IPV6 << BigInt(hostBits)) & MAX_IPV6;
  const network = address & mask;
  const last = network | (MAX_IPV6 ^ mask);
  return {
    address: compressIPv6(address),
    expanded: expandIPv6(address),
    prefix,
    network: compressIPv6(network),
    lastAddress: compressIPv6(last),
    addressCount: 1n << BigInt(hostBits),
    type: classifyIPv6(address)
  };
}
