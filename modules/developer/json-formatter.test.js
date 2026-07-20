import assert from "node:assert/strict";
import test from "node:test";
import { formatJson } from "./json-formatter.js";
test("formats valid JSON", () => assert.equal(formatJson('{"a":1}'), '{\n  "a": 1\n}'));
test("supports compact output", () => assert.equal(formatJson('{"a":1}', 0), '{"a":1}'));
test("rejects invalid JSON and indentation", () => { assert.throws(() => formatJson("nope"), /Invalid JSON/); assert.throws(() => formatJson("{}", 9), /Indentation/); });
