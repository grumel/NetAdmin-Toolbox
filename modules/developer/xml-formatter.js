/** Pretty-print XML using the browser's native XML parser when available. */
export function formatXml(value, spaces = 2) {
  if (!Number.isInteger(spaces) || spaces < 1 || spaces > 8) throw new Error("Indentation must be between 1 and 8 spaces.");
  const source = String(value).trim();
  if (!source) return "";
  if (typeof DOMParser !== "undefined") {
    const document = new DOMParser().parseFromString(source, "application/xml");
    if (document.querySelector("parsererror")) throw new Error("Invalid XML.");
  } else if (!/^<[^>]+>[\s\S]*<\/[^>]+>$/.test(source)) throw new Error("Invalid XML.");
  const tokens = source.replace(/>\s*</g, "><").split(/(?=<)|(?<=>)/).filter(Boolean);
  let level = 0;
  return tokens.map((token) => { if (token.startsWith("</")) level -= 1; const line = " ".repeat(level * spaces) + token.trim(); if (token.startsWith("<") && !token.startsWith("</") && !token.startsWith("<?") && !token.startsWith("<!") && !token.endsWith("/>") && !token.includes("</")) level += 1; return line; }).join("\n");
}
