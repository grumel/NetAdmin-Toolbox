import { integerToIPv4 } from "./helpers.js";
import { t } from "../../../assets/js/i18n.js";

export const resultFields = [
  ["network", "ipv4Network"], ["broadcast", "ipv4Broadcast"], ["firstHost", "ipv4FirstHost"], ["lastHost", "ipv4LastHost"],
  ["usableHosts", "ipv4HostCount"], ["totalAddresses", "ipv4TotalAddresses"], ["wildcard", "ipv4Wildcard"], ["binary", "ipv4Binary"],
  ["hex", "ipv4Hex"], ["integer", "ipv4Integer"], ["reverseDns", "ipv4ReverseDns"], ["addressClass", "ipv4AddressClass"],
  ["rfc1918", "ipv4Private"], ["rfc3927", "ipv4LinkLocal"], ["loopback", "ipv4Loopback"], ["multicast", "ipv4Multicast"],
  ["documentation", "ipv4Documentation"], ["currentNetwork", "ipv4CurrentNetwork"], ["sharedAddressSpace", "ipv4SharedAddress"],
  ["benchmarking", "ipv4Benchmarking"], ["futureReserved", "ipv4FutureReserved"], ["limitedBroadcast", "ipv4LimitedBroadcast"], ["reserved", "ipv4Reserved"]
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
  return t(value ? "ipv4Yes" : "ipv4No");
}

function formatAddressClass(value) {
  return value === "D (multicast)" ? t("ipv4ClassD") : value;
}

/** Converts numeric calculation output into only user-facing strings. */
export function formatCalculation(result) {
  if (!result) return null;
  return {
    network: integerToIPv4(result.network), broadcast: integerToIPv4(result.broadcast),
    firstHost: integerToIPv4(result.firstHost), lastHost: integerToIPv4(result.lastHost),
    usableHosts: String(result.usableHosts), totalAddresses: String(result.totalAddresses),
    wildcard: integerToIPv4(result.wildcard), binary: formatBinary(result.address), hex: formatHex(result.address),
    integer: String(result.address), reverseDns: formatReverseDns(result.address), addressClass: formatAddressClass(result.addressClass),
    rfc1918: formatBoolean(result.rfc1918), rfc3927: formatBoolean(result.rfc3927), loopback: formatBoolean(result.loopback),
    multicast: formatBoolean(result.multicast), documentation: formatBoolean(result.documentation),
    currentNetwork: formatBoolean(result.currentNetwork), sharedAddressSpace: formatBoolean(result.sharedAddressSpace),
    benchmarking: formatBoolean(result.benchmarking), futureReserved: formatBoolean(result.futureReserved),
    limitedBroadcast: formatBoolean(result.limitedBroadcast), reserved: formatBoolean(result.reserved)
  };
}

export function formatCopyAll(formatted) {
  if (!formatted) return "";
  return resultFields.map(([key, labelKey]) => `${t(labelKey)}: ${formatted[key]}`).join("\n");
}
