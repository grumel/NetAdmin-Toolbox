<<<<<<< HEAD
# Releases

## Versioning

NetAdmin-Toolbox follows semantic versioning: MAJOR for incompatible changes, MINOR for compatible features, and PATCH for compatible fixes and documentation.

## Release process

1. Confirm scope against [ROADMAP.md](ROADMAP.md) and acceptance criteria in [DEFINITION_OF_DONE.md](DEFINITION_OF_DONE.md).
2. Run the checks in [TESTPLAN.md](TESTPLAN.md), including PWA smoke tests.
3. Review cache version and asset list in `sw.js`; a changed application shell requires a cache-version update.
4. Update [CHANGELOG.md](CHANGELOG.md), create a signed or annotated tag if project policy adopts one, and publish release notes.

## Current state

The PWA foundation, modular router, dashboard, and IPv4 Calculator are implemented. IPv4 hardening remains before considering a stable tool-suite release.
=======
# Release Plan

## Versioning

NetAdmin-Toolbox follows Semantic Versioning while pre-1.0 releases may contain intentional structural changes.

## Planned releases

- `0.1.x` — PWA foundation and modular application shell
- `0.2.x` — IPv4 calculator and hardening
- `0.3.x` — IPv6 toolkit
- `0.4.x` — CIDR, VLSM and subnet planning
- `0.5.x` — Routing and Cisco tools
- `0.6.x` — Windows toolkit
- `0.7.x` — Linux toolkit
- `0.8.x` — Security and developer tools
- `0.9.x` — Search, favorites, export, settings and product polish
- `1.0.0` — Stable, documented and production-ready release

## Release process

1. Complete the target milestone and all associated P1 items.
2. Run unit and browser tests.
3. Complete the manual release checks in `TESTPLAN.md`.
4. Update roadmap, backlog and changelog.
5. Verify manifest, service worker, installability and offline operation.
6. Create a version commit and annotated tag.
7. Publish release notes describing additions, changes, fixes and known limitations.

## Release criteria

A release must satisfy `DEFINITION_OF_DONE.md`, contain no known critical defect and preserve privacy, offline operation and accessibility baselines.
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
