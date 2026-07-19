import { isValidIPv4, normalizeIPv4 } from "../network/shared/validation.js";

export function normalizeAction(value) {
  const action = String(value ?? "").trim().toLowerCase();
  if (!["permit", "deny"].includes(action)) throw new TypeError("Action must be permit or deny");
  return action;
}

export function normalizeAddress(value, mode = "network") {
  if (mode === "any") return "any";
  const address = normalizeIPv4(value);
  if (!isValidIPv4(address)) throw new TypeError("Enter a valid IPv4 address");
  return mode === "host" ? `host ${address}` : address;
}

export function buildExtendedAcl({ action, protocol = "ip", source, sourceMode = "network", destination, destinationMode = "network", sourcePort = "", destinationPort = "" }) {
  const normalizedProtocol = String(protocol).trim().toLowerCase();
  if (!/^(ip|tcp|udp|icmp)$/.test(normalizedProtocol)) throw new TypeError("Unsupported protocol");
  const ports = normalizedProtocol === "tcp" || normalizedProtocol === "udp";
  const sourcePortToken = ports && String(sourcePort).trim() ? ` eq ${String(sourcePort).trim()}` : "";
  const destinationPortToken = ports && String(destinationPort).trim() ? ` eq ${String(destinationPort).trim()}` : "";
  return `${normalizeAction(action)} ${normalizedProtocol} ${normalizeAddress(source, sourceMode)}${sourcePortToken} ${normalizeAddress(destination, destinationMode)}${destinationPortToken}`;
}

