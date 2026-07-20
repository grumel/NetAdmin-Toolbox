import { renderCategoryPage } from "../shared/category-page.js";

export function render() {
  return renderCategoryPage({ categoryId: "security", title: "Security", summary: "Local tools for passwords, hashes, certificates, tokens, and encodings." });
}
