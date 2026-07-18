# ADR 0003: No Required External Runtime Dependencies

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

External frameworks and hosted assets can increase supply-chain risk, application size, offline complexity, and maintenance burden. The project values auditability, quick startup, and reliable offline operation.

## Decision

Use browser platform APIs and project-owned code for core functionality. Do not require external JavaScript frameworks, CDNs, remote fonts, or hosted services at runtime.

Development-only tools must also be justified by clear value. Small, dependency-free test harnesses are preferred when browser platform APIs are sufficient.

## Consequences

- The application remains lightweight and auditable.
- Contributors may need to implement small focused utilities directly.
- Any proposed runtime dependency requires documented justification, security review, and a new architecture decision.
- Browser behavior may be tested with project-owned HTML and JavaScript harnesses when a full external test framework is unnecessary.
