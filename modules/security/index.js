import { renderCategoryPage } from "../shared/category-page.js";

export function render() {
  return renderCategoryPage({ category: "Security", title: "Security", summary: "Local tools for passwords, hashes, certificates, tokens, and encodings." });
}
