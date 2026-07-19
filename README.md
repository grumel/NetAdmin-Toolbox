# NetAdmin Toolbox

> A modern, offline-first Progressive Web App for network and system administrators.

Current version: **0.5.0**

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

## Project status

Version 0.5.0 establishes the offline-capable network toolbox foundation. Development continues toward version 0.6.0 with additional diagnostic references and browser-compatible network utilities.

See [ROADMAP.md](ROADMAP.md) for completed milestones, current work and planned releases. Release details are recorded in [CHANGELOG.md](CHANGELOG.md).

## Browser limitations

A browser cannot send raw ICMP echo requests or perform unrestricted TCP port scans. Tools that require direct network access therefore need either browser-compatible techniques or an optional local companion service. The core application remains fully client-side and offline-capable.

## License

MIT License

## Author

Holger John
