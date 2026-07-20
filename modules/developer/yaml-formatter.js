/** Normalize common YAML indentation without external parser dependencies. */
export function formatYaml(value, spaces = 2) {
  if (!Number.isInteger(spaces) || spaces < 1 || spaces > 8) throw new Error("Indentation must be between 1 and 8 spaces.");
  const lines = String(value).trim().split(/\r?\n/);
  if (!String(value).trim()) return "";
  if (lines.some((line) => line.includes("\t"))) throw new Error("YAML tabs are not supported.");
  return lines.map((line) => {
    const content = line.trimEnd();
    const indent = content.match(/^ */)[0].length;
    if (indent % 2) throw new Error("YAML indentation must use even-width levels.");
    return " ".repeat((indent / 2) * spaces) + content.trimStart();
  }).join("\n");
}
