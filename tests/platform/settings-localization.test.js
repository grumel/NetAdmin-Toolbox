import assert from "node:assert/strict";
import test from "node:test";

const values = new Map();
globalThis.localStorage = {
  getItem: (key) => values.has(key) ? values.get(key) : null,
  setItem: (key, value) => values.set(key, String(value))
};
Object.defineProperty(globalThis, "navigator", {
  value: { language: "de-DE" },
  configurable: true,
  writable: true
});
globalThis.document = { documentElement: { lang: "", dataset: {} } };

const { normalizeLocale, setLocale, t } = await import("../../assets/js/i18n.js");
const { createSettingsExport, importSettings, serializeSettings, validateSettingsImport } = await import("../../assets/js/settings-transfer.js");

test("localization normalizes supported languages and falls back safely", () => {
  assert.equal(normalizeLocale("de-DE"), "de");
  assert.equal(normalizeLocale("fr-FR"), "en");
  assert.equal(t("favorites", {}, "de"), "Favoriten");
  assert.equal(t("addFavorite", { name: "IPv6" }, "en"), "Add IPv6 to favorites");
  assert.equal(setLocale("de"), "de");
  assert.equal(document.documentElement.lang, "de");
});

test("settings export is versioned and round-trips supported preferences", () => {
  values.set("netadmin-toolbox:theme", "light");
  values.set("netadmin-toolbox:locale", "de");
  values.set("netadmin-toolbox:favorite-tools", JSON.stringify(["ipv4", "ipv6"]));
  values.set("netadmin-toolbox:recent-tools", JSON.stringify(["subnet-tools"]));

  const exported = createSettingsExport(new Date("2026-07-19T12:00:00.000Z"));
  assert.equal(exported.format, "netadmin-toolbox-settings");
  assert.equal(exported.version, 1);
  assert.match(serializeSettings(exported), /"favorites"/);

  values.clear();
  const imported = importSettings(exported);
  assert.deepEqual(imported.favorites, ["ipv4", "ipv6"]);
  assert.equal(values.get("netadmin-toolbox:theme"), "light");
  assert.equal(values.get("netadmin-toolbox:locale"), "de");
});

test("settings import rejects unsupported or malformed input", () => {
  assert.throws(() => validateSettingsImport({}), /Unsupported/);
  assert.throws(() => validateSettingsImport({ format: "netadmin-toolbox-settings", version: 1, settings: { theme: "blue", locale: "en", favorites: [], recentTools: [] } }), /theme/);
  assert.throws(() => validateSettingsImport({ format: "netadmin-toolbox-settings", version: 1, settings: { theme: "dark", locale: "en", favorites: "ipv4", recentTools: [] } }), /list/);
});