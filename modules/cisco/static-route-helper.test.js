import assert from "node:assert/strict";
import test from "node:test";
import { buildStaticRoute } from "./static-route-helper.js";
test("builds a canonical Cisco static route", () => { assert.equal(buildStaticRoute({ network: "192.0.2.42", prefix: 24, nextHop: "192.0.2.1", distance: 10 }).command, "ip route 192.0.2.0 255.255.255.0 192.0.2.1 10"); });
test("rejects invalid gateways and distances", () => { assert.throws(() => buildStaticRoute({ network: "10.0.0.0", prefix: 8, nextHop: "300.0.0.1" }), /valid destination/); assert.throws(() => buildStaticRoute({ network: "10.0.0.0", prefix: 8, nextHop: "10.0.0.1", distance: 0 }), /1-255/); });
