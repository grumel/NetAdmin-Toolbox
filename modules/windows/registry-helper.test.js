import assert from "node:assert/strict";
import test from "node:test";
import { buildRegistryGet, buildRegistrySet } from "./registry-helper.js";
test("builds PowerShell registry read and write commands", () => { assert.equal(buildRegistryGet({ path: "HKLM:\\Software\\NetAdmin", name: "Enabled" }), "Get-ItemPropertyValue -Path 'HKLM:\\Software\\NetAdmin' -Name 'Enabled'"); assert.equal(buildRegistrySet({ path: "HKCU:\\Software\\NetAdmin", name: "Mode", value: "dark" }), "Set-ItemProperty -Path 'HKCU:\\Software\\NetAdmin' -Name 'Mode' -Value 'dark' -Type String"); });
test("rejects unsafe paths and unsupported types", () => { assert.throws(() => buildRegistryGet({ path: "HKLM:\\bad;Remove-Item", name: "x" }), /valid registry path/); assert.throws(() => buildRegistrySet({ path: "HKLM:\\Software", name: "x", value: "1", type: "Unknown" }), /Unsupported/); });
