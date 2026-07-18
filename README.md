# NetAdmin Toolbox

> A modern offline-first Progressive Web App for network and system administrators.

## Overview

NetAdmin Toolbox combines everyday administration utilities into a single, installable web application.

### Goals

- Offline First
- Progressive Web App (PWA)
- Fast and lightweight
- Modular architecture
- No tracking
- Open Source

## Planned Categories

- 🌐 Network
- 🔷 Cisco
- 🪟 Windows
- 🐧 Linux
- 🔐 Security
- 💻 Developer

## Technology

- HTML5
- CSS3
- JavaScript (ES Modules)
- Service Worker
- Web App Manifest

## Development

The supported development and test runtime is Node.js 20 or newer, up to but not including Node.js 25. The `.nvmrc` file selects Node.js 20 for local development.

With nvm:

```bash
nvm install
nvm use
npm test
```

The application itself has no required runtime dependencies. Serve the repository through a local HTTP server for browser and PWA testing:

```bash
python3 -m http.server 8000
```

## Roadmap

### v0.1
- Foundation
- Documentation
- Application Shell

### v0.2
- Dashboard
- Search
- Navigation

## License

MIT License

## Author

Holger John
