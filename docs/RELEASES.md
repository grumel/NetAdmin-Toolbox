# Releases

## Versioning

NetAdmin-Toolbox follows semantic versioning: MAJOR for incompatible changes, MINOR for compatible features, and PATCH for compatible fixes and documentation.

## Release process

1. Confirm scope against [ROADMAP.md](ROADMAP.md) and acceptance criteria in [DEFINITION_OF_DONE.md](DEFINITION_OF_DONE.md).
2. Run the checks in [TESTPLAN.md](TESTPLAN.md), including PWA smoke tests.
3. Review cache version and asset list in `sw.js`; a changed application shell requires a cache-version update.
4. Update [CHANGELOG.md](CHANGELOG.md), create a signed or annotated tag if project policy adopts one, and publish release notes.

## Current state

The PWA foundation, modular router, dashboard, and IPv4 Calculator are implemented. IPv4 hardening remains before considering a stable tool-suite release.
