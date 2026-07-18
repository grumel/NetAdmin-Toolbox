# Test Plan

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
