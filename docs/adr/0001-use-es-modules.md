# ADR 0001: Use browser-native ES modules

- **Status:** Accepted
- **Date:** 2026-07-18

## Context

The project is a static, dependency-free PWA with independently evolving administration tools.

## Decision

Use native ES modules and dynamic `import()` for feature modules.

## Consequences

Modules have explicit dependencies, tools load on demand, and no bundler is required. Code must remain compatible with supported modern browsers and service-worker asset lists must include imported modules.
