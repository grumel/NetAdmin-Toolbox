import { isValidIPv4, normalizeIPv4 } from "../network/shared/validation.js";
import { maskFromPrefix, integerToIPv4, ipv4ToInteger, parseIPv4, parsePrefix } from "../network/ipv4/helpers.js";
export function buildStaticRoute({ network, prefix, nextHop, distance = "" }) {
  const parsedPrefix = parsePrefix(prefix); const destination = normalizeIPv4(network); const gateway = normalizeIPv4(nextHop);
  if (!isValidIPv4(destination) || parsedPrefix === null || !isValidIPv4(gateway)) throw new TypeError("Enter a valid destination, prefix and next hop");
  const parsedDistance = String(distance).trim(); if (parsedDistance && (!/^\d+$/.test(parsedDistance) || Number(parsedDistance) < 1 || Number(parsedDistance) > 255)) throw new RangeError("Administrative distance must be 1-255");
  const address = ipv4ToInteger(parseIPv4(destination)); const canonical = integerToIPv4((address & maskFromPrefix(parsedPrefix)) >>> 0);
  return { network: canonical, prefix: parsedPrefix, nextHop: gateway, distance: parsedDistance, command: `ip route ${canonical} ${integerToIPv4(maskFromPrefix(parsedPrefix))} ${gateway}${parsedDistance ? ` ${parsedDistance}` : ""}` };
}
