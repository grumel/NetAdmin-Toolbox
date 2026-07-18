# Architecture

NetAdmin-Toolbox is a dependency-free, installable single-page application built with browser ES modules.

## Application shell

- `index.html` provides the accessible application shell.
- `assets/js/app.js` coordinates route changes, theme state, connectivity status, and PWA installation.
- `assets/js/router.js` owns route registration, navigation rendering, dynamic module imports, and optional module initialization.
- `sw.js` caches the application shell for offline use.

## Modules

Each tool lives under `modules/<area>/<tool>/` and exports a `render()` function. Interactive modules may also export `initialize(container)`; the router invokes it after rendering.

The IPv4 Calculator is the reference module layout:

- `index.js`: UI, DOM events, and browser-only behaviour
- `validation.js`: pure input validation
- `calculator.js`: pure domain calculations
- `formatter.js`: presentation formatting and copy output
- `helpers.js`: reusable protocol primitives
- `style.css`: module-scoped styles
- `*.test.js`: dependency-free Node unit tests

### IPv4 special-use policy

The IPv4 helper registry classifies RFC1918 private space, RFC3927 link-local addresses, loopback, multicast, RFC5737 documentation ranges, and non-public-use reserved ranges. The latter currently includes `0.0.0.0/8`, `100.64.0.0/10`, `198.18.0.0/15`, `240.0.0.0/4`, and `255.255.255.255/32`; this policy is intentionally centralized for future IPv4 tools.

## Design rules

- Keep domain calculations pure and independent of the DOM.
- Use dynamic imports to keep feature code modular.
- Store shared browser preferences through `assets/js/storage.js`.
- Cache every runtime module dependency explicitly when updating the service worker.
