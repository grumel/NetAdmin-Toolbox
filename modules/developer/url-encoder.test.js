import assert from "node:assert/strict";
import test from "node:test";
import { decodeUrl, encodeUrl } from "./url-encoder.js";
test("encodes and decodes UTF-8 URL components", () => { const encoded = encodeUrl("Netzwerk & Tools"); assert.equal(encoded, "Netzwerk%20%26%20Tools"); assert.equal(decodeUrl(encoded), "Netzwerk & Tools"); });
test("rejects malformed encoding", () => assert.throws(() => decodeUrl("%FF"), /Invalid/));
