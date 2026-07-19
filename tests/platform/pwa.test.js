import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));
const serviceWorker = await readFile(path.join(root, "sw.js"), "utf8");
const indexHtml = await readFile(path.join(root, "index.html"), "utf8");

function extractAppShell(source) {
  const match = source.match(/const APP_SHELL = \[([\s\S]*?)\];/);
  assert.ok(match, "APP_SHELL declaration is missing");
  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]);
}

test("manifest contains the minimum install metadata", () => {
  assert.equal(manifest.name, "NetAdmin Toolbox");
  assert.ok(manifest.short_name);
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.scope, "./");
  assert.equal(manifest.display, "standalone");
  assert.ok(manifest.theme_color);
  assert.ok(manifest.background_color);
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);

  for (const icon of manifest.icons) {
    assert.ok(icon.src);
    assert.ok(icon.sizes);
    assert.ok(icon.type);
  }
});

test("index links the manifest and registers the service worker", () => {
  assert.match(indexHtml, /<link rel="manifest" href="manifest\.json" \/>/);
  assert.match(indexHtml, /<meta name="theme-color"/);
  assert.match(serviceWorker, /self\.addEventListener\("install"/);
  assert.match(serviceWorker, /self\.addEventListener\("activate"/);
  assert.match(serviceWorker, /self\.addEventListener\("fetch"/);
});

test("every app-shell entry exists in the repository", async () => {
  const entries = extractAppShell(serviceWorker);
  assert.ok(entries.includes("index.html"));
  assert.ok(entries.includes("manifest.json"));

  for (const entry of entries) {
    if (entry === "./") continue;
    await assert.doesNotReject(access(path.join(root, entry)), `Missing app-shell file: ${entry}`);
  }
});

test("offline navigation falls back to the cached application shell", () => {
  assert.match(serviceWorker, /const\s+OFFLINE_DOCUMENT\s*=\s*"index\.html";/);
  assert.match(serviceWorker, /request\.mode\s*===\s*"navigate"/);
  assert.match(serviceWorker, /caches\.match\(OFFLINE_DOCUMENT\)/);
});

test("runtime caching remains restricted to safe same-origin static responses", () => {
  assert.match(serviceWorker, /url\.origin\s*===\s*self\.location\.origin/);
  assert.match(serviceWorker, /response\.ok/);
  assert.match(serviceWorker, /response\.type\s*===\s*"basic"/);
  assert.doesNotMatch(serviceWorker, /cache\.put\(event\.request\s*,\s*response\)/);
});
