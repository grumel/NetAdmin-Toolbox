import assert from "node:assert/strict";
import test from "node:test";
import { decodeJwt } from "./jwt-decoder.js";
globalThis.atob ??= (value) => Buffer.from(value, "base64").toString("binary");
test("decodes JWT header and payload without verifying the signature", () => { const result = decodeJwt("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature"); assert.deepEqual(result.header, { alg: "HS256" }); assert.deepEqual(result.payload, { sub: "123" }); });
test("rejects malformed JWTs", () => { assert.throws(() => decodeJwt("invalid"), /three segments/); });
