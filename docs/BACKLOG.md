# Backlog

Work is ordered by priority. Complete P1 items before starting the next major feature.

## P1 — IPv4 hardening

- [x] Validate all exported IPv4 helper inputs and document strict return contracts
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
- [x] Add browser tests for live validation and keyboard operation
- [x] Test clipboard API and fallback behavior
- [x] Add a restrictive Content Security Policy compatible with the application
- [x] Declare the supported Node.js version
- [x] Verify installation and offline behavior after cache-policy changes

## P3 — Product improvements

- [x] Add global tool search
- [x] Add favorites and recent tools
- [x] Add keyboard shortcuts and a command palette
- [x] Add structured export helpers
- [x] Add localization infrastructure

## Rules

- Select one logically coherent task at a time.
- Add or update tests with every behavior change.
- Update this backlog and the roadmap when work is completed.
- Do not mark an item complete unless it meets [DEFINITION_OF_DONE.md](DEFINITION_OF_DONE.md).
