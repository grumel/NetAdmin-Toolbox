import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
test("release metadata uses the current 0.6.0 version", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
  const readme = await readFile(new URL("../../README.md", import.meta.url), "utf8");
  assert.equal(packageJson.version, "0.6.0");
  assert.match(readme, /0\.6\.0/);
});
