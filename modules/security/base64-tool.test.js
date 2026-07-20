import assert from "node:assert/strict";
import test from "node:test";
import { encodeBase64, decodeBase64 } from "./base64-tool.js";
globalThis.btoa ??= (value) => Buffer.from(value, "binary").toString("base64");
globalThis.atob ??= (value) => Buffer.from(value, "base64").toString("binary");
test("round-trips UTF-8 Base64", () => { const encoded = encodeBase64("NetAdmin ✓"); assert.equal(decodeBase64(encoded), "NetAdmin ✓"); });
test("rejects malformed Base64", () => { assert.throws(() => decodeBase64("not valid!"), /valid Base64/); });
