import assert from "node:assert/strict";
import test from "node:test";
import { buildCron } from "./cron-generator.js";
test("builds a cron entry", () => assert.equal(buildCron({ minute:"0", hour:"2", command:"/usr/bin/backup" }), "0 2 * * * /usr/bin/backup"));
test("rejects unsafe fields and commands", () => { assert.throws(() => buildCron({ command:"echo\nrm" }), /command/); assert.throws(() => buildCron({ minute:"x", command:"true" }), /cron field/); });
