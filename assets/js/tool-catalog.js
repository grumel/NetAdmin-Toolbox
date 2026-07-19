import { t } from "./i18n.js";

const definitions = [
  { id:"ipv4", icon:"IP", nameKey:"tool_ipv4_name", descriptionKey:"tool_ipv4_description", keywords:["subnet","cidr","netmask","broadcast"] },
  { id:"ipv6", icon:"v6", nameKey:"tool_ipv6_name", descriptionKey:"tool_ipv6_description", keywords:["ipv6","prefix","network"] },
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
  { id:"powershell-generator", route:"powershell-generator", icon:"PS", name:() => "PowerShell Generator", description:() => t("network") === "Netzwerk" ? "Sichere PowerShell-Befehle erzeugen." : "Generate safe PowerShell commands.", keywords:["windows","powershell","ping","dns"] }
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
