import { getSetting, setSetting } from "./storage.js";

const DARK = "dark";
const LIGHT = "light";

export function currentTheme() {
  return document.documentElement.dataset.theme || DARK;
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === DARK ? "#0b1220" : "#f5f7fb";
  setSetting("theme", theme);
}

export function initializeTheme() {
  const preference = getSetting("theme");
  const theme = preference || (matchMedia("(prefers-color-scheme: light)").matches ? LIGHT : DARK);
  applyTheme(theme);
  return theme;
}

export function toggleTheme() { applyTheme(currentTheme() === DARK ? LIGHT : DARK); }
