import { t } from "./i18n.js";

const definitions = [
  { id:"ipv4", icon:"IP", nameKey:"tool_ipv4_name", descriptionKey:"tool_ipv4_description", keywords:["subnet","cidr","netmask","broadcast"] },
  { id:"ipv6", icon:"v6", nameKey:"tool_ipv6_name", descriptionKey:"tool_ipv6_description", keywords:["ipv6","prefix","network"] },
  { id:"subnet-planner", route:"subnet-tools", icon:"SN", nameKey:"tool_subnet_planner_name", descriptionKey:"tool_subnet_planner_description", keywords:["vlsm","wildcard","summary","supernet"] },
  { id:"mac-converter", icon:"MAC", nameKey:"tool_mac_converter_name", descriptionKey:"tool_mac_converter_description", keywords:["mac","oui","cisco","ethernet","address"] },
  { id:"port-search", icon:"PORT", nameKey:"tool_port_search_name", descriptionKey:"tool_port_search_description", keywords:["port","tcp","udp","service","standard ports"] }
];

export function localizedTools() {
  return definitions.map((tool) => ({ ...tool, route:tool.route || tool.id, category:t("network"), name:t(tool.nameKey), description:t(tool.descriptionKey) }));
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
