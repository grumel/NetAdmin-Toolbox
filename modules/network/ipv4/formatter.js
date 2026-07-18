import { integerToIPv4 } from "./helpers.js";

export const resultFields = [
  ["network", "Network"], ["broadcast", "Broadcast"], ["firstHost", "First Host"], ["lastHost", "Last Host"],
  ["usableHosts", "Host Count"], ["totalAddresses", "Total Addresses"], ["wildcard", "Wildcard"], ["binary", "Binary"],
  ["hex", "Hex"], ["integer", "Integer"], ["reverseDns", "Reverse DNS"], ["addressClass", "Address Class"],
  ["rfc1918", "Private (RFC1918)"], ["rfc3927", "Link-local (RFC3927)"], ["loopback", "Loopback"], ["multicast", "Multicast"],
  ["documentation", "Documentation range"], ["currentNetwork", "Current network (0.0.0.0/8)"],
  ["sharedAddressSpace", "Carrier-grade NAT (100.64.0.0/10)"], ["benchmarking", "Benchmarking (198.18.0.0/15)"],
  ["futureReserved", "Future use (240.0.0.0/4)"], ["limitedBroadcast", "Limited broadcast"], ["reserved", "Special-purpose / non-public"]
];

export function formatBinary(address) {
  if (integerToIPv4(address) === null) return null;
  return [24, 16, 8, 0].map((shift) => ((address >>> shift) & 255).toString(2).padStart(8, "0")).join(".");
}

export function formatHex(address) {
  if (integerToIPv4(address) === null) return null;
  return `0x${address.toString(16).padStart(8, "0").toUpperCase()}`;
}

export function formatReverseDns(address) {
  const formatted = integerToIPv4(address);
  return formatted === null ? null : `${formatted.split(".").reverse().join(".")}.in-addr.arpa`;
}

export function formatBoolean(value) {
  return value ? "Yes" : "No";
}

/** Converts numeric calculation output into only user-facing strings. */
export function formatCalculation(result) {
  if (!result) return null;
  return {
    network: integerToIPv4(result.network), broadcast: integerToIPv4(result.broadcast),
    firstHost: integerToIPv4(result.firstHost), lastHost: integerToIPv4(result.lastHost),
    usableHosts: String(result.usableHosts), totalAddresses: String(result.totalAddresses),
    wildcard: integerToIPv4(result.wildcard), binary: formatBinary(result.address), hex: formatHex(result.address),
    integer: String(result.address), reverseDns: formatReverseDns(result.address), addressClass: result.addressClass,
    rfc1918: formatBoolean(result.rfc1918), rfc3927: formatBoolean(result.rfc3927), loopback: formatBoolean(result.loopback),
    multicast: formatBoolean(result.multicast), documentation: formatBoolean(result.documentation),
    currentNetwork: formatBoolean(result.currentNetwork), sharedAddressSpace: formatBoolean(result.sharedAddressSpace),
    benchmarking: formatBoolean(result.benchmarking), futureReserved: formatBoolean(result.futureReserved),
    limitedBroadcast: formatBoolean(result.limitedBroadcast), reserved: formatBoolean(result.reserved)
  };
}

export function formatCopyAll(formatted) {
  if (!formatted) return "";
  return resultFields.map(([key, label]) => `${label}: ${formatted[key]}`).join("\n");
}
