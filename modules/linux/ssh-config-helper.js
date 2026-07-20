/** Build a safe OpenSSH client host block. */
export function buildSshConfig({ host, hostname, user, port = "22", identityFile = "" }) {
  const clean = (value, label) => { const text = String(value ?? "").trim(); if (!text || /[\r\n]/.test(text) || /[\s]/.test(text)) throw new Error(`Enter a valid ${label}.`); return text; };
  const alias = clean(host, "host alias"); const target = clean(hostname, "hostname"); const account = clean(user, "user");
  if (!/^\d{1,5}$/.test(String(port)) || Number(port) < 1 || Number(port) > 65535) throw new Error("Enter a valid port.");
  const identity = identityFile ? String(identityFile).trim().replace(/[\r\n]/g, "") : "";
  return `Host ${alias}\n  HostName ${target}\n  User ${account}\n  Port ${port}${identity ? `\n  IdentityFile ${identity}` : ""}`;
}
