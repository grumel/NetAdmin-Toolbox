function normalizedText(value) {
  return String(value ?? "").trim();
}

export function normalizeIPv4(value) {
  return normalizedText(value);
}

export function isValidIPv4(value) {
  const parts = normalizeIPv4(value).split(".");
  return parts.length === 4 && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}

function parseIPv6Groups(value) {
  const text = normalizedText(value).toLowerCase();
  if (!text || text.includes(".") || (text.match(/::/g) || []).length > 1) return null;
  const [leftText, rightText] = text.split("::");
  const left = leftText ? leftText.split(":") : [];
  const right = rightText ? rightText.split(":") : [];
  const explicit = left.length + right.length;
  const compressed = text.includes("::");
  if ((!compressed && explicit !== 8) || (compressed && explicit >= 8)) return null;
  const groups = compressed ? [...left, ...Array(8 - explicit).fill("0"), ...right] : left;
  return groups.length === 8 && groups.every((group) => /^[0-9a-f]{1,4}$/.test(group)) ? groups : null;
}

export function isValidIPv6(value) {
  return parseIPv6Groups(value) !== null;
}

export function normalizeIPv6(value) {
  const groups = parseIPv6Groups(value);
  if (!groups) return normalizedText(value).toLowerCase();
  const compact = groups.map((group) => group.replace(/^0+/, "") || "0");
  let bestStart = -1;
  let bestLength = 0;
  for (let start = 0; start < compact.length;) {
    if (compact[start] !== "0") { start += 1; continue; }
    let end = start;
    while (end < compact.length && compact[end] === "0") end += 1;
    if (end - start > bestLength && end - start >= 2) {
      bestStart = start;
      bestLength = end - start;
    }
    start = end;
  }
  if (bestStart < 0) return compact.join(":");
  const before = compact.slice(0, bestStart).join(":");
  const after = compact.slice(bestStart + bestLength).join(":");
  return `${before}::${after}` || "::";
}

export function normalizeHostname(value) {
  return normalizedText(value).replace(/\.$/, "").toLowerCase();
}

export function isValidHostname(value) {
  const name = normalizeHostname(value);
  if (!name || name.length > 253) return false;
  return name.split(".").every((label) => label.length > 0 && label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label));
}

export function isValidFQDN(value) {
  const raw = normalizedText(value);
  const name = normalizeHostname(raw);
  return name.includes(".") && isValidHostname(name);
}

export function isValidCIDR(value) {
  const text = normalizedText(value);
  const separator = text.lastIndexOf("/");
  if (separator < 1) return false;
  const address = text.slice(0, separator);
  const prefixText = text.slice(separator + 1);
  if (!/^\d{1,3}$/.test(prefixText)) return false;
  const prefix = Number(prefixText);
  return isValidIPv4(address) ? prefix <= 32 : isValidIPv6(address) && prefix <= 128;
}
