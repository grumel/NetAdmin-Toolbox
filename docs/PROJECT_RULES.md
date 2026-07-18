# Project Rules

These rules apply to human contributors and coding agents.

1. Use browser-native ES modules.
2. Do not introduce frameworks or runtime dependencies without an approved architecture decision.
3. Keep domain calculations pure and independent of the DOM.
4. Separate rendering, validation, calculation and formatting.
5. Validate public function inputs or document strict preconditions.
6. Avoid duplicated logic and premature generic abstractions.
7. Add tests for new behavior and regression tests for defects.
8. Keep all tools usable offline after first successful load.
9. Preserve keyboard access, visible focus and meaningful screen-reader feedback.
10. Support light and dark themes and responsive layouts.
11. Never interpolate untrusted input into HTML.
12. Do not store sensitive input automatically.
13. Keep commits logically focused and use meaningful commit messages.
14. Do not commit debug output, dead code or unused files.
15. Update relevant documentation when behavior or architecture changes.
16. Do not mark work complete until the Definition of Done is satisfied.
17. Work through P1 backlog items before lower-priority work.
18. Do not push failing tests.
19. Avoid direct changes to unrelated modules.
20. Record significant architectural decisions in `docs/adr/`.