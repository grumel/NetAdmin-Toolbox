import assert from "node:assert/strict";
import test from "node:test";
import { generatePassword } from "./password-generator.js";
test("generates a password with the requested length", () => { const password = generatePassword(24, { symbols: false }); assert.equal(password.length, 24); assert.match(password, /^[A-Za-z0-9]+$/); });
test("rejects unsafe lengths and empty character sets", () => { assert.throws(() => generatePassword(4), /8-128/); assert.throws(() => generatePassword(12, { lower: false, upper: false, digits: false, symbols: false }), /character set/); });
