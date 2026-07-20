import { renderCategoryPage } from "../shared/category-page.js";

export function render() {
  return renderCategoryPage({ category: "Windows", title: "Windows", summary: "Tools for Windows administration and PowerShell workflows." });
}
