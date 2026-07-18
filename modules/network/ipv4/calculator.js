import { historicalAddressClass, IPV4_SPECIAL_USE_RANGES, ipv4ToInteger, isInAnySubnet, maskFromPrefix } from "./helpers.js";

/**
 * Pure subnet calculation. It accepts validated octets and a numeric prefix,
 * allowing VLSM and route-summarisation modules to reuse it without UI state.
 */
export function calculateSubnet(octets, prefix) {
  const mask = maskFromPrefix(prefix);
  if (!Array.isArray(octets) || octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255) || mask === null) return null;

  const address = ipv4ToInteger(octets);
  const network = (address & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const totalAddresses = 2 ** (32 - prefix);
  const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : totalAddresses - 2;

  return {
    address, prefix, mask, wildcard: (~mask) >>> 0, network, broadcast,
    firstHost: prefix >= 31 ? network : network + 1,
    lastHost: prefix >= 31 ? broadcast : broadcast - 1,
    usableHosts, totalAddresses,
    addressClass: historicalAddressClass(octets[0]),
    rfc1918: isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.rfc1918),
    rfc3927: isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.rfc3927),
    loopback: isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.loopback),
    multicast: isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.multicast),
    reserved: isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.reserved),
    documentation: isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.documentation)
  };
}
