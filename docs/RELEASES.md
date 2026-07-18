# Releases

## Versioning

Use semantic versioning:

- **MAJOR** for incompatible user-facing or data-format changes.
- **MINOR** for backwards-compatible tools and features.
- **PATCH** for backwards-compatible fixes, documentation, and polish.

## Release checklist

1. Complete roadmap scope and update the changelog or release notes.
2. Run `npm test`, static checks, and the release checks in `TESTPLAN.md`.
3. Review service-worker cache version and shipped asset list.
4. Verify the production build in supported browsers and installed-PWA mode.
5. Tag the approved commit and publish release notes.

## Unreleased

- IPv4 Calculator module architecture and initial test suite.
