# Definition of Done

A task is complete only when all applicable items are satisfied.

## Functionality

- [ ] Acceptance criteria are implemented.
- [ ] Known edge cases are handled or explicitly documented.
- [ ] Error states are clear and recoverable.
- [ ] Existing behavior remains intact.

## Code quality

- [ ] Responsibilities are correctly separated.
- [ ] Domain calculations are pure where practical.
- [ ] Public APIs have clear contracts.
- [ ] No avoidable duplication, dead code or debug output remains.
- [ ] Names communicate intent.

## Testing

- [ ] Relevant unit tests pass.
- [ ] New behavior has automated coverage.
- [ ] Defect fixes include a regression test where practical.
- [ ] Critical browser interactions have been tested.
- [ ] Manual checks are documented when automation is not yet available.

## Accessibility and UX

- [ ] The feature is keyboard operable.
- [ ] Focus order and focus visibility are correct.
- [ ] Labels, errors and status announcements are meaningful.
- [ ] Light and dark themes have sufficient contrast.
- [ ] Desktop and mobile layouts are usable.

## Offline and security

- [ ] The feature works offline after caching.
- [ ] User input is rendered safely.
- [ ] No unnecessary data is stored or transmitted.
- [ ] Service-worker changes use an intentional cache policy.

## Documentation and Git

- [ ] Relevant architecture, roadmap, backlog and test documentation is updated.
- [ ] Significant decisions have an ADR.
- [ ] The change is represented by a focused commit with a meaningful message.
- [ ] The working tree contains no unrelated changes.