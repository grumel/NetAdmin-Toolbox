# ADR 0001: Use Native ES Modules

- Status: Accepted
- Date: 2026-07-18

## Context

The project needs modular JavaScript without requiring a compilation or bundling step.

## Decision

Use browser-native ES modules for application, category and tool code.

## Consequences

- Modules have explicit dependencies and isolated scope.
- The application can run from a simple static web server.
- Supported browsers must implement ES modules and dynamic imports.
- Features requiring older browsers are out of scope unless this decision is revisited.