import { t } from "../../../assets/js/i18n.js";

export const STANDARD_PORTS = [
  [20,"TCP","FTP Data","File transfer data channel"],[21,"TCP","FTP","File transfer control"],[22,"TCP","SSH","Secure shell and SFTP"],[23,"TCP","Telnet","Unencrypted remote terminal"],[25,"TCP","SMTP","Mail transfer"],[53,"TCP/UDP","DNS","Domain name resolution"],[67,"UDP","DHCP Server","Dynamic address assignment server"],[68,"UDP","DHCP Client","Dynamic address assignment client"],[69,"UDP","TFTP","Trivial file transfer"],[80,"TCP","HTTP","Unencrypted web traffic"],[88,"TCP/UDP","Kerberos","Network authentication"],[110,"TCP","POP3","Mail retrieval"],[123,"UDP","NTP","Time synchronization"],[135,"TCP","MS RPC","Microsoft RPC endpoint mapper"],[137,"UDP","NetBIOS Name","Legacy Windows name service"],[138,"UDP","NetBIOS Datagram","Legacy Windows datagrams"],[139,"TCP","NetBIOS Session","Legacy Windows file sharing"],[143,"TCP","IMAP","Mail retrieval"],[161,"UDP","SNMP","Network monitoring"],[162,"UDP","SNMP Trap","Network monitoring alerts"],[389,"TCP/UDP","LDAP","Directory service"],[443,"TCP","HTTPS","Encrypted web traffic"],[445,"TCP","SMB","Windows file and printer sharing"],[465,"TCP","SMTPS","Implicit TLS mail submission"],[500,"UDP","IKE","IPsec key exchange"],[514,"UDP","Syslog","System log transport"],[587,"TCP","SMTP Submission","Authenticated mail submission"],[636,"TCP","LDAPS","Encrypted directory service"],[993,"TCP","IMAPS","Encrypted IMAP"],[995,"TCP","POP3S","Encrypted POP3"],[1433,"TCP","MS SQL","Microsoft SQL Server"],[1521,"TCP","Oracle","Oracle database listener"],[1701,"UDP","L2TP","Layer 2 tunneling"],[1812,"UDP","RADIUS Auth","Network authentication"],[1813,"UDP","RADIUS Accounting","Network accounting"],[2049,"TCP/UDP","NFS","Network file system"],[3306,"TCP","MySQL","MySQL database"],[3389,"TCP/UDP","RDP","Windows Remote Desktop"],[4500,"UDP","IPsec NAT-T","IPsec through NAT"],[5060,"TCP/UDP","SIP","VoIP signaling"],[5061,"TCP","SIPS","Encrypted VoIP signaling"],[5432,"TCP","PostgreSQL","PostgreSQL database"],[5900,"TCP","VNC","Remote graphical desktop"],[5985,"TCP","WinRM HTTP","Windows remote management"],[5986,"TCP","WinRM HTTPS","Encrypted Windows remote management"],[8080,"TCP","HTTP Alternate","Common alternate web service"],[8443,"TCP","HTTPS Alternate","Common alternate encrypted web service"]
].map(([port,protocol,service,description]) => ({ port, protocol, service, description }));

export function portRange(port) {
  if (port <= 1023) return "wellKnown";
  if (port <= 49151) return "registered";
  return "dynamic";
}

export function searchPorts(query) {
  const term = String(query).trim().toLowerCase();
  if (!term) return STANDARD_PORTS;
  return STANDARD_PORTS.filter((entry) => [entry.port, entry.protocol, entry.service, entry.description].some((value) => String(value).toLowerCase().includes(term)));
}

function rows(entries) {
  return entries.map((entry) => `<tr><td><strong>${entry.port}</strong></td><td>${entry.protocol}</td><td>${entry.service}</td><td>${t(`port_${portRange(entry.port)}`)}</td><td>${entry.description}</td></tr>`).join("");
}

export function render() {
  return `<header class="page-header"><div><p class="eyebrow">${t("network")}</p><h1>${t("portTitle")}</h1><p class="page-summary">${t("portSummary")}</p></div></header><section class="card tool-workspace"><label for="port-query">${t("portQuery")}</label><input class="search-input" id="port-query" type="search" autocomplete="off" placeholder="443, HTTPS, DNS …"><p class="port-hint">${t("portRanges")}</p><div class="table-scroll"><table><thead><tr><th>${t("port")}</th><th>${t("protocol")}</th><th>${t("service")}</th><th>${t("range")}</th><th>${t("description")}</th></tr></thead><tbody id="port-results">${rows(STANDARD_PORTS)}</tbody></table></div><p id="port-empty" hidden>${t("noPorts")}</p></section>`;
}

export function initialize(container) {
  const input = container.querySelector("#port-query");
  const body = container.querySelector("#port-results");
  const empty = container.querySelector("#port-empty");
  input.addEventListener("input", () => {
    const matches = searchPorts(input.value);
    body.innerHTML = rows(matches);
    empty.hidden = matches.length > 0;
  });
}
