import assert from "node:assert/strict";
import test from "node:test";
import { testRegex } from "./regex-tester.js";
test("returns all global matches", () => assert.deepEqual(testRegex("net", "Net net NET", "gi"), ["Net", "net", "NET"]));
test("returns a single match without global flag", () => assert.deepEqual(testRegex("\\d+", "a12 b34"), ["12"]));
test("rejects invalid expressions", () => assert.throws(() => testRegex("[", "x"), /Invalid/));
