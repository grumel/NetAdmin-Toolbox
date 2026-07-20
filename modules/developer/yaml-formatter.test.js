import assert from "node:assert/strict";
import test from "node:test";
import { formatYaml } from "./yaml-formatter.js";
test("normalizes YAML indentation", () => assert.equal(formatYaml("root:\n  child: value", 4), "root:\n    child: value"));
test("preserves comments and rejects tabs", () => { assert.equal(formatYaml("# note\nkey: value"), "# note\nkey: value"); assert.throws(() => formatYaml("key:\n\tvalue"), /tabs/); });
