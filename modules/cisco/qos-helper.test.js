import assert from "node:assert/strict";
import test from "node:test";
import { buildQosPolicy } from "./qos-helper.js";
test("builds a Cisco QoS policy", () => { assert.equal(buildQosPolicy({ name: "EDGE-QOS", className: "VOICE", dscp: "EF", bandwidth: 10 }), "class-map match-any VOICE\n match dscp EF\npolicy-map EDGE-QOS\n class VOICE\n  priority 10"); });
test("rejects invalid QoS values", () => { assert.throws(() => buildQosPolicy({ name: "bad name" }), /valid QoS/); assert.throws(() => buildQosPolicy({ name: "Q", dscp: "INVALID" }), /valid DSCP/); });
