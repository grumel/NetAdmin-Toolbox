# Test Plan

## Unit tests

Run the dependency-free test suite:

```bash
npm test
```

Pure network helpers must cover valid input, invalid input, `/0`, `/31`, `/32`, netmask conversion, subnet boundaries, and special-use ranges.

## Manual calculator checks

1. Enter `192.168.1.42` with `/24`; verify network `192.168.1.0` and broadcast `192.168.1.255`.
2. Enter a valid netmask and verify that the prefix synchronizes.
3. Enter malformed address and netmask values; verify precise, accessible errors and disabled copy actions.
4. Verify Example, Clear, per-field copy, and Copy all with keyboard only.
5. Test mobile layout, dark mode, light mode, online/offline state, and installed-PWA mode.

## Release checks

- `git diff --check` passes.
- Unit and browser/end-to-end tests pass.
- Service-worker cache contains every shipped module dependency.
- Accessibility and responsive reviews have no unresolved critical issues.
