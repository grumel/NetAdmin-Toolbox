const MAX_IPV4 = 0xffffffff;

export function parseIPv4(input) {
  const parts = String(input).trim().split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part) || Number(part) > 255)) {
    throw new TypeError("Enter a valid IPv4 address");
  }
  return parts.reduce((value, part) => ((value << 8) | Number(part)) >>> 0, 0);
}

export function formatIPv4(value) {
  const address = Number(value) >>> 0;
  return [24, 16, 8, 0].map((shift) => (address >>> shift) & 255).join(".");
}

export function parsePrefix(value) {
  const prefix = Number(value);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new RangeError("IPv4 prefix must be an integer from 0 to 32");
  }
  return prefix;
}

export function prefixMask(prefixInput) {
  const prefix = parsePrefix(prefixInput);
  return prefix === 0 ? 0 : (MAX_IPV4 << (32 - prefix)) >>> 0;
}

export function cidrDetails(addressInput, prefixInput) {
  const address = parseIPv4(addressInput);
  const prefix = parsePrefix(prefixInput);
  const mask = prefixMask(prefix);
  const wildcard = (~mask) >>> 0;
  const network = (address & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const totalAddresses = 2 ** (32 - prefix);
  const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : Math.max(0, totalAddresses - 2);
  return {
    cidr: `${formatIPv4(network)}/${prefix}`,
    network: formatIPv4(network),
    broadcast: formatIPv4(broadcast),
    netmask: formatIPv4(mask),
    wildcard: formatIPv4(wildcard),
    totalAddresses,
    usableHosts
  };
}

function requiredPrefix(hosts) {
  const requested = Number(hosts);
  if (!Number.isInteger(requested) || requested < 1) throw new RangeError("Host requirements must be positive integers");
  const needed = requested <= 2 ? requested : requested + 2;
  const hostBits = Math.ceil(Math.log2(needed));
  return 32 - hostBits;
}

export function allocateVlsm(baseAddressInput, basePrefixInput, requirements) {
  const basePrefix = parsePrefix(basePrefixInput);
  const base = cidrDetails(baseAddressInput, basePrefix);
  const baseStart = parseIPv4(base.network);
  const baseEnd = parseIPv4(base.broadcast);
  let cursor = baseStart;

  return requirements
    .map((entry, index) => typeof entry === "number" ? { name: `Subnet ${index + 1}`, hosts: entry } : entry)
    .map((entry) => ({ ...entry, prefix: requiredPrefix(entry.hosts) }))
    .sort((a, b) => a.prefix - b.prefix)
    .map((entry) => {
      if (entry.prefix < basePrefix) throw new RangeError(`${entry.name} does not fit in the base network`);
      const size = 2 ** (32 - entry.prefix);
      cursor = Math.ceil(cursor / size) * size;
      const end = cursor + size - 1;
      if (end > baseEnd) throw new RangeError("VLSM requirements exceed the base network");
      const details = cidrDetails(formatIPv4(cursor), entry.prefix);
      cursor = end + 1;
      return { name: entry.name, requestedHosts: Number(entry.hosts), ...details };
    });
}

export function summarizeCidrs(inputs) {
  if (!Array.isArray(inputs) || inputs.length === 0) throw new TypeError("Provide at least one CIDR network");
  const ranges = inputs.map((input) => {
    const match = String(input).trim().match(/^(.+)\/(\d{1,2})$/);
    if (!match) throw new TypeError(`Invalid CIDR: ${input}`);
    const details = cidrDetails(match[1], match[2]);
    return { start: parseIPv4(details.network), end: parseIPv4(details.broadcast) };
  });
  const min = Math.min(...ranges.map((range) => range.start));
  const max = Math.max(...ranges.map((range) => range.end));
  const differing = (min ^ max) >>> 0;
  const prefix = differing === 0 ? 32 : Math.clz32(differing);
  const mask = prefixMask(prefix);
  return cidrDetails(formatIPv4((min & mask) >>> 0), prefix);
}
