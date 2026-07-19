import { getFavorites, getRecentTools } from "./tool-state.js";
import { getSetting, setSetting } from "./storage.js";

const FORMAT = "netadmin-toolbox-settings";
const VERSION = 1;
const THEMES = new Set(["dark", "light"]);
const LOCALES = new Set(["en", "de"]);

function stringList(value) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new TypeError("Expected a list of tool identifiers");
  }
  return [...new Set(value)];
}

export function createSettingsExport(now = new Date()) {
  return {
    format: FORMAT,
    version: VERSION,
    exportedAt: now.toISOString(),
    settings: {
      theme: getSetting("theme", "dark"),
      locale: getSetting("locale", "en"),
      favorites: getFavorites(),
      recentTools: getRecentTools()
    }
  };
}

export function serializeSettings(data = createSettingsExport()) {
  return `${JSON.stringify(data, null, 2)}\n`;
}

export function validateSettingsImport(value) {
  if (!value || typeof value !== "object" || value.format !== FORMAT || value.version !== VERSION) {
    throw new TypeError("Unsupported settings export");
  }
  const settings = value.settings;
  if (!settings || typeof settings !== "object") throw new TypeError("Missing settings");
  if (!THEMES.has(settings.theme)) throw new TypeError("Invalid theme");
  if (!LOCALES.has(settings.locale)) throw new TypeError("Invalid locale");
  return {
    theme: settings.theme,
    locale: settings.locale,
    favorites: stringList(settings.favorites),
    recentTools: stringList(settings.recentTools).slice(0, 5)
  };
}

export function importSettings(value) {
  const settings = validateSettingsImport(value);
  setSetting("theme", settings.theme);
  setSetting("locale", settings.locale);
  setSetting("favorite-tools", JSON.stringify(settings.favorites));
  setSetting("recent-tools", JSON.stringify(settings.recentTools));
  return settings;
}

export function downloadSettings(documentRef = document, urlRef = URL) {
  const blob = new Blob([serializeSettings()], { type: "application/json" });
  const url = urlRef.createObjectURL(blob);
  const link = documentRef.createElement("a");
  link.href = url;
  link.download = "netadmin-toolbox-settings.json";
  link.click();
  urlRef.revokeObjectURL(url);
}
