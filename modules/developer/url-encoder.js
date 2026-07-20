/** Encode a string for use as a URL component. */
export function encodeUrl(value) { return encodeURIComponent(String(value)); }
/** Decode a URL component and report malformed percent escapes. */
export function decodeUrl(value) { try { return decodeURIComponent(String(value)); } catch { throw new Error("Invalid URL encoding."); } }
