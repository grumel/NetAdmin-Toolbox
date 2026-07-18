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
