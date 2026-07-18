# Project Rules

<<<<<<< HEAD
1. Preserve offline-first behaviour and user privacy; do not add tracking or telemetry.
2. Keep runtime dependencies at zero unless an ADR documents and approves an exception.
3. Prefer deterministic, locally executed tools; never send user-entered administration data to third parties.
4. Maintain pure domain functions and modular boundaries.
5. Treat accessibility, security, documentation, and tests as delivery requirements, not optional polish.
6. Do not force-push shared branches, commit secrets, or mix unrelated changes in a pull request.
7. Record material architectural decisions under [adr/](adr/).
=======
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
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
