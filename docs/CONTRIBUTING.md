# Contributing

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