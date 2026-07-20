import assert from "node:assert/strict";
import test from "node:test";
import { formatXml } from "./xml-formatter.js";
test("formats nested XML", () => assert.equal(formatXml("<root><item>value</item></root>"), "<root>\n  <item>\n    value\n  </item>\n</root>"));
test("rejects malformed XML", () => assert.throws(() => formatXml("not xml"), /Invalid XML/));
