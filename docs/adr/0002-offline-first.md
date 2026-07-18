# ADR 0002: Adopt an offline-first product model

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

Administrators often need utilities while disconnected, on restricted networks, or handling sensitive data.

## Decision

Design core tools to execute locally and make the application shell installable and usable offline.

## Consequences

Features must avoid mandatory remote services. Offline behaviour and cache changes are release concerns; see [../TESTPLAN.md](../TESTPLAN.md).
