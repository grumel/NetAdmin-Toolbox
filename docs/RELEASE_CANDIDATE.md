# Release candidate checklist

The 1.0 release candidate is ready only when the repository is clean, the version in `package.json` and the application metadata agree, `npm test` passes, supported-browser checks are recorded, and offline installation has been verified. Review README, CHANGELOG and ROADMAP, inspect the production build through an HTTP origin, and confirm there are no debug statements or untracked files.

Record the candidate commit and verification date in the release notes. Any failed item blocks tagging the stable release.
