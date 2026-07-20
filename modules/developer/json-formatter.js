/** Parse and pretty-print JSON without mutating caller data. */
export function formatJson(value, spaces = 2) {
  if (!Number.isInteger(spaces) || spaces < 0 || spaces > 8) throw new Error("Indentation must be between 0 and 8 spaces.");
  try { return JSON.stringify(JSON.parse(String(value)), null, spaces); }
  catch { throw new Error("Invalid JSON."); }
}
