import assert from "node:assert/strict";
import test from "node:test";
import { buildSshConfig } from "./ssh-config-helper.js";
test("builds an SSH host block", () => assert.match(buildSshConfig({ host:"router", hostname:"192.0.2.1", user:"admin" }), /Host router[\s\S]*Port 22/));
test("rejects invalid connection data", () => assert.throws(() => buildSshConfig({ host:"bad alias", hostname:"x", user:"u" }), /alias/));
