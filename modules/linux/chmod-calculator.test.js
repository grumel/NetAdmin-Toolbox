import assert from "node:assert/strict";
import test from "node:test";
import { chmodToSymbolic } from "./chmod-calculator.js";
test("converts common chmod modes", () => assert.equal(chmodToSymbolic("755"), "rwxr-xr-x"));
test("handles no permissions and rejects malformed modes", () => { assert.equal(chmodToSymbolic("000"), "---------"); assert.throws(() => chmodToSymbolic("7777"), /three-digit/); });
