/** Build a validated five-field cron expression. */
export function buildCron({ minute="*", hour="*", day="*", month="*", weekday="*", command }) {
  const fields = [minute, hour, day, month, weekday].map((field) => String(field).trim());
  if (fields.some((field) => !/^[0-9*/?,\-]+$/.test(field))) throw new Error("Invalid cron field.");
  const text = String(command ?? "").trim();
  if (!text || /[\r\n]/.test(text)) throw new Error("Enter a valid command.");
  return `${fields.join(" ")} ${text}`;
}
