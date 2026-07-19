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
  ["TLSA", "TLS authentication", "Associates a TLS certificate or public key with a service endpoint.", "_443._tcp.example.com. 3600 IN TLSA 3 1 1 2A3B4C5D"]
].map(([type, name, description, example]) => ({ type, name, description, example }));

const QUERY_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA", "PTR", "SRV", "CAA"];

export function searchDnsRecords(query) {
  const term = String(query).trim().toLowerCase();
  if (!term) return DNS_RECORDS;
  return DNS_RECORDS.filter((record) => [record.type, record.name, record.description, record.example]
    .some((value) => value.toLowerCase().includes(term)));
}

export function validateDnsName(value) {
  const name = String(value).trim().replace(/\.$/, "");
  if (!name || name.length > 253) return false;
  return name.split(".").every((label) => label.length > 0 && label.length <= 63 && /^[a-z0-9_](?:[a-z0-9_-]*[a-z0-9_])?$/i.test(label));
}

export function buildDnsQueryUrl(name, type) {
  const params = new URLSearchParams({ name: String(name).trim(), type: String(type).toUpperCase() });
  return `https://dns.google/resolve?${params.toString()}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function rows(records) {
  return records.map((record) => `<tr><td><strong>${record.type}</strong></td><td>${record.name}</td><td>${record.description}</td><td><code>${record.example}</code></td></tr>`).join("");
}

function answerRows(answers = []) {
  return answers.map((answer) => `<tr><td>${escapeHtml(answer.name ?? "")}</td><td>${escapeHtml(answer.type ?? "")}</td><td>${escapeHtml(answer.TTL ?? "")}</td><td><code>${escapeHtml(answer.data ?? "")}</code></td></tr>`).join("");
}

export function render() {
  const typeOptions = QUERY_TYPES.map((type) => `<option value="${type}">${type}</option>`).join("");
  return `<header class="page-header"><div><p class="eyebrow">${t("network")}</p><h1>${t("dnsReferenceTitle")}</h1><p class="page-summary">${t("dnsReferenceSummary")}</p></div></header>
  <section class="card tool-workspace">
    <h2>${t("dnsLookupTitle")}</h2>
    <p>${t("dnsLookupSummary")}</p>
    <form id="dns-query-form" class="tool-form">
      <label for="dns-query-name">${t("dnsLookupName")}</label>
      <input id="dns-query-name" type="text" inputmode="url" autocomplete="off" placeholder="example.com" required>
      <label for="dns-query-type">${t("dnsLookupType")}</label>
      <select id="dns-query-type">${typeOptions}</select>
      <button type="submit">${t("dnsLookupButton")}</button>
    </form>
    <p id="dns-query-status" role="status" aria-live="polite"></p>
    <div id="dns-query-results" class="table-scroll" hidden><table><thead><tr><th>${t("dnsLookupAnswerName")}</th><th>${t("dnsRecordType")}</th><th>TTL</th><th>${t("dnsLookupData")}</th></tr></thead><tbody id="dns-query-answer-body"></tbody></table></div>
  </section>
  <section class="card tool-workspace"><h2>${t("dnsReferenceListTitle")}</h2><label for="dns-record-query">${t("dnsReferenceQuery")}</label><input class="search-input" id="dns-record-query" type="search" autocomplete="off" placeholder="A, MX, SPF, certificate …"><div class="table-scroll"><table><thead><tr><th>${t("dnsRecordType")}</th><th>${t("dnsRecordName")}</th><th>${t("description")}</th><th>${t("dnsRecordExample")}</th></tr></thead><tbody id="dns-record-results">${rows(DNS_RECORDS)}</tbody></table></div><p id="dns-record-empty" hidden>${t("dnsReferenceEmpty")}</p></section>`;
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

  const form = container.querySelector("#dns-query-form");
  const nameInput = container.querySelector("#dns-query-name");
  const typeInput = container.querySelector("#dns-query-type");
  const status = container.querySelector("#dns-query-status");
  const results = container.querySelector("#dns-query-results");
  const answerBody = container.querySelector("#dns-query-answer-body");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const type = typeInput.value;
    results.hidden = true;
    answerBody.innerHTML = "";

    if (!validateDnsName(name)) {
      status.textContent = t("dnsLookupInvalid");
      nameInput.focus();
      return;
    }

    status.textContent = t("dnsLookupLoading");
    try {
      const response = await fetch(buildDnsQueryUrl(name, type), {
        headers: { Accept: "application/dns-json" },
        credentials: "omit"
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const answers = Array.isArray(payload.Answer) ? payload.Answer : [];
      if (!answers.length) {
        status.textContent = payload.Status === 0 ? t("dnsLookupNoAnswers") : t("dnsLookupDnsError", { status: payload.Status });
        return;
      }
      answerBody.innerHTML = answerRows(answers);
      results.hidden = false;
      status.textContent = t("dnsLookupSuccess", { count: answers.length });
    } catch (error) {
      console.error("DNS lookup failed", error);
      status.textContent = t("dnsLookupNetworkError");
    }
  });
}
