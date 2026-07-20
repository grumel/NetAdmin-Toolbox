import assert from "node:assert/strict";
import test from "node:test";
import { delegateIPv6Prefix } from "./prefix-delegation.js";
test("delegates an IPv6 /62 into four /64 networks", () => { assert.deepEqual(delegateIPv6Prefix("2001:db8::", 62, 64), ["2001:db8::", "2001:db8:0:1::", "2001:db8:0:2::", "2001:db8:0:3::"]); });
test("rejects oversized delegation", () => { assert.throws(() => delegateIPv6Prefix("2001:db8::", 0, 128), /limit/); });
