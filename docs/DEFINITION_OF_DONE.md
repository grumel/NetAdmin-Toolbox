# Definition of Done

A change is done when it:

- Meets agreed acceptance criteria and respects [PROJECT_RULES.md](PROJECT_RULES.md).
- Keeps domain logic pure and follows the module boundaries in [ARCHITECTURE.md](ARCHITECTURE.md).
- Includes unit tests for changed pure logic and browser tests where interaction changes.
- Passes `npm test` and `git diff --check`.
- Supports keyboard use, meaningful validation, responsive layout, and both themes.
- Updates user-facing, architecture, test, and release documentation as applicable.
- Updates the service-worker asset list and cache version when shipped runtime assets change.
- Receives review with no unresolved correctness, security, or accessibility concerns.
