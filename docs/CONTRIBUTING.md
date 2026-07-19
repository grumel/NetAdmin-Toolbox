# Contributing

## Prerequisites

- Git
- Python 3 for a local HTTP server
- Node.js 20 or newer for tests
- A current browser for PWA and responsive checks

Clone the repository and create a feature branch:

    git clone https://github.com/grumel/NetAdmin-Toolbox.git
    cd NetAdmin-Toolbox
    git switch -c feature/short-description

Start local development on port 8001:

    python3 -m http.server 8001

On Windows, use py -m http.server 8001 or python -m http.server 8001.

Run tests with:

    npm test

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

New visible text must be added to both English and German localization messages. New or changed tools must be checked in light and dark themes, at responsive widths, and through the service-worker cache when applicable.

## Pull requests

A pull request should explain:

- The problem being solved
- The chosen approach
- Files and behavior changed
- Tests performed
- Known limitations or follow-up work

Do not mix unrelated refactoring with feature or defect work.

Do not commit directly to main or force-push shared branches. Inspect merge and rebase conflicts before choosing a resolution, preserving both sides where both contain valid project changes.

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

Documentation changes should update the relevant README, roadmap, backlog, changelog, architecture, or test-plan content when behavior or project workflow changes.
