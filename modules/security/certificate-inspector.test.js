import assert from "node:assert/strict";
import test from "node:test";
import { inspectCertificate } from "./certificate-inspector.js";
test("inspects a PEM certificate envelope", () => { const result = inspectCertificate("-----BEGIN CERTIFICATE-----\nQUJDRA==\n-----END CERTIFICATE-----"); assert.deepEqual(result, { format: "PEM", encodedLength: 8, byteLength: 4, hasPrivateKey: false, validEnvelope: true }); });
test("rejects malformed PEM input", () => { assert.throws(() => inspectCertificate("not a certificate"), /PEM certificate/); });
