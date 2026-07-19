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