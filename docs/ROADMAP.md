<<<<<<< HEAD
# Roadmap

NetAdmin-Toolbox is an offline-first, dependency-free toolkit for network and system administrators. Milestones describe intended outcomes, not release promises; see [BACKLOG.md](BACKLOG.md) for prioritised work.

## Completed foundation

- PWA shell, manifest, service worker, theme support, dashboard, and hash-based modular router.
- Network area and a production-oriented IPv4 Calculator with pure calculations and unit tests.

## Current milestone: IPv4 hardening

- Improve field-specific validation, screen-reader feedback, and light-theme error contrast.
- Add browser-level interaction tests and document calculator behaviour, including `/31` and `/32` semantics.
- Refine special-use IPv4 policy and service-worker cache policy.

## Next milestones

1. **IPv6 Calculator** — parsing, expansion/compression, prefix operations, reverse DNS, and classification.
2. **CIDR and planning tools** — CIDR, netmask, wildcard conversion, VLSM design, and route summarisation.
3. **Administration suites** — Cisco, Windows, Linux, Security, and Developer tools.
4. **Productivity and polish** — search, favourites, import/export, accessibility audit, end-to-end tests, and release preparation.

## Version 1.0 criteria

A release candidate requires stable core tools, documented offline behaviour, automated tests for pure logic and critical UI flows, an accessibility review, and release notes. See [DEFINITION_OF_DONE.md](DEFINITION_OF_DONE.md).
=======
# NetAdmin-Toolbox Roadmap

This roadmap records product milestones. Detailed work items belong in [BACKLOG.md](BACKLOG.md).

## 0.1.x — Foundation

- [x] Repository and project documentation
- [x] Progressive Web App foundation
- [x] Responsive application shell
- [x] Theme support
- [x] Modular router
- [x] Dashboard and category modules

## 0.2.x — IPv4 Toolkit

- [x] IPv4 calculator implementation
- [x] Separation of UI, validation, calculation and formatting
- [x] Initial unit tests
- [ ] IPv4 hardening
- [ ] Complete special-purpose range classification
- [ ] Accessibility refinement
- [ ] Browser-level tests
- [ ] Service worker cache hardening

## 0.3.x — IPv6 Toolkit

- [ ] IPv6 parser and validator
- [ ] Expansion and compression
- [ ] Prefix calculations
- [ ] Address classification
- [ ] Reverse DNS generation
- [ ] Unit and browser tests

## 0.4.x — Address Planning

- [ ] CIDR and netmask converter
- [ ] Wildcard converter
- [ ] VLSM designer
- [ ] Subnet planner
- [ ] Export to text, JSON and CSV

## 0.5.x — Routing and Cisco

- [ ] Route summarization
- [ ] ACL generator
- [ ] ACL optimizer
- [ ] VLAN calculator
- [ ] Interface converter
- [ ] OSPF and static-route helpers

## 0.6.x — Windows Toolkit

- [ ] PowerShell generators
- [ ] SID and GUID helpers
- [ ] DNS and DHCP tools
- [ ] Registry helpers

## 0.7.x — Linux Toolkit

- [ ] chmod calculator
- [ ] cron generator
- [ ] systemd builder
- [ ] SSH configuration helper
- [ ] nftables and iptables helpers

## 0.8.x — Security and Developer Toolkit

- [ ] Password and hash utilities
- [ ] Certificate inspector
- [ ] JWT and Base64 tools
- [ ] JSON, YAML and XML formatters
- [ ] Regex, UUID and URL tools

## 0.9.x — Product Experience

- [ ] Global search
- [ ] Favorites and recent tools
- [ ] Keyboard shortcuts and command palette
- [ ] Import and export
- [ ] Settings and localization foundation
- [ ] Full accessibility and performance audit

## 1.0.0 — Stable

- [ ] Release candidate
- [ ] Complete documentation
- [ ] Supported-browser verification
- [ ] Offline and installability verification
- [ ] Stable release
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
