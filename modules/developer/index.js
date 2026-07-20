import { renderCategoryPage } from "../shared/category-page.js";

export function render() {
  return renderCategoryPage({ categoryId: "developer", title: "Developer", summary: "Formatting, validation, generation, and encoding tools for developers." });
}
