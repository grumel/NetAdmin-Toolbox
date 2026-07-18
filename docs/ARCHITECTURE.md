# Architecture

NetAdmin-Toolbox is a static, installable single-page application using browser-native ES modules. It has no runtime package dependencies.

## Application shell

- `index.html` provides the accessible shell and global navigation landmarks.
- `assets/js/app.js` coordinates routing, theme state, installation prompts, and connection status.
- `assets/js/router.js` maps hash routes to dynamically imported modules, renders navigation, and calls an optional `initialize(container)` hook.
- `sw.js` caches the application shell for offline use; `manifest.json` defines PWA metadata.

## Module contract

Feature modules live under `modules/<area>/<tool>/`. Every view exports `render()`. Interactive views may export `initialize(container)` and must keep browser-only work there.

The IPv4 Calculator is the reference layout:

- `index.js` — UI markup, events, and clipboard interactions.
- `validation.js` — pure input validation.
- `calculator.js` — pure domain calculations.
- `formatter.js` — presentation strings and copy output.
- `helpers.js` — reusable IPv4 parsing, conversion, masks, and range primitives.
- `style.css` and `*.test.js` — scoped presentation and dependency-free tests.

## Boundaries

Domain code must not access the DOM, local storage, network, or service-worker APIs. UI code must use named imports from domain modules rather than duplicate calculations. When a module is shipped, all of its runtime imports must be considered in the service-worker cache list.

## Decisions

The rationale for key choices is recorded in [adr/0001-use-es-modules.md](adr/0001-use-es-modules.md) through [adr/0005-service-worker-strategy.md](adr/0005-service-worker-strategy.md).
