# NetAdmin Toolbox

> A modern, offline-first Progressive Web App for network and system administrators.

Current version: **0.6.0**

## Overview

NetAdmin Toolbox combines frequently used administration utilities in a single installable web application. It runs in the browser, stores settings locally, supports German and English, and remains usable offline after the initial load.

## Available tools

### Network

- IPv4 calculator for networks, broadcast addresses, host ranges, masks, CIDR and address metadata
- IPv6 calculator for expansion, compression, classification and prefix calculations
- Subnet planner with CIDR/wildcard conversion, VLSM planning and route summarization
- MAC address converter with automatic conversion and address classification
- Port search for common TCP and UDP services
- DNS record reference for common DNS record types and their intended use
- Shared network validation for IPv4, IPv6, CIDR, hostnames, and FQDNs
- CSV export for network calculator and reference results, compatible with Windows Excel

### Network result exports

The network tools can export their current results as UTF-8 CSV files with a BOM, semicolon delimiters, CRLF line endings, and RFC4180-compatible quoting. This format opens reliably in Microsoft Excel on Windows as well as LibreOffice and other spreadsheet applications.

| Tool | Exported data |
| --- | --- |
| IPv4 Calculator | Address, CIDR, netmask, wildcard, subnet boundaries, and host count |
| IPv6 Calculator | Address, prefix, network, first/last address, and address count |
| Subnet Planner | CIDR details, VLSM allocations, and route summaries |
| Port Search | Port, protocol, service, and description |
| DNS Record Reference | Name, type, TTL field, and record example |

## Application features

- Installable Progressive Web App
- Offline application shell and cached tool modules
- Responsive dashboard
- Search and command palette
- Favorites and recently used tools
- Light and dark appearance
- German and English interface
- Local settings import and export
- No tracking and no required backend

## Technology

- HTML5
- CSS3
- JavaScript with ES modules
- Service Worker
- Web App Manifest
- Node.js test runner

## Architecture

The application is a static single-page PWA. The hash-based router dynamically loads modules from `modules/`, while the service worker caches the application shell for offline use.

Network tools separate user interface code from pure calculations and reusable helpers. Shared modules currently provide:

- IPv4, IPv6, CIDR, hostname, and FQDN validation in `modules/network/shared/validation.js`
- CSV generation and browser downloads in `modules/shared/csv-export.js`

This structure keeps calculation logic testable without a browser and allows future tools to reuse the same validation and export behaviour.

## Development

The supported development and test runtime is Node.js 20 or newer, up to but not including Node.js 25. The `.nvmrc` file selects Node.js 20 for local development.

```bash
nvm install
nvm use
npm test
```

The application has no required runtime dependencies. Serve the repository through a local HTTP server for browser and PWA testing:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

### Test coverage

The test suite covers network calculations, shared validation, CSV escaping and downloads, PWA configuration, localization, routing, security headers, and product discovery.

```bash
npm test
git diff --check
```

Browser-focused IPv4 interaction checks are available under `tests/browser/` and can be run from a locally served project when validating UI changes.

## Documentation

- [Roadmap](docs/ROADMAP.md) — completed milestones and planned work
- [Backlog](docs/BACKLOG.md) — prioritised engineering work
- [Architecture](docs/ARCHITECTURE.md) — application shell and module contracts
- [Coding standard](docs/CODING_STANDARD.md) — implementation and accessibility rules
- [Test plan](docs/TESTPLAN.md) — automated, manual, and release checks
- [Contributing](docs/CONTRIBUTING.md) — contribution workflow and review expectations
- [Architecture decisions](docs/adr/) — recorded technical decisions

## Project status

Version 0.6.0 centralizes network input validation and CSV export for current and future tools while preserving the offline-capable network toolbox foundation.

See [ROADMAP.md](docs/ROADMAP.md) for completed milestones, current work and planned releases. Release details are recorded in [CHANGELOG.md](docs/CHANGELOG.md).

## Browser limitations

A browser cannot send raw ICMP echo requests or perform unrestricted TCP port scans. Tools that require direct network access therefore need either browser-compatible techniques or an optional local companion service. The core application remains fully client-side and offline-capable.

## License

MIT License

## Author

Holger John
