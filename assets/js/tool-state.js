import { getSetting, setSetting } from "./storage.js";

const FAVORITES_KEY = "favorite-tools";
const RECENTS_KEY = "recent-tools";
const RECENT_LIMIT = 5;

function readList(key) {
  try {
    const value = JSON.parse(getSetting(key, "[]"));
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeList(key, value) {
  setSetting(key, JSON.stringify(value));
}

export function getFavorites() {
  return readList(FAVORITES_KEY);
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
  writeList(FAVORITES_KEY, next);
  return next;
}

export function getRecentTools() {
  return readList(RECENTS_KEY);
}

export function recordRecentTool(id) {
  const next = [id, ...getRecentTools().filter((item) => item !== id)].slice(0, RECENT_LIMIT);
  writeList(RECENTS_KEY, next);
  return next;
}
