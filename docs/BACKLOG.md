# Backlog

Work is ordered by priority. Complete P1 items before starting the next major feature. Items are ordered by value and risk, not by implementation effort. Architectural changes require an ADR; see [adr/](adr/).

## P1 — IPv4 hardening

- [x] Validate all exported IPv4 helper inputs or document strict preconditions
- [x] Track validation state independently for IP address, prefix and netmask
- [x] Associate field-specific errors with the relevant controls
- [x] Stop announcing successful recalculation on every keystroke
- [x] Improve light-theme error contrast
- [x] Detect unspecified and current-network ranges in `0.0.0.0/8`
- [x] Detect carrier-grade NAT `100.64.0.0/10`
- [x] Detect benchmarking range `198.18.0.0/15`
- [x] Document the meaning of reserved and special-purpose classifications
- [x] Add boundary tests for every prefix from `/0` through `/32`
- [x] Restrict service-worker runtime caching to approved static responses

## P2 — Platform stability

- [x] Guard asynchronous route rendering against stale imports
- [ ] Add browser tests for live validation and keyboard operation
- [ ] Test clipboard API and fallback behavior
- [ ] Add a restrictive Content Security Policy compatible with the application
- [ ] Declare the supported Node.js version
- [ ] Verify installation and offline behavior after cache-policy changes

## P3 — Product improvements

- [ ] Add IPv6 calculator foundations without coupling IPv6 semantics to IPv4 helpers
- [ ] Add CIDR, wildcard, VLSM, and route-summarisation tools from reusable pure functions
- [ ] Add global tool search
- [ ] Add favorites and recent tools
- [ ] Add keyboard shortcuts and a command palette
- [ ] Add structured import and export helpers
- [ ] Add localization infrastructure
- [ ] Add end-to-end tests, an accessibility audit, responsive review, and release automation

## Rules

- Select one logically coherent task at a time.
- Add or update tests with every behavior change.
- Update this backlog and the roadmap when work is completed.
- Do not mark an item complete unless it meets [DEFINITION_OF_DONE.md](DEFINITION_OF_DONE.md).
