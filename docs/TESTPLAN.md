# Test Plan

<<<<<<< HEAD
## Automated checks

Run the complete dependency-free suite with:

```bash
npm test
git diff --check
```

IPv4 tests cover parsing, prefixes, netmasks, subnet bounds, `/0`, `/31`, `/32`, special-use ranges, validation, and formatting. New pure helpers require equivalent coverage.

## Manual acceptance checks

1. Calculate `192.168.1.42/24` and verify network `192.168.1.0` and broadcast `192.168.1.255`.
2. Enter a contiguous netmask and verify prefix synchronisation; then enter invalid values and verify precise errors and disabled copy actions.
3. Use Example, Clear, individual Copy, and Copy all with keyboard-only navigation.
4. Check narrow screens, light and dark themes, offline navigation, and installed-PWA mode.

## Release testing

Before release, pass automated checks, run supported-browser smoke tests, verify every shipped module is cacheable, and record known limitations in [CHANGELOG.md](CHANGELOG.md).
=======
## Test levels

### Unit tests

Use Node's built-in test runner for pure validation, calculation, classification and formatting functions.

### Browser tests

Cover routing, forms, accessibility state, clipboard behavior, theme behavior, responsive rendering and offline operation.

### Manual release checks

Verify installability, offline startup, keyboard navigation and representative desktop/mobile browsers before a release.

## IPv4 calculator

### Valid inputs

- `0.0.0.0/0`
- `10.0.0.1/8`
- `172.16.10.5/20`
- `192.168.1.1/24`
- `8.8.8.8/32`
- `255.255.255.255/32`
- Prefixes `/0` through `/32`
- Equivalent valid subnet masks

### Invalid inputs

- Missing or incomplete octets
- Octets outside `0..255`
- Leading-zero policy violations
- Prefixes below `0` or above `32`
- Non-contiguous subnet masks
- Non-numeric values
- Conflicting prefix and netmask values

### Calculation assertions

- Network address
- Broadcast address
- First and last host
- Total and usable address counts
- Netmask and wildcard mask
- Integer, hexadecimal and binary formats
- Reverse DNS host name

### Classification assertions

- RFC1918 private ranges
- Link-local `169.254.0.0/16`
- Loopback `127.0.0.0/8`
- Carrier-grade NAT `100.64.0.0/10`
- Benchmarking `198.18.0.0/15`
- Documentation ranges
- Multicast `224.0.0.0/4`
- Reserved `240.0.0.0/4`
- Unspecified and current-network `0.0.0.0/8`
- Limited broadcast `255.255.255.255`

### Accessibility and interaction

- Field-specific `aria-invalid`
- Errors associated with the relevant field
- No repetitive success announcements while typing
- Keyboard access to all actions
- Visible focus
- Copy individual result
- Copy all results
- Clipboard fallback
- Clear and example actions

## Router

- Known routes render the correct module.
- Unknown routes fall back safely.
- Rapid route changes cannot be overwritten by stale imports.
- Focus moves predictably after navigation.

## Service worker and PWA

- Application shell is cached.
- Approved static assets work offline.
- Failed and non-successful responses are not cached.
- Sensitive or unknown runtime GET responses are not cached indiscriminately.
- Cache upgrades remove obsolete versions.
- Manifest and service-worker registration remain valid.

## Release gate

All automated tests must pass. P1 backlog items for the target release must be complete, and manual release checks must be recorded.
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
