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