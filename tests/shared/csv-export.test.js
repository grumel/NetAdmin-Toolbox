import assert from "node:assert/strict";
import test from "node:test";
import { downloadCSV, escapeCSV, exportCSV } from "../../modules/shared/csv-export.js";

test("CSV escaping handles semicolons, quotes, and line breaks", () => {
  assert.equal(escapeCSV("plain"), "plain");
  assert.equal(escapeCSV("a;b"), '"a;b"');
  assert.equal(escapeCSV('a"b'), '"a""b"');
  assert.equal(escapeCSV("a\nb"), '"a\nb"');
});

test("CSV export uses BOM, semicolons, CRLF, and creates a download", () => {
  let clicked = false;
  let revoked = "";
  const originalDocument = globalThis.document;
  const originalURL = globalThis.URL;
  globalThis.document = { body: { append() {} }, createElement: () => ({ click() { clicked = true; }, remove() {} }) };
  globalThis.URL = { createObjectURL: () => "blob:test", revokeObjectURL: (url) => { revoked = url; } };
  try {
    const content = exportCSV("report", ["Name", "Value"], [["a;b", 'x"y'], ["line", "one\ntwo"]]);
    assert.equal(content.startsWith("\uFEFFName;Value\r\n"), true);
    assert.match(content, /"a;b";"x""y"/);
    assert.match(content, /"one\ntwo"/);
    assert.equal(clicked, true);
    assert.equal(revoked, "blob:test");
  } finally { globalThis.document = originalDocument; globalThis.URL = originalURL; }
});
