/** Execute a regular expression safely and return matched values. */
export function testRegex(pattern, value, flags = "") {
  try {
    const expression = new RegExp(String(pattern), String(flags));
    if (!String(flags).includes("g")) { const match = String(value).match(expression); return match ? [match[0]] : []; }
    return Array.from(String(value).matchAll(expression), (match) => match[0]);
  } catch { throw new Error("Invalid regular expression or flags."); }
}
