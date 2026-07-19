function normalizeLine(value) { return String(value ?? "").trim().replace(/\s+/g, " "); }
function isTerminalRule(line) { return /^(permit|deny)\s+ip\s+any\s+any$/i.test(line); }
export function optimizeAcl(lines) {
  if (!Array.isArray(lines)) throw new TypeError("ACL rules must be an array");
  const output = []; const seen = new Set(); let terminal = false; let removed = 0;
  for (const raw of lines) { const line = normalizeLine(raw); if (!line || terminal || seen.has(line.toLowerCase())) { removed += 1; continue; } output.push(line); seen.add(line.toLowerCase()); if (isTerminalRule(line)) terminal = true; }
  return { lines: output, removed };
}
