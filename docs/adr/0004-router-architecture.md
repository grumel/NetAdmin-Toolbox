# ADR 0004: Use a hash-based modular router

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

Static hosting requires routes to work without server rewrite rules while tools should remain independently loadable.

## Decision

Map hash routes to dynamic module imports in `assets/js/router.js`; each module exports `render()` and may export `initialize(container)`.

## Consequences

Deployment remains static-host friendly. Modules must cleanly separate rendered markup from browser-only initialisation.
