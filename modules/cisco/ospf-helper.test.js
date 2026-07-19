import assert from "node:assert/strict";
import test from "node:test";
import { buildOspfNetwork, buildOspfProcess } from "./ospf-helper.js";
test("builds an OSPF network statement with wildcard", () => { assert.equal(buildOspfNetwork({ network: "10.0.0.42", prefix: "/24", area: "0" }).command, " network 10.0.0.0 0.0.0.255 area 0"); });
test("builds an OSPF process configuration", () => { assert.equal(buildOspfProcess({ processId: 1, routerId: "10.0.0.1", networks: [{ network: "10.0.0.0", prefix: 24, area: "0" }] }), "router ospf 1\n router-id 10.0.0.1\n network 10.0.0.0 0.0.0.255 area 0"); });
test("rejects invalid process and area values", () => { assert.throws(() => buildOspfProcess({ processId: 0, networks: [] }), /1-65535/); assert.throws(() => buildOspfNetwork({ network: "10.0.0.0", prefix: 24, area: "300" }), /valid OSPF area/); });
