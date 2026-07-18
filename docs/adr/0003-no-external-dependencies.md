<<<<<<< HEAD
# ADR 0003: Keep runtime dependencies at zero

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

The project values auditability, quick startup, offline reliability, and a low maintenance burden.

## Decision

Use platform APIs and project modules instead of external runtime libraries.

## Consequences

Contributors must justify any exception with an ADR. Small, well-tested helpers are preferred over framework adoption.
=======
# ADR 0003: No Required External Runtime Dependencies

- Status: Accepted
- Date: 2026-07-18

## Context

External frameworks and hosted assets can increase supply-chain risk, application size and offline complexity.

## Decision

Use browser platform APIs and project-owned code for core functionality. Do not require external JavaScript frameworks, CDNs, remote fonts or hosted services at runtime.

## Consequences

- The application remains lightweight and auditable.
- Contributors may need to implement small focused utilities directly.
- Any proposed dependency requires documented justification, security review and a new architecture decision.
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
