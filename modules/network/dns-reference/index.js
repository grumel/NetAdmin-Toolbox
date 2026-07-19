import { t } from "../../../assets/js/i18n.js";

export const DNS_RECORDS = [
  ["A", "IPv4 address", "Maps a hostname to an IPv4 address.", "example.com. 3600 IN A 192.0.2.10"],
  ["AAAA", "IPv6 address", "Maps a hostname to an IPv6 address.", "example.com. 3600 IN AAAA 2001:db8::10"],
  ["CNAME", "Canonical name", "Creates an alias that points to another hostname.", "www.example.com. 3600 IN CNAME example.com."],
  ["MX", "Mail exchanger", "Defines mail servers and their delivery priority.", "example.com. 3600 IN MX 10 mail.example.com."],
  ["TXT", "Text", "Stores text values such as SPF, DKIM and verification tokens.", "example.com. 3600 IN TXT \"v=spf1 mx -all\""],
  ["NS", "Name server", "Delegates a DNS zone to authoritative name servers.", "example.com. 86400 IN NS ns1.example.net."],
  ["SOA", "Start of authority", "Contains the primary server, zone serial and timing values.", "example.com. 86400 IN SOA ns1.example.net. hostmaster.example.com. 2026071901 3600 900 1209600 300"],
  ["PTR", "Pointer", "Maps an IP address back to a hostname in a reverse DNS zone.", "10.2.0.192.in-addr.arpa. 3600 IN PTR host.example.com."],
  ["SRV", "Service locator", "Publishes a service hostname, port, priority and weight.", "_sip._tcp.example.com. 3600 IN SRV 10 5 5060 sip.example.com."],
  ["CAA", "Certification authority authorization", "Restricts which certificate authorities may issue certificates.", "example.com. 3600 IN CAA 0 issue \"letsencrypt.org\""],
  ["NAPTR", "Naming authority pointer", "Defines rewrite rules commonly used with SIP and ENUM.", "example.com. 3600 IN NAPTR 100 10 \"U\" \"E2U+sip\" \"!^.*$!sip:info@example.com!\" ."],
  ["DS", "Delegation signer", "Links a delegated child zone to DNSSEC trust in the parent zone.", "example.com. 86400 IN DS 12345 13 2 49FD46E6C4B45C55D4AC"],
  ["TLSA", "TLS authentication", "Associates a TLS certificate or public key with a service endpoint.", "_443._tcp.example.com. 3600 IN TLSA 3 1 1 2A3B4C5D" ]
].map(([type,name,description,example]) => ({ type, name, description, example }));

export function searchDnsRecords(query) {
  const term = String(query).trim().toLowerCase();
  if (!term) return DNS_RECORDS;
  return DNS_RECORDS.filter((record) => [record.type, record.name, record.description, record.example]
    .some((value) => value.toLowerCase().includes(term)));
}

function rows(records) {
  return records.map((record) => `<tr><td><strong>${record.type}</strong></td><td>${record.name}</td><td>${record.description}</td><td><code>${record.example}</code></td></tr>`).join("");
}

export function render() {
  return `<header class="page-header"><div><p class="eyebrow">${t("network")}</p><h1>${t("dnsReferenceTitle")}</h1><p class="page-summary">${t("dnsReferenceSummary")}</p></div></header><section class="card tool-workspace"><label for="dns-record-query">${t("dnsReferenceQuery")}</label><input class="search-input" id="dns-record-query" type="search" autocomplete="off" placeholder="A, MX, SPF, certificate …"><div class="table-scroll"><table><thead><tr><th>${t("dnsRecordType")}</th><th>${t("dnsRecordName")}</th><th>${t("description")}</th><th>${t("dnsRecordExample")}</th></tr></thead><tbody id="dns-record-results">${rows(DNS_RECORDS)}</tbody></table></div><p id="dns-record-empty" hidden>${t("dnsReferenceEmpty")}</p></section>`;
}

export function initialize(container) {
  const input = container.querySelector("#dns-record-query");
  const body = container.querySelector("#dns-record-results");
  const empty = container.querySelector("#dns-record-empty");
  input?.addEventListener("input", () => {
    const matches = searchDnsRecords(input.value);
    body.innerHTML = rows(matches);
    empty.hidden = matches.length > 0;
  });
}
