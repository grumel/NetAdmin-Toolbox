# Contributing

Thank you for helping improve NetAdmin-Toolbox. Contributions should improve administrator workflows while preserving the offline-first, dependency-free architecture.

## Before you start

Read [VISION.md](VISION.md), [ARCHITECTURE.md](ARCHITECTURE.md), [CODING_STANDARD.md](CODING_STANDARD.md), and [PROJECT_RULES.md](PROJECT_RULES.md). Discuss substantial features or architectural changes in an issue before implementation.

## Development workflow

1. Create a focused branch and keep unrelated changes out of it.
2. Follow the module contract in the architecture guide.
3. Add or update tests and documentation with implementation changes.
4. Run `npm test` and `git diff --check`.
5. Open a pull request that explains purpose, testing, accessibility impact, and any offline/cache changes.

## Review expectations

Reviewers assess correctness, maintainability, accessibility, tests, documentation, and alignment with the roadmap. Contributors must not add telemetry, tracking, credentials, or unapproved dependencies.
