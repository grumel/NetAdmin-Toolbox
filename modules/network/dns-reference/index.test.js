import test from "node:test";
import assert from "node:assert/strict";

import { buildDnsQueryUrl, searchDnsRecords, validateDnsName } from "./index.js";

test("validates common DNS names", () => {
  assert.equal(validateDnsName("example.com"), true);
  assert.equal(validateDnsName("_sip._tcp.example.com"), false);
  assert.equal(validateDnsName("example.com."), true);
  assert.equal(validateDnsName(""), false);
  assert.equal(validateDnsName("bad name.example"), false);
  assert.equal(validateDnsName("-invalid.example"), false);
});

test("builds an encoded Google DNS-over-HTTPS query URL", () => {
  const url = new URL(buildDnsQueryUrl("example.com", "mx"));
  assert.equal(url.origin, "https://dns.google");
  assert.equal(url.pathname, "/resolve");
  assert.equal(url.searchParams.get("name"), "example.com");
  assert.equal(url.searchParams.get("type"), "MX");
});

test("searches DNS reference records", () => {
  assert.equal(searchDnsRecords("mail").some((record) => record.type === "MX"), true);
  assert.equal(searchDnsRecords("certificate").some((record) => record.type === "CAA"), true);
});
