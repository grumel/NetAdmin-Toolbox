import { integerToIPv4, ipv4ToInteger, maskFromPrefix, parseIPv4, parsePrefix } from "../network/ipv4/helpers.js";

function wildcardFromPrefix(prefix) { return integerToIPv4((~maskFromPrefix(prefix)) >>> 0); }
export function buildOspfNetwork({ network, prefix, area }) {
  const octets = parseIPv4(network); const parsedPrefix = parsePrefix(prefix); const parsedArea = String(area).trim();
  if (!octets || parsedPrefix === null) throw new TypeError("Enter a valid IPv4 network and prefix");
  if (!/^\d+(?:\.\d+){0,3}$/.test(parsedArea) || parsedArea.split(".").some((part) => Number(part) > 255)) throw new TypeError("Enter a valid OSPF area");
  const address = ipv4ToInteger(octets); const mask = maskFromPrefix(parsedPrefix); const canonical = integerToIPv4(address & mask);
  return { network: canonical, prefix: parsedPrefix, wildcard: wildcardFromPrefix(parsedPrefix), area: parsedArea, command: ` network ${canonical} ${wildcardFromPrefix(parsedPrefix)} area ${parsedArea}` };
}
export function buildOspfProcess({ processId, routerId = "", networks = [] }) {
  const id = Number(processId); if (!Number.isInteger(id) || id < 1 || id > 65535) throw new RangeError("OSPF process ID must be 1-65535");
  const entries = networks.map(buildOspfNetwork); const lines = [`router ospf ${id}`]; if (routerId.trim()) lines.push(` router-id ${routerId.trim()}`); lines.push(...entries.map((entry) => entry.command)); return lines.join("\n");
}
