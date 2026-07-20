import assert from "node:assert/strict";
import test from "node:test";
import { generateUuid } from "./uuid-generator.js";
test("generates a UUID v4 through the secure API", () => assert.match(generateUuid(() => "123e4567-e89b-42d3-a456-426614174000"), /^[0-9a-f-]{36}$/));
test("rejects unavailable secure generation", () => assert.throws(() => generateUuid(null), /unavailable/));
