/** Small, namespaced LocalStorage adapter for user preferences. */
const PREFIX = "netadmin-toolbox:";

export function getSetting(key, fallback = null) {
  try { return localStorage.getItem(`${PREFIX}${key}`) ?? fallback; } catch { return fallback; }
}

export function setSetting(key, value) {
  try { localStorage.setItem(`${PREFIX}${key}`, value); } catch { /* Settings are optional. */ }
}
