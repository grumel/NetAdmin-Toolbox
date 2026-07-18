# ADR 0005: Cache the application shell with a service worker

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

The PWA must load core tools without a connection.

## Decision

Precache the known application shell and use cache-first retrieval with navigation fallback to the shell.

## Consequences

Every shipped module dependency must be listed in `APP_SHELL`, and cache versions must change with shell updates. Runtime cache restrictions remain an active hardening item in [../BACKLOG.md](../BACKLOG.md).
