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