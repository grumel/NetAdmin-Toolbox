import assert from "node:assert/strict";
import test from "node:test";
import { diagnoseTarget } from "./diagnostics.js";
test("diagnoses IPv4 targets", () => { assert.deepEqual(diagnoseTarget(" 192.168.1.10 "), { input: "192.168.1.10", kind: "IPv4", addressClass: "C", numeric: 3232235786, local: true }); });
test("diagnoses hostnames and rejects invalid targets", () => { assert.equal(diagnoseTarget("Example.COM").kind, "Hostname"); assert.throws(() => diagnoseTarget("not a target"), /valid IPv4/); });
