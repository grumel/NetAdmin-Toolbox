# ADR 0005: Controlled Static-Asset Caching

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

The PWA must operate offline without indiscriminately retaining responses that could be stale, sensitive, or unrelated to the application shell.

## Decision

Precache the versioned application shell and approved static assets. Navigations use network-first retrieval with an offline shell fallback. Runtime caching is restricted to successful, same-origin static asset responses.

## Consequences

- Every shipped module dependency must be listed in \`APP_SHELL\`, and cache versions must change with shell updates.
- Unknown, failed, opaque, or non-successful GET responses are not cached automatically.
- Obsolete caches are removed during activation.
- Service-worker changes require offline, upgrade, and storage-policy tests.
