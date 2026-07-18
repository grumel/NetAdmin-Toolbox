# ADR 0003: Keep runtime dependencies at zero

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

The project values auditability, quick startup, offline reliability, and a low maintenance burden.

## Decision

Use platform APIs and project modules instead of external runtime libraries.

## Consequences

Contributors must justify any exception with an ADR. Small, well-tested helpers are preferred over framework adoption.
