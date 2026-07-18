/** Navigation registry. Add future tool pages here without changing the shell. */
export const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "tools", label: "Tools", icon: "⌘" },
  { id: "settings", label: "Settings", icon: "⚙" }
];

export function renderNavigation(activeId) {
  return navigationItems.map(({ id, label, icon }) => `
    <a class="nav-link" href="#${id}" ${id === activeId ? 'aria-current="page"' : ""}>
      <span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span>
    </a>`).join("");
}
