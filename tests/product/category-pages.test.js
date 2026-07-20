import test from "node:test";
import assert from "node:assert/strict";

const pages = [
  ["Cisco", "../../modules/cisco/index.js", "acl-generator"],
  ["Windows", "../../modules/windows/index.js", "powershell-generator"],
  ["Linux", "../../modules/linux/index.js", "firewall-helper"],
  ["Security", "../../modules/security/index.js", "password-generator"],
  ["Developer", "../../modules/developer/index.js", "json-formatter"]
];

for (const [category, modulePath, expectedRoute] of pages) {
  test(`${category} page lists its tools`, async () => {
    const { render } = await import(modulePath);
    const html = render();
    assert.match(html, new RegExp(`href="#/${expectedRoute}"`));
    assert.doesNotMatch(html, /tools will appear here/i);
  });
}
