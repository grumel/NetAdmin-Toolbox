<<<<<<< HEAD
# ADR 0001: Use browser-native ES modules

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

The project is a static, dependency-free PWA with independently evolving administration tools.

## Decision

Use native ES modules and dynamic `import()` for feature modules.

## Consequences

Modules have explicit dependencies, tools load on demand, and no bundler is required. Code must remain compatible with supported modern browsers and service-worker asset lists must include imported modules.
=======
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
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
