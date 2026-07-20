import { renderCategoryPage } from "../shared/category-page.js";

export function render() {
  return renderCategoryPage({ category: "Developer", title: "Developer", summary: "Formatting, validation, generation, and encoding tools for developers." });
}
