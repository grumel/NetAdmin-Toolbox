/** Build a safe systemd service unit from structured values. */
export function buildSystemdUnit({ description, execStart, user = "", restart = "on-failure" }) {
  const clean = (value, label) => { const raw = String(value ?? ""); if (!raw.trim() || /[\r\n]/.test(raw)) throw new Error(`Enter a valid ${label}.`); return raw.trim(); };
  const desc = clean(description, "description"); const command = clean(execStart, "command");
  if (!/^(always|on-failure|on-abnormal|on-watch|on-abort|no)$/.test(restart)) throw new Error("Invalid restart policy.");
  const account = user ? clean(user, "user") : "";
  return `[Unit]\nDescription=${desc}\n\n[Service]\nExecStart=${command}${account ? `\nUser=${account}` : ""}\nRestart=${restart}\n\n[Install]\nWantedBy=multi-user.target`;
}
