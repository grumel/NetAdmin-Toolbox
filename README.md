# NetAdmin Toolbox

> A browser-based, offline-first toolbox for network and system administrators.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![PWA](https://img.shields.io/badge/PWA-installable-5a0)
![Offline Ready](https://img.shields.io/badge/offline-ready-2ea44f)
![Browser Based](https://img.shields.io/badge/platform-browser-lightgrey)

NetAdmin Toolbox brings practical network and administration utilities into one privacy-friendly Progressive Web App. It runs entirely in the browser, requires no server component, supports German and English, and remains available offline after the application shell has been cached.

## Screenshot

![Application Screenshot](docs/images/netadmin-toolbox.png)

## Features

### Network

- IPv4 Calculator
- IPv6 Calculator
- CIDR and wildcard conversion
- VLSM planning
- Route summarization
- Shared IPv4, IPv6, CIDR, hostname, and FQDN validation

### DNS

- DNS Record Reference
- DNS-over-HTTPS Query Helper

### Utilities

- MAC Address Converter
- Standard Port Search

### Application

- Installable PWA with offline cache
- Responsive light and dark interface
- Modular hash router and dashboard
- Favorites and recently used tools
- Settings import and export
- German and English localization
- Print-optimized result pages
- Shared CSV export for network-tool results

## Installation

NetAdmin Toolbox is a static web application. No production server or dependency installation is required.

    git clone https://github.com/grumel/NetAdmin-Toolbox.git
    cd NetAdmin-Toolbox

Serve the repository through a local HTTP server:

    python3 -m http.server 8000

Open [http://localhost:8000](http://localhost:8000) in a modern browser. A local HTTP server is recommended because service workers are not enabled for ordinary file pages.

Run the automated tests with Node.js 20 or newer:

    npm test

## Offline Support

The service worker precaches the application shell and known tool modules, then caches approved same-origin static assets after successful requests. Navigations use a network-first strategy with an offline shell fallback. Cache versions are updated when the application shell changes.

## CSV Export

Network tools provide a consistent **Export CSV** action. Files use UTF-8 with a BOM, semicolon delimiters, CRLF line endings, and RFC 4180-compatible quoting for reliable use in Excel and LibreOffice.

## Print Support

Calculation and result views include print-oriented styling. Unnecessary controls are hidden for printing, while result tables and summaries remain readable on paper or as PDF.

## Localization

The interface is available in English and German. Language selection is stored locally and tool views use the shared localization layer so labels and results update consistently.

## Technology Stack

- HTML5
- CSS3
- JavaScript with native ES modules
- Service Worker API
- Web App Manifest
- Node.js built-in test runner

No external runtime libraries or frameworks are required.

## Project Structure

    assets/
      css/                 Global styles
      js/                  Application shell, router, state, and localization
    modules/
      dashboard/           Dashboard
      network/             Network tools and shared validation
      shared/              Cross-tool utilities such as CSV export
    tests/                 Automated unit and platform tests
    docs/                  Architecture, roadmap, testing, and project guidance
    sw.js                  Service worker and application-shell cache
    index.html             PWA entry point
    manifest.json          Web App Manifest

Tool modules keep UI, validation, calculations, formatting, and reusable helpers separate. This keeps calculations testable and allows future tools to reuse the same network primitives.

## Roadmap

Planned work is tracked in [docs/ROADMAP.md](docs/ROADMAP.md) and [docs/BACKLOG.md](docs/BACKLOG.md). The next planned milestones are:

- IPv4 hardening, including expanded RFC range coverage, accessibility refinement, browser tests, and cache-policy review
- Additional Cisco administration tools such as ACL, VLAN, interface, and routing helpers
- Windows and Linux administration utilities
- Security and developer tools
- Accessibility, performance, and supported-browser verification for the 1.0 release

## License

NetAdmin Toolbox is released under the [MIT License](LICENSE).

## Author

Holger John
