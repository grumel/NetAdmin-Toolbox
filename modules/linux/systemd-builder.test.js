import assert from "node:assert/strict";
import test from "node:test";
import { buildSystemdUnit } from "./systemd-builder.js";
test("builds a service unit", () => assert.match(buildSystemdUnit({ description:"Backup", execStart:"/usr/bin/backup", user:"backup" }), /ExecStart=\/usr\/bin\/backup[\s\S]*User=backup/));
test("rejects invalid values", () => assert.throws(() => buildSystemdUnit({ description:"x", execStart:"true\n" }), /command/));
