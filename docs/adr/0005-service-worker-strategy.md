<<<<<<< HEAD
# ADR 0005: Cache the application shell with a service worker

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

The PWA must load core tools without a connection.

## Decision

Precache the known application shell and use cache-first retrieval with navigation fallback to the shell.

## Consequences

Every shipped module dependency must be listed in `APP_SHELL`, and cache versions must change with shell updates. Runtime cache restrictions remain an active hardening item in [../BACKLOG.md](../BACKLOG.md).
=======
# ADR 0005: Controlled Static-Asset Caching

- Status: Accepted
- Date: 2026-07-18

## Context

The PWA requires offline operation, but indiscriminate runtime caching may retain sensitive or unintended responses and consume unnecessary storage.

## Decision

Precache the versioned application shell and approved static assets. Runtime caching, when used, must be restricted to known safe same-origin asset types and successful responses.

## Consequences

- Unknown GET responses are not cached automatically.
- Failed, opaque or non-successful responses are not stored unless explicitly justified.
- Cache names are versioned and obsolete caches are removed during activation.
- Service-worker changes require offline, upgrade and storage-policy tests.
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
