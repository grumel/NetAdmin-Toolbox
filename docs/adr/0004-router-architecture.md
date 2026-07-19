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