/** Build a validated nftables or iptables allow rule. */
export function buildFirewallRule({ backend = "nftables", protocol = "tcp", source, destinationPort, action = "accept" }) {
  if (!["nftables", "iptables"].includes(backend)) throw new Error("Unsupported firewall backend.");
  if (!["tcp", "udp"].includes(protocol)) throw new Error("Unsupported protocol.");
  if (!["accept", "drop"].includes(action)) throw new Error("Unsupported action.");
  const address = String(source ?? "").trim(); if (!/^(any|(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,2})?)$/.test(address)) throw new Error("Enter a valid source address.");
  const port = String(destinationPort ?? "").trim(); if (!/^\d{1,5}$/.test(port) || Number(port) > 65535) throw new Error("Enter a valid destination port.");
  if (backend === "nftables") return `ip saddr ${address} ${protocol} dport ${port} ${action}`;
  return `-A INPUT -s ${address} -p ${protocol} --dport ${port} -j ${action.toUpperCase()}`;
}
