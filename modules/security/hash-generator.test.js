import assert from "node:assert/strict";
import test from "node:test";
import { webcrypto } from "node:crypto";
import { hashText } from "./hash-generator.js";
globalThis.crypto ??= webcrypto;
test("hashes UTF-8 text with SHA-256", async () => { assert.equal(await hashText("hello", "SHA-256"), "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"); });
test("rejects unsupported algorithms", async () => { await assert.rejects(() => hashText("hello", "MD5"), /Unsupported/); });
