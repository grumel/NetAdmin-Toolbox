# Coding Standard

## JavaScript

- Use modern browser ES modules; introduce dependencies only through an approved ADR.
- Prefer small named functions and immutable data. Public helpers validate inputs or document strict preconditions.
- Keep parsing, validation, calculation, and formatting pure. Restrict DOM, clipboard, storage, and navigation APIs to module entry points.
- Never interpolate untrusted input into HTML. Use `textContent` for dynamic values.

## UI and accessibility

- Use semantic elements, visible labels, keyboard-operable controls, and clear focus states.
- Associate errors with the field that caused them; reserve live regions for actionable changes and errors.
- Design mobile-first and verify both project themes.

## Tests and quality

- Add unit tests for every pure public function, boundary value, and invalid input.
- Run `npm test` and `git diff --check` before requesting review.
- Add browser tests when a change introduces interactive behaviour.

## Git and documentation

- Keep commits focused, use conventional commit messages, and do not include credentials or unrelated changes.
- Update relevant user, architecture, test, and release documentation with the same change.
