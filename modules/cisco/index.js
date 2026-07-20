import { renderCategoryPage } from "../shared/category-page.js";

export function render() {
  return renderCategoryPage({ category: "Cisco", title: "Cisco", summary: "Tools for Cisco switching, routing, and network configuration." });
}
