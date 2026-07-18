import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pinnedVersion = (await readFile(new URL("../../.nvmrc", import.meta.url), "utf8")).trim();
const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
const readme = await readFile(new URL("../../README.md", import.meta.url), "utf8");

test("Node.js version metadata is explicit and consistent", () => {
  assert.match(pinnedVersion, /^24\.\d+\.\d+$/);
  assert.equal(packageJson.engines?.node, `>=${pinnedVersion} <25`);
  assert.match(readme, new RegExp(`Node\\.js ${pinnedVersion.replaceAll(".", "\\.")}`));
});

test("the active test runtime satisfies the supported major version", () => {
  assert.equal(process.versions.node.split(".")[0], "24");
});
