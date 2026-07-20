const symbols = ["r", "w", "x"];
/** Convert a numeric Unix mode (e.g. 755) to symbolic permissions. */
export function chmodToSymbolic(mode) {
  const value = String(mode).trim();
  if (!/^([0-7]{3})$/.test(value)) throw new Error("Enter a three-digit octal mode.");
  return value.split("").map((digit) => Number(digit).toString(2).padStart(3, "0")).map((bits) => bits.split("").map((bit, index) => bit === "1" ? symbols[index] : "-").join("")).join("");
}
