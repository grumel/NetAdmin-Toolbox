import { historicalAddressClass, IPV4_SPECIAL_USE_RANGES, ipv4ToInteger, isInAnySubnet, maskFromPrefix } from "./helpers.js";

/**
 * Pure subnet calculation. It accepts validated octets and a numeric prefix,
 * allowing VLSM and route-summarisation modules to reuse it without UI state.
 */
export function calculateSubnet(octets, prefix) {
  const mask = maskFromPrefix(prefix);
  const address = ipv4ToInteger(octets);
  if (address === null || mask === null) return null;

  const network = (address & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const totalAddresses = 2 ** (32 - prefix);
  const usableHosts = prefix === 32 ? 1 : prefix === 31 ? 2 : totalAddresses - 2;
  const currentNetwork = isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.currentNetwork);
  const sharedAddressSpace = isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.sharedAddressSpace);
  const benchmarking = isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.benchmarking);
  const futureReserved = isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.futureReserved);
  const limitedBroadcast = isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.limitedBroadcast);

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
    documentation: isInAnySubnet(address, IPV4_SPECIAL_USE_RANGES.documentation),
    currentNetwork,
    sharedAddressSpace,
    benchmarking,
    futureReserved,
    limitedBroadcast,
    reserved: currentNetwork || sharedAddressSpace || benchmarking || futureReserved || limitedBroadcast
  };
}
