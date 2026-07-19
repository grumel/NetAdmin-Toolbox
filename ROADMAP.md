# Roadmap

This roadmap reflects the current browser-based, offline-first architecture of NetAdmin Toolbox.

## Completed

### v0.1 — Foundation

- [x] Repository structure
- [x] Application shell
- [x] Documentation and license
- [x] Basic service worker and manifest

### v0.2 — Navigation and dashboard

- [x] Dashboard
- [x] Modular routing
- [x] Search and command palette
- [x] Responsive navigation

### v0.3 — IPv4 tools

- [x] IPv4 calculator
- [x] CIDR and netmask validation
- [x] Network, broadcast and host calculations
- [x] Browser tests for validation and routing

### v0.4 — Extended network planning

- [x] IPv6 calculator
- [x] CIDR and wildcard conversion
- [x] VLSM subnet planning
- [x] Route summarization
- [x] Favorites and recent tools
- [x] Settings import and export

### v0.5 — Offline toolbox release

- [x] MAC address converter
- [x] Automatic MAC conversion
- [x] Standard port search
- [x] German and English localization
- [x] PWA cache hardening
- [x] Visible application version
- [x] Changelog and release documentation

## In progress

### v0.6 — Diagnostics and reference tools

- [x] DNS record reference
- [x] DNS query helper using browser-based DNS over HTTPS
- [x] IP and hostname input validation shared across tools
- [x] Export selected calculation results as CSV
- [x] Improve printable result layouts
- [ ] Expand automated tests for tool catalog and localization

## Planned

### v0.7 — Cisco and configuration helpers

- [ ] Cisco interface configuration generator
- [ ] VLAN configuration generator
- [ ] ACL wildcard helper integration
- [ ] Configuration export and copy workflow

### v0.8 — Optional local diagnostics

Direct ICMP ping sweeps and unrestricted TCP scans are not available from normal browser JavaScript. These features require an explicitly installed local companion service.

- [ ] Define a secure local companion API
- [ ] Optional ICMP reachability checks
- [ ] Optional local TCP port checks
- [ ] Host discovery result table and export
- [ ] Clear permission and security model

### Later

- [ ] Windows administration references
- [ ] Linux administration references
- [ ] Security checklists and certificate tools
- [ ] Developer encoding and conversion tools
- [ ] Additional accessibility and mobile improvements
