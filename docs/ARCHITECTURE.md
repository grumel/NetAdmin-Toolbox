# Architecture

## Overview

NetAdmin-Toolbox is a client-side, offline-first Progressive Web App built with standards-based HTML, CSS and JavaScript ES modules. It does not require a backend or build step for normal operation.

## Layers

### Application shell

The root HTML document, global styles and `assets/js/app.js` provide navigation, theme handling, installation behavior, connection status and service-worker registration.

### Router

`assets/js/router.js` maps hash routes to dynamically imported category modules. Route modules render into the main content container. Route rendering must be protected against stale asynchronous imports.

### Category modules

Top-level folders under `modules/` represent product categories such as Network, Cisco, Windows, Linux, Security and Developer. Category modules list tools and provide entry points to tool-specific modules.

### Tool modules

A complex tool should separate responsibilities:

- `index.js`: rendering, DOM events and interaction
- `validation.js`: parsing and structured validation results
- `calculator.js`: pure domain calculations
- `formatter.js`: display and export formatting
- `helpers.js`: reusable low-level domain functions
- `style.css`: tool-scoped presentation
- `*.test.js`: automated unit tests

UI code must not contain domain calculations. Calculation modules must not depend on the DOM.

## Shared code

Reusable code should move to `lib/` only after at least two real consumers demonstrate a stable shared abstraction. Premature generic helpers should be avoided.

Suggested future areas:

- `lib/network/`
- `lib/ui/`
- `lib/export/`
- `lib/utils/`

## State and persistence

User preferences are stored through the namespaced storage adapter. Tools should remain functional when storage is unavailable. Sensitive input must not be persisted unless the user explicitly requests it.

## Styling

Global styles define tokens and reusable primitives. Tool-specific styles remain near the tool module and use namespaced class names. Layout is mobile first and must support light and dark themes.

## Offline behavior

The service worker caches the application shell and approved static assets. Runtime caching must not indiscriminately store all same-origin GET responses. Cache versions must change when cached resources change.

## Security

- Render user-controlled values with `textContent`.
- Avoid inline event handlers and dynamic code execution.
- Do not introduce remote scripts or fonts.
- Maintain a restrictive Content Security Policy.
- Treat clipboard and file operations as explicit user actions.

## Testing

Pure domain functions require unit tests. Critical user flows require browser-level tests. Every defect fix should add a regression test where practical.

## Architecture changes

Significant decisions must be recorded under `docs/adr/`. Update this document whenever module boundaries, routing, persistence or offline strategy changes.