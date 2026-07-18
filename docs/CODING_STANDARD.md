# Coding Standard

## JavaScript

- Use browser-native ES modules and no runtime dependencies unless approved.
- Prefer small, named functions with one responsibility.
- Keep calculations, parsing, validation, and formatting pure; keep DOM access in module entry points.
- Validate public helper inputs or document their preconditions.
- Do not interpolate untrusted input into HTML; use `textContent` for dynamic text.

## UI and accessibility

- Use semantic HTML, visible labels, keyboard-operable controls, and focus-visible states.
- Associate errors with the relevant field and avoid unnecessary live-region announcements.
- Support narrow screens first and both light and dark themes.

## Testing

- Add unit tests for all pure functions, including boundary values and invalid inputs.
- Run `npm test` and `git diff --check` before handoff.
- Add browser tests for interactive workflows when a tool has DOM behaviour.

## Git

- Keep commits focused and use conventional commit messages.
- Do not commit generated files, credentials, or unrelated worktree changes.
