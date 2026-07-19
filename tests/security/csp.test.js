import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../../index.html", import.meta.url), "utf8");
const match = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"\s*\/?>/i);

function directives(policy) {
  return Object.fromEntries(policy.split(";").map((entry) => entry.trim()).filter(Boolean).map((entry) => {
    const [name, ...values] = entry.split(/\s+/);
    return [name, values];
  }));
}

test("index declares a restrictive Content Security Policy", () => {
  assert.ok(match, "Content-Security-Policy meta tag is missing");
  const policy = directives(match[1]);

  assert.deepEqual(policy["default-src"], ["'self'"]);
  assert.deepEqual(policy["base-uri"], ["'none'"]);
  assert.deepEqual(policy["object-src"], ["'none'"]);
  assert.deepEqual(policy["script-src"], ["'self'"]);
  assert.deepEqual(policy["style-src"], ["'self'"]);
  assert.deepEqual(policy["worker-src"], ["'self'"]);
  assert.deepEqual(policy["manifest-src"], ["'self'"]);
  assert.deepEqual(policy["frame-src"], ["'none'"]);
  assert.deepEqual(policy["media-src"], ["'none'"]);

  assert.equal(match[1].includes("'unsafe-inline'"), false);
  assert.equal(match[1].includes("'unsafe-eval'"), false);
  assert.equal(/https?:|\*/.test(match[1]), false);
});

test("application shell contains no inline executable content", () => {
  assert.equal(/<script(?![^>]*\bsrc=)[^>]*>/i.test(html), false, "inline script found");
  assert.equal(/\son[a-z]+\s*=/i.test(html), false, "inline event handler found");
  assert.equal(/<style\b/i.test(html), false, "inline style block found");
  assert.equal(/\sstyle\s*=/i.test(html), false, "inline style attribute found");
});
