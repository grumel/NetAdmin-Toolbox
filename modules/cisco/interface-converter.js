const TYPES = Object.freeze({ gi: "GigabitEthernet", gigabitethernet: "GigabitEthernet", fa: "FastEthernet", fastethernet: "FastEthernet", te: "TenGigabitEthernet", tengigabitethernet: "TenGigabitEthernet", eth: "Ethernet", ethernet: "Ethernet", lo: "Loopback", loopback: "Loopback" });

export function parseInterface(value) {
  const text = String(value ?? "").trim();
  const match = text.match(/^([A-Za-z]+)([0-9]+(?:\/[0-9]+)*)$/);
  if (!match || !TYPES[match[1].toLowerCase()]) throw new TypeError("Enter a valid Cisco interface name");
  const type = TYPES[match[1].toLowerCase()];
  const number = match[2];
  const abbreviations = { GigabitEthernet: "Gi", FastEthernet: "Fa", TenGigabitEthernet: "Te", Ethernet: "Eth", Loopback: "Lo" };
  return { type, number, canonical: `${type}${number}`, short: `${abbreviations[type]}${number}` };
}

export function convertInterface(value) {
  const parsed = parseInterface(value);
  const aliases = { GigabitEthernet: "Gi", FastEthernet: "Fa", TenGigabitEthernet: "Te", Ethernet: "Eth", Loopback: "Lo" };
  return { input: String(value).trim(), canonical: parsed.canonical, abbreviated: `${aliases[parsed.type]}${parsed.number}`, type: parsed.type, number: parsed.number };
}
