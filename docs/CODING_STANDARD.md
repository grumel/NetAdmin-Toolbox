# Coding Standard

## JavaScript

- Use ES modules and strict, explicit imports.
- Prefer `const`; use `let` only for reassignment.
- Keep functions focused and use descriptive names.
- Use pure functions for parsing, validation, calculations and formatting.
- Do not access the DOM from domain modules.
- Return structured validation results rather than throwing for normal user errors.
- Validate exported helper inputs or clearly document their preconditions.
- Use JSDoc for exported functions and non-obvious data structures.
- Avoid global state, implicit coercion and unnecessary mutation.
- Do not use `eval`, `Function`, inline handlers or HTML string interpolation for user values.
- Handle unavailable browser APIs gracefully.

## HTML and rendering

- Use semantic elements and native controls first.
- Every form control requires a visible label.
- Associate error text with the relevant control.
- Use ARIA only where native semantics are insufficient.
- Render user-derived values through `textContent`.
- Preserve a logical heading hierarchy.

## CSS

- Use mobile-first responsive rules.
- Use project design tokens for color, spacing and typography.
- Keep tool styles namespaced to prevent leakage.
- Support light and dark themes.
- Preserve visible focus and sufficient contrast.
- Avoid `!important` unless documented as a compatibility exception.

## Tests

- Keep tests deterministic and independent.
- Test boundaries and classifications, not only representative examples.
- Name tests by observable behavior.
- Add regression tests for fixed defects.
- Do not depend on network access.

## Files and modules

- Keep related tool files together.
- Avoid files that only re-export a single symbol without architectural value.
- Move code to `lib/` only when multiple concrete consumers need it.
- Remove unused imports and obsolete files in the same logical change.

## Commit messages

Use concise imperative messages, preferably Conventional Commit prefixes:

- `feat:` new behavior
- `fix:` defect correction
- `test:` test-only change
- `docs:` documentation
- `refactor:` behavior-preserving restructuring
- `chore:` maintenance