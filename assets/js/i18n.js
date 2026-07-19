import { getSetting, setSetting } from "./storage.js";

const DEFAULT_LOCALE = "en";
const SUPPORTED = new Set(["en", "de"]);

const messages = {
  en: {
    overview: "Overview",
    dashboard: "Dashboard",
    dashboardSummary: "Search with Ctrl+K, pin favorites, or reopen a recently used tool.",
    installApp: "Install app",
    favorites: "Favorites",
    recent: "Recently used",
    allTools: "All tools",
    settings: "Settings",
    exportSettings: "Export settings",
    importSettings: "Import settings",
    language: "Language",
    english: "English",
    german: "German",
    online: "Online",
    offline: "Offline mode",
    useLight: "Use light mode",
    useDark: "Use dark mode",
    addFavorite: "Add {name} to favorites",
    removeFavorite: "Remove {name} from favorites",
    importSuccess: "Settings imported. Reloading the application.",
    importError: "The selected file is not a valid NetAdmin Toolbox settings export."
  },
  de: {
    overview: "Übersicht",
    dashboard: "Dashboard",
    dashboardSummary: "Mit Strg+K suchen, Favoriten anheften oder zuletzt verwendete Werkzeuge erneut öffnen.",
    installApp: "App installieren",
    favorites: "Favoriten",
    recent: "Zuletzt verwendet",
    allTools: "Alle Werkzeuge",
    settings: "Einstellungen",
    exportSettings: "Einstellungen exportieren",
    importSettings: "Einstellungen importieren",
    language: "Sprache",
    english: "Englisch",
    german: "Deutsch",
    online: "Online",
    offline: "Offline-Modus",
    useLight: "Hellen Modus verwenden",
    useDark: "Dunklen Modus verwenden",
    addFavorite: "{name} zu Favoriten hinzufügen",
    removeFavorite: "{name} aus Favoriten entfernen",
    importSuccess: "Einstellungen importiert. Die Anwendung wird neu geladen.",
    importError: "Die ausgewählte Datei ist kein gültiger NetAdmin-Toolbox-Export."
  }
};

export function normalizeLocale(locale) {
  const short = String(locale || "").toLowerCase().split("-")[0];
  return SUPPORTED.has(short) ? short : DEFAULT_LOCALE;
}

export function currentLocale() {
  return normalizeLocale(getSetting("locale", navigator.language));
}

export function setLocale(locale) {
  const normalized = normalizeLocale(locale);
  setSetting("locale", normalized);
  document.documentElement.lang = normalized;
  return normalized;
}

export function initializeLocale() {
  return setLocale(currentLocale());
}

export function t(key, variables = {}, locale = currentLocale()) {
  const template = messages[normalizeLocale(locale)]?.[key] ?? messages[DEFAULT_LOCALE]?.[key] ?? key;
  return Object.entries(variables).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template
  );
}
