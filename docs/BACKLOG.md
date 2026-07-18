# Backlog

<<<<<<< HEAD
## Highest priority

1. Complete IPv4 Calculator hardening: precise validation states, accessible error messaging, browser tests, and user-facing guidance.
2. Restrict service-worker runtime caching to intended successful public responses.
3. Define supported browser versions and add a Content Security Policy appropriate for a static PWA.

## Network suite

- IPv6 calculator foundations that do not couple IPv6 semantics to IPv4 helpers.
- CIDR, wildcard, VLSM, and route-summarisation tools built from reusable pure functions.

## Cross-cutting work

- Search, favourites, recently used tools, keyboard shortcuts, import/export, and settings.
- End-to-end tests, accessibility audit, responsive review, and release automation.

Items are ordered by value and risk, not by implementation effort. Architectural changes require an ADR; see [adr/](adr/).
=======
Work is ordered by priority. Complete P1 items before starting the next major feature.

## P1 — IPv4 hardening

- [ ] Validate all exported IPv4 helper inputs or document strict preconditions
- [ ] Track validation state independently for IP address, prefix and netmask
- [ ] Associate field-specific errors with the relevant controls
- [ ] Stop announcing successful recalculation on every keystroke
- [ ] Improve light-theme error contrast
- [ ] Detect unspecified and current-network ranges in `0.0.0.0/8`
- [ ] Detect carrier-grade NAT `100.64.0.0/10`
- [ ] Detect benchmarking range `198.18.0.0/15`
- [ ] Document the meaning of reserved and special-purpose classifications
- [ ] Add boundary tests for every prefix from `/0` through `/32`
- [ ] Restrict service-worker runtime caching to approved static responses

## P2 — Platform stability

- [ ] Guard asynchronous route rendering against stale imports
- [ ] Add browser tests for live validation and keyboard operation
- [ ] Test clipboard API and fallback behavior
- [ ] Add a restrictive Content Security Policy compatible with the application
- [ ] Declare the supported Node.js version
- [ ] Verify installation and offline behavior after cache-policy changes

## P3 — Product improvements

- [ ] Add global tool search
- [ ] Add favorites and recent tools
- [ ] Add keyboard shortcuts and a command palette
- [ ] Add structured export helpers
- [ ] Add localization infrastructure

## Rules

- Select one logically coherent task at a time.
- Add or update tests with every behavior change.
- Update this backlog and the roadmap when work is completed.
- Do not mark an item complete unless it meets [DEFINITION_OF_DONE.md](DEFINITION_OF_DONE.md).
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
