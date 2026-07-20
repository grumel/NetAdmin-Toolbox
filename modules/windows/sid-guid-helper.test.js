import assert from "node:assert/strict";
import test from "node:test";
import { generateGuid, parseSid } from "./sid-guid-helper.js";
test("parses Windows SIDs into components", () => { assert.deepEqual(parseSid("S-1-5-21-100-200-300-1001"), { revision: 1, identifierAuthority: 5, subAuthorities: [21, 100, 200, 300, 1001], sid: "S-1-5-21-100-200-300-1001" }); });
test("generates a version 4 GUID", () => { const guid = generateGuid(new Uint8Array(16)); assert.match(guid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/); });
test("rejects invalid SIDs", () => { assert.throws(() => parseSid("S-1-invalid"), /valid Windows SID/); });
