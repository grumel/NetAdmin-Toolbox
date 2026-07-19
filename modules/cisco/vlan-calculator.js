export function parseVlanId(value) {
  const id = Number(String(value).trim());
  if (!Number.isInteger(id) || id < 1 || id > 4094) throw new RangeError("VLAN ID must be an integer from 1 to 4094");
  return id;
}
export function normalizeVlanName(value) {
  const name = String(value ?? "").trim();
  if (!name || name.length > 32 || !/^[A-Za-z0-9_-]+$/.test(name)) throw new TypeError("VLAN name must use 1-32 letters, numbers, hyphens or underscores");
  return name;
}
export function vlanDetails(idInput) { const id = parseVlanId(idInput); return { id, range: id <= 1005 ? "normal" : "extended", usable: ![1002, 1003, 1004, 1005].includes(id) }; }
export function buildVlanConfig({ id, name, interfaceName = "", mode = "access" }) {
  const details = vlanDetails(id); const vlanName = normalizeVlanName(name); const iface = String(interfaceName).trim();
  if (iface && !/^[A-Za-z0-9/.-]+$/.test(iface)) throw new TypeError("Interface name contains unsupported characters");
  if (!["access", "trunk"].includes(mode)) throw new TypeError("Mode must be access or trunk");
  const lines = [`vlan ${details.id}`, ` name ${vlanName}`];
  if (iface) lines.push(`interface ${iface}`, ` switchport mode ${mode}`, mode === "access" ? ` switchport access vlan ${details.id}` : ` switchport trunk allowed vlan ${details.id}`);
  return lines.join("\n");
}
