import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
test("browser support documentation lists the required evergreen engines", async () => {
  const document = await readFile(new URL("../../docs/BROWSER_SUPPORT.md", import.meta.url), "utf8");
  for (const browser of ["Google Chrome", "Microsoft Edge", "Mozilla Firefox", "Apple Safari"]) assert.match(document, new RegExp(browser));
  assert.match(document, /Service Worker/);
});
