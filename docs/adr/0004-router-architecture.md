<<<<<<< HEAD
# ADR 0004: Use a hash-based modular router

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

Static hosting requires routes to work without server rewrite rules while tools should remain independently loadable.

## Decision

Map hash routes to dynamic module imports in `assets/js/router.js`; each module exports `render()` and may export `initialize(container)`.

## Consequences

Deployment remains static-host friendly. Modules must cleanly separate rendered markup from browser-only initialisation.
=======
# ADR 0004: Hash Router with Dynamic Module Imports

- Status: Accepted
- Date: 2026-07-18

## Context

The static PWA needs client-side navigation that works on simple hosting without server rewrite rules.

## Decision

Use hash-based routes mapped to dynamically imported category and tool modules.

## Consequences

- Static hosting requires no special route configuration.
- Category code loads only when needed.
- The router must provide a safe fallback for unknown routes.
- Asynchronous rendering must reject stale imports when users navigate rapidly.
- Navigation changes should manage focus for keyboard and assistive-technology users.
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
