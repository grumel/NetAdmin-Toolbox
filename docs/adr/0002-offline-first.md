<<<<<<< HEAD
# ADR 0002: Adopt an offline-first product model

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

Administrators often need utilities while disconnected, on restricted networks, or handling sensitive data.

## Decision

Design core tools to execute locally and make the application shell installable and usable offline.

## Consequences

Features must avoid mandatory remote services. Offline behaviour and cache changes are release concerns; see [../TESTPLAN.md](../TESTPLAN.md).
=======
# ADR 0002: Offline-First Operation

- Status: Accepted
- Date: 2026-07-18

## Context

Administrators may need tools in restricted, isolated or unreliable network environments.

## Decision

Design all core tools to work locally in the browser after the application shell and assets have been cached.

## Consequences

- Core calculations must not depend on remote APIs.
- Service-worker caching is part of release testing.
- Remote-only features require a clearly optional design and must fail safely.
- User data should remain local by default.
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
