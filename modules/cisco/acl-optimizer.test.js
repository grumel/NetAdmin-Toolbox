import assert from "node:assert/strict";
import test from "node:test";
import { optimizeAcl } from "./acl-optimizer.js";
test("removes blanks, duplicates and rules after a terminal rule", () => { assert.deepEqual(optimizeAcl([" permit tcp host 10.0.0.1 any eq 443 ", "permit tcp host 10.0.0.1 any eq 443", "", "permit ip any any", "deny ip any any"]), { lines: ["permit tcp host 10.0.0.1 any eq 443", "permit ip any any"], removed: 3 }); });
test("keeps distinct rules and handles case-insensitive duplicates", () => { assert.deepEqual(optimizeAcl(["deny ip any any", "DENY IP ANY ANY"]), { lines: ["deny ip any any"], removed: 1 }); });
