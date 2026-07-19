export const tools = [
  { id: "ipv4", name: "IPv4 Calculator", category: "Network", icon: "IP", description: "Calculate subnet boundaries, hosts, masks, and address metadata.", keywords: ["subnet", "cidr", "netmask", "broadcast"] },
  { id: "ipv6", name: "IPv6 Calculator", category: "Network", icon: "v6", description: "Expand, compress, classify, and calculate IPv6 networks.", keywords: ["ipv6", "prefix", "network"] },
  { id: "subnet-planner", name: "Subnet Planner", category: "Network", icon: "SN", description: "Plan CIDR, wildcard, VLSM, and route summaries.", keywords: ["vlsm", "wildcard", "summary", "supernet"] }
];

export function findTool(id) {
  return tools.find((tool) => tool.id === id) ?? null;
}

export function searchTools(query) {
  const terms = String(query).trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return tools;
  return tools.filter((tool) => {
    const haystack = [tool.name, tool.category, tool.description, ...tool.keywords].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
