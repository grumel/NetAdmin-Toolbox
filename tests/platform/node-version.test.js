import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pinnedMajor = (await readFile(new URL("../../.nvmrc", import.meta.url), "utf8")).trim();
const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
const readme = await readFile(new URL("../../README.md", import.meta.url), "utf8");

const minimumMajor = 20;
const maximumMajorExclusive = 25;

test("Node.js version metadata is explicit and consistent", () => {
  assert.equal(pinnedMajor, String(minimumMajor));
  assert.equal(packageJson.engines?.node, `>=${minimumMajor} <${maximumMajorExclusive}`);
  assert.match(readme, /Node\.js 20 or newer/);
});

test("the active test runtime satisfies the supported major-version range", () => {
  const activeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);

  assert.ok(
    activeMajor >= minimumMajor && activeMajor < maximumMajorExclusive,
    `Node.js ${process.versions.node} is outside the supported range >=${minimumMajor} <${maximumMajorExclusive}`,
  );
});
