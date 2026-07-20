/** Generate a standards-compliant random UUID v4. */
export function generateUuid(randomUuid = globalThis.crypto?.randomUUID) {
  if (typeof randomUuid === "function") return randomUuid.call(globalThis.crypto);
  throw new Error("Secure UUID generation is unavailable.");
}
