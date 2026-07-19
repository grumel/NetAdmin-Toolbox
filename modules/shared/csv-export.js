/** Escapes one CSV cell according to RFC 4180, using semicolon as delimiter. */
export function escapeCSV(value) {
  const text = String(value ?? "");
  return /[;"\r\n]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}

/** Triggers a UTF-8 CSV download through a Blob object URL. */
export function downloadCSV(filename, content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Builds and downloads Windows Excel-compatible UTF-8 CSV content. */
export function exportCSV(filename, headers, rows) {
  const line = (values) => values.map(escapeCSV).join(";");
  const content = `\uFEFF${[headers, ...rows].map(line).join("\r\n")}\r\n`;
  downloadCSV(filename, content);
  return content;
}
