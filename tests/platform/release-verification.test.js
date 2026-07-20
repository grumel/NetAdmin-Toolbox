import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
test("release shell includes manifest, service worker and offline fallback", async () => {
  const html = await readFile(new URL("../../index.html", import.meta.url), "utf8");
  const worker = await readFile(new URL("../../sw.js", import.meta.url), "utf8");
  const app = await readFile(new URL("../../assets/js/app.js", import.meta.url), "utf8");
  assert.match(html, /rel="manifest"/);
  assert.match(app, /serviceWorker\.register/);
  assert.match(worker, /navigate/);
  assert.match(worker, /OFFLINE_URL|index\.html/);
});
