import { isValidIPv4, normalizeIPv4 } from "../network/shared/validation.js";
import { integerToIPv4, ipv4ToInteger, maskFromPrefix, parseIPv4, parsePrefix } from "../network/ipv4/helpers.js";
export function buildDhcpScope({ name, network, prefix, start, end }) {
  const scopeName = String(name ?? "").trim(); const parsedPrefix = parsePrefix(prefix); const values = [network, start, end].map(normalizeIPv4);
  if (!scopeName || /['\r\n]/.test(scopeName) || parsedPrefix === null || values.some((value) => !isValidIPv4(value))) throw new TypeError("Enter a valid DHCP scope and IPv4 values");
  const address = ipv4ToInteger(parseIPv4(values[0])); const canonical = integerToIPv4((address & maskFromPrefix(parsedPrefix)) >>> 0);
  return { name: scopeName, network: canonical, prefix: parsedPrefix, start: values[1], end: values[2], command: `Add-DhcpServerv4Scope -Name '${scopeName}' -StartRange ${values[1]} -EndRange ${values[2]} -SubnetMask ${integerToIPv4(maskFromPrefix(parsedPrefix))}` };
}
