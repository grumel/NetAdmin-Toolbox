# Contributing

<<<<<<< HEAD
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
=======
## Before starting

Read:

- `VISION.md`
- `ARCHITECTURE.md`
- `PROJECT_RULES.md`
- `CODING_STANDARD.md`
- `DEFINITION_OF_DONE.md`
- `BACKLOG.md`

Select the highest-priority unfinished item unless a maintainer assigns different work.

## Development workflow

1. Inspect the affected module and its tests.
2. Define observable acceptance criteria.
3. Implement one logically coherent change.
4. Add or update tests.
5. Run all available tests.
6. Perform a self-review for correctness, accessibility, security and offline behavior.
7. Update relevant documentation.
8. Commit with a focused, meaningful message.

## Pull requests

A pull request should explain:

- The problem being solved
- The chosen approach
- Files and behavior changed
- Tests performed
- Known limitations or follow-up work

Do not mix unrelated refactoring with feature or defect work.

## New tools

New tools must:

- Follow the module boundaries in `ARCHITECTURE.md`
- Keep domain logic independent of the DOM
- Include automated tests for calculations and validation
- Be keyboard accessible
- Support light and dark themes
- Work offline
- Avoid external runtime dependencies

## Reporting defects

Include the input, expected result, actual result, browser, operating system and reproduction steps. Security-sensitive reports should not include real credentials, private addresses or confidential data.
>>>>>>> dde56c2a9eb22362e4d327c2dace76432dcad430
