import { t } from "./i18n.js";

const definitions = [
  { id:"ipv4", icon:"IP", nameKey:"tool_ipv4_name", descriptionKey:"tool_ipv4_description", keywords:["subnet","cidr","netmask","broadcast"] },
  { id:"ipv6", icon:"v6", nameKey:"tool_ipv6_name", descriptionKey:"tool_ipv6_description", keywords:["ipv6","prefix","network"] },
  { id:"ipv6-prefix-delegation", route:"ipv6-prefix-delegation", icon:"PD", name:() => t("network") === "Netzwerk" ? "IPv6-Präfixdelegation" : "IPv6 Prefix Delegation", description:() => t("network") === "Netzwerk" ? "IPv6-Präfixe in Child-Netze aufteilen." : "Split IPv6 prefixes into child networks.", keywords:["ipv6","prefix","delegation","subnet"] },
  { id:"subnet-planner", route:"subnet-tools", icon:"SN", nameKey:"tool_subnet_planner_name", descriptionKey:"tool_subnet_planner_description", keywords:["vlsm","wildcard","summary","supernet"] },
  { id:"mac-converter", icon:"MAC", nameKey:"tool_mac_converter_name", descriptionKey:"tool_mac_converter_description", keywords:["mac","oui","cisco","ethernet","address"] },
  { id:"port-search", icon:"PORT", nameKey:"tool_port_search_name", descriptionKey:"tool_port_search_description", keywords:["port","tcp","udp","service","standard ports"] },
  { id:"dns-reference", icon:"DNS", nameKey:"tool_dns_reference_name", descriptionKey:"tool_dns_reference_description", keywords:["dns","record","a","aaaa","mx","txt","cname","soa","ns","srv","caa","dnssec"] },
  { id:"acl-generator", route:"acl-generator", icon:"ACL", name:() => t("network") === "Netzwerk" ? "ACL-Generator" : "ACL Generator", description:() => t("network") === "Netzwerk" ? "Cisco Extended-IPv4-Zugriffslisten erstellen." : "Build Cisco extended IPv4 access-control entries.", keywords:["cisco","acl","access list","permit","deny"] },
  { id:"acl-optimizer", route:"acl-optimizer", icon:"OPT", name:() => t("network") === "Netzwerk" ? "ACL-Optimierer" : "ACL Optimizer", description:() => t("network") === "Netzwerk" ? "Doppelte und überschattete ACL-Regeln entfernen." : "Remove duplicate and shadowed ACL rules.", keywords:["cisco","acl","optimize","duplicate","shadow"] },
  { id:"interface-converter", route:"interface-converter", icon:"IF", name:() => t("network") === "Netzwerk" ? "Interface-Konverter" : "Interface Converter", description:() => t("network") === "Netzwerk" ? "Cisco-Interface-Namen umwandeln." : "Convert Cisco interface names.", keywords:["cisco","interface","gigabitethernet","fastethernet"] },
  { id:"ospf-helper", route:"ospf-helper", icon:"OSPF", name:() => "OSPF Helper", description:() => t("network") === "Netzwerk" ? "OSPF-Netzwerkbefehle erzeugen." : "Generate OSPF network commands.", keywords:["cisco","ospf","routing","wildcard"] },
  { id:"static-route-helper", route:"static-route-helper", icon:"ROUTE", name:() => t("network") === "Netzwerk" ? "Static-Route-Helfer" : "Static Route Helper", description:() => t("network") === "Netzwerk" ? "Statische Cisco-Routen erzeugen." : "Generate Cisco static routes.", keywords:["cisco","route","routing","next hop"] },
  { id:"vlan-calculator", route:"vlan-calculator", icon:"VLAN", name:() => t("network") === "Netzwerk" ? "VLAN-Rechner" : "VLAN Calculator", description:() => t("network") === "Netzwerk" ? "VLAN-IDs prüfen und Cisco-Konfiguration erzeugen." : "Validate VLAN IDs and generate Cisco configuration.", keywords:["cisco","vlan","switch","trunk","access"] },
  { id:"powershell-generator", route:"powershell-generator", icon:"PS", name:() => "PowerShell Generator", description:() => t("network") === "Netzwerk" ? "Sichere PowerShell-Befehle erzeugen." : "Generate safe PowerShell commands.", keywords:["windows","powershell","ping","dns"] },
  { id:"sid-guid-helper", route:"sid-guid-helper", icon:"SID", name:() => "SID / GUID Helper", description:() => t("network") === "Netzwerk" ? "Windows-SIDs und GUIDs bearbeiten." : "Inspect Windows SIDs and generate GUIDs.", keywords:["windows","sid","guid","uuid"] },
  { id:"dhcp-helper", route:"dhcp-helper", icon:"DHCP", name:() => "DHCP Helper", description:() => t("network") === "Netzwerk" ? "Windows-DHCP-Bereiche erzeugen." : "Generate Windows DHCP scopes.", keywords:["windows","dhcp","scope","powershell"] },
  { id:"registry-helper", route:"registry-helper", icon:"REG", name:() => "Registry Helper", description:() => t("network") === "Netzwerk" ? "PowerShell-Registry-Befehle erzeugen." : "Generate PowerShell registry commands.", keywords:["windows","registry","powershell","hklm"] },
  { id:"network-diagnostics", route:"network-diagnostics", icon:"DIAG", name:() => t("network") === "Netzwerk" ? "Netzwerkdiagnose" : "Network Diagnostics", description:() => t("network") === "Netzwerk" ? "IPv4-Adressen und Hostnamen lokal analysieren." : "Analyze IPv4 addresses and hostnames locally.", keywords:["diagnostics","network","ipv4","hostname"] },
  { id:"stp-helper", route:"stp-helper", icon:"STP", name:() => "STP Helper", description:() => t("network") === "Netzwerk" ? "Cisco-Spanning-Tree-Befehle erzeugen." : "Generate Cisco Spanning Tree commands.", keywords:["cisco","stp","spanning tree","root"] },
  { id:"qos-helper", route:"qos-helper", icon:"QOS", name:() => "QoS Helper", description:() => t("network") === "Netzwerk" ? "Cisco-QoS-Befehle erzeugen." : "Generate Cisco QoS commands.", keywords:["cisco","qos","dscp","priority"] },
  { id:"vxlan-helper", route:"vxlan-helper", icon:"VX", name:() => "VXLAN Helper", description:() => t("network") === "Netzwerk" ? "Cisco-VXLAN-Befehle erzeugen." : "Generate Cisco VXLAN commands.", keywords:["cisco","vxlan","nve","vni"] },
  { id:"mpls-helper", route:"mpls-helper", icon:"MPLS", name:() => "MPLS Helper", description:() => t("network") === "Netzwerk" ? "Cisco-MPLS-Befehle erzeugen." : "Generate Cisco MPLS commands.", keywords:["cisco","mpls","ldp","labels"] },
  { id:"password-generator", route:"password-generator", icon:"PW", name:() => t("network") === "Netzwerk" ? "Passwortgenerator" : "Password Generator", description:() => t("network") === "Netzwerk" ? "Zufällige Passwörter lokal erzeugen." : "Generate random passwords locally.", keywords:["security","password","random","crypto"] },
  { id:"hash-generator", route:"hash-generator", icon:"HASH", name:() => t("network") === "Netzwerk" ? "Hashgenerator" : "Hash Generator", description:() => t("network") === "Netzwerk" ? "Text lokal mit SHA hashen." : "Hash text locally with SHA algorithms.", keywords:["security","hash","sha256","sha512"] }
];

export function localizedTools() {
  return definitions.map((tool) => ({ ...tool, route:tool.route || tool.id, category:t("network"), name:tool.nameKey ? t(tool.nameKey) : typeof tool.name === "function" ? tool.name() : tool.name, description:tool.descriptionKey ? t(tool.descriptionKey) : typeof tool.description === "function" ? tool.description() : tool.description }));
}

export const tools = new Proxy([], {
  get(_target, property) {
    const current = localizedTools();
    const value = current[property];
    return typeof value === "function" ? value.bind(current) : value;
  }
});

export function findTool(id) { return localizedTools().find((tool) => tool.id === id || tool.route === id) ?? null; }
export function searchTools(query) {
  const terms = String(query).trim().toLowerCase().split(/\s+/).filter(Boolean);
  const current = localizedTools();
  if (!terms.length) return current;
  return current.filter((tool) => terms.every((term) => [tool.name,tool.category,tool.description,...tool.keywords].join(" ").toLowerCase().includes(term)));
}
