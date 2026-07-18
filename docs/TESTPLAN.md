# Test Plan

## Automated checks

Run the dependency-free Node.js suite with:

```bash
npm test
git diff --check
```

The IPv4 unit tests cover parsing, prefixes, netmasks, subnet boundaries, `/0`, `/31`, `/32`, special-purpose ranges, validation, formatting, and exported-helper input guards. Router tests cover stale asynchronous imports.

## Browser tests

Serve the repository root over HTTP:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/tests/browser/ipv4.html
```

The page runs the IPv4 module in a real browser DOM and reports each result. A successful run ends with `All browser tests passed.` and sets `data-test-status="passed"` on the document element.

Current browser coverage includes:

- initial calculation rendering;
- field-specific live validation and associated error text;
- clearing errors after corrected input;
- prefix-to-netmask and netmask-to-prefix synchronization;
- native focusability of inputs and action buttons;
- focus behavior after Example and Clear;
- clipboard success and status announcement.

Run this suite in each supported browser before release. Clipboard fallback and offline/installability behavior remain separate P2 work items.

## IPv4 calculator acceptance checks

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
- Prefixes below `0` or above `32`
- Non-contiguous subnet masks
- Non-numeric values

### Calculation assertions

- Network and broadcast address
- First and last host
- Total and usable address counts
- Netmask and wildcard mask
- Integer, hexadecimal, and binary formats
- Reverse DNS host name

### Classification assertions

- RFC1918 private ranges
- Link-local `169.254.0.0/16`
- Loopback `127.0.0.0/8`
- Carrier-grade NAT `100.64.0.0/10`
- Benchmarking `198.18.0.0/15`
- Documentation ranges
- Multicast `224.0.0.0/4`
- Future-reserved `240.0.0.0/4`
- Current-network `0.0.0.0/8`
- Limited broadcast `255.255.255.255`

## Router

- Known routes render the correct module.
- Unknown routes fall back safely.
- Rapid route changes cannot be overwritten by stale imports.
- Focus moves predictably after navigation.

## Service worker and PWA

- Application shell is cached.
- Approved static assets work offline.
- Failed and non-successful responses are not cached.
- Unknown runtime GET responses are not cached indiscriminately.
- Cache upgrades remove obsolete versions.
- Manifest and service-worker registration remain valid.

## Release gate

All automated tests must pass. Browser tests must pass in supported browsers. P1 backlog items for the target release must be complete, and manual release checks must be recorded.
