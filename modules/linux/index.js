import { renderCategoryPage } from "../shared/category-page.js";

export function render() {
  return renderCategoryPage({ category: "Linux", title: "Linux", summary: "Tools for Linux services, permissions, scheduling, SSH, and firewalls." });
}
