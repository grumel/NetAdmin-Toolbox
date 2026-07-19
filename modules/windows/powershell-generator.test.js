import assert from "node:assert/strict";
import test from "node:test";
import { generateDnsCommand, generatePingCommand } from "./powershell-generator.js";
test("generates safe PowerShell ping and DNS commands", () => { assert.equal(generatePingCommand("192.0.2.1", 2), "Test-Connection -ComputerName '192.0.2.1' -Count 2"); assert.equal(generateDnsCommand("example.com"), "Resolve-DnsName -Name 'example.com'"); });
test("rejects unsafe targets and invalid counts", () => { assert.throws(() => generatePingCommand("x; Remove-Item *"), /valid host/); assert.throws(() => generatePingCommand("host", 0), /1-100/); });
