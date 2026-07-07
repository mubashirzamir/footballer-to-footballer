# Testing Roadmap — footballer-to-footballer

## Ground rules
- Always work from current `main`. Before implementing any item below:
  - `git checkout main && git reset --hard origin/main && git pull --ff-only`
  - Create a dedicated branch per item or batch related items into 1 branch.
  - Keep PRs to a single commit per logical change group.
  - Delete remote branch after merge is complete.

---

## 1. Test environment setup
**Goal:** Establish the Vitest + Testing Library foundation so new tests can be added consistently.

Standard tooling for TS/React:
- `vitest` (already present)
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

Deliverables:
- Add dev dependencies: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`
- Create `src/test/setup.ts` to extend `expect` with jest-dom matchers and configure any global mocks/stubs.
- Update `vite.config.ts` to set `test.environment = 'jsdom'`, `test.globalSetup = '<rootDir>/src/test/setup.ts'`, and keep `include: ['src/**/*.test.{ts,tsx}']`.
- Add an npm script: `"test:coverage": "vitest run --coverage"`.
- Add a `vitest.config.ts` alternative, or keep inline in `vite.config.ts` for simplicity.

Verification:
- `npm run test` passes for all existing tests after changes.
- `npm run test:coverage` produces a coverage report with no unexpected missing files due to environment issues.

---

## 2. Unit tests for pure logic and utilities
**Goal:** Enforce behavioral correctness for non-UI logic outside React.

Targets:
- `src/utils/db.test.ts` — already exists; extend with more integrity rules if needed.
- `src/utils/constants.ts`
- `src/lib/utils.ts`
- `src/structures/*.ts` — factory/helpers if any.

Best practice:
- One describe per module/function.
- Use `it.each` for data-driven cases.
- No DOM environment needed for pure logic.

Verification:
- Coverage threshold for `src/utils` and `src/structures` is 100% or explicitly documented as exempt.

---

## 3. Custom hook tests
**Goal:** Validate that hooks behave correctly under mocked dependencies.

Best practice:
- Use `renderHook` and `act` from `@testing-library/react`.
- Mock service hooks via `vi.mock()` at module boundary.
- Assert state, refs, derived values, and cleanup.

Deliverables:
- Tests per hook file:
  - `src/hooks/useGame.tsx`
  - `src/hooks/useGameFromLocation.tsx`
  - `src/hooks/useGameInfoFromDb.tsx`
  - `src/hooks/useGameNavigation.tsx`
  - `src/hooks/useGameState.tsx`
  - `src/hooks/useGameTimer.tsx`
  - `src/hooks/useNextGameTimer.tsx`
  - `src/hooks/useSearch.tsx`

Verification:
- Each file has a matching `*.test.tsx`.
- Mocks are local and do not leak across tests.
- `npm run test` passes.

---

## 4. Context/provider tests
**Goal:** Ensure providers initialize correctly and consumers receive expected values.

Best practice:
- Wrap testing component in provider under test.
- Use real or mocked consumer components to assert renders.
- Validate dispatch behavior through mock handlers.

Deliverables:
- Tests for each provider under `src/contexts-providers/**`:
  - `GameInfoContextProvider`
  - `GameStateContextProvider`
  - `GameTimerContextProvider`

Verification:
- `npm run test` passes without needing a router or full app tree.

---

## 5. Service and integration tests
**Goal:** Protect business logic across service boundaries.

Best practice:
- Mock network boundaries at the adapter/service layer.
- Test success, client error, and server failure scenarios.
- Keep these fast, non-flaky, and deterministic.

Deliverables:
- Tests for:
  - `src/services/useServicePlayers.tsx`
  - `src/services/useServiceTeams.tsx`
  - `src/services/useServiceShortestPathPossible.tsx`
  - `src/services/useServicePlayerProfile.tsx`
  - `src/services/mock/**` — if mocks diverge, add a regression test.

Verification:
- No real network calls occur in tests unless explicitly tagged and avoided in CI.
- `npm run test` passes.

---

## 6. React component tests
**Goal:** Cover user-visible UI behavior against regressions.

Best practice:
- Use `render`, `screen`, `waitFor` from `@testing-library/react`.
- Assert by accessible roles, labels, and text where possible.
- Avoid testing implementation details like internal state.

Deliverables (priority order):
1. `src/pages/Game/index.tsx`
2. `src/pages/Home/index.tsx`
3. `src/pages/Game/TurnInfo.tsx`
4. `src/pages/Game/Timer.tsx`
5. `src/pages/Game/Search.tsx`
6. `src/pages/Archive/index.tsx`
7. `src/components/NavBar.tsx`
8. `src/components/PaginatedView.tsx`
9. `src/components/PlayableImage.tsx`
10. Key UI primitives under `src/components/ui/**`

Verification:
- Each coverable component has a matching test file.
- Tests run in CI without browser dependencies.

---

## 7. Coverage workflow and CI enforcement
**Goal:** Make coverage visible and optionally enforce minimums.

Deliverables:
- Add a coverage job in `.github/workflows/ci.yml` or a separate `test-coverage.yml`.
- Upload coverage artifact to GitHub Actions.
- Optional: fail CI below threshold with `vitest --coverage --reporter=json-summary` plus a summary enforcement step.
- Preserve existing `npm run lint` and `npm test` in CI.

Verification:
- CI passes on `main` after coverage workflow is added.
- Thresholds are realistic; anything uncovered should be intentional and documented.

---

## 8. E2E / acceptance tests
**Goal:** Catch cross-route and user-flow regressions that unit tests miss.

Best practice:
- Use Playwright or Cypress with Vite. Playwright is preferred for Vite because runner integration is straightforward.

Deliverables:
- Choose Playwright or Cypress.
- Add a single happy-path flow first:
  1. Load `/`
  2. Start a game
  3. Complete turns
  4. View archive result
- Add to CI as a separate job after build succeeds.

Verification:
- E2E suite runs on PR merge to `main`.
- Maintainers can run locally with one command.

---

## 9. Mocking and data hygiene standards
**Goal:** Prevent flaky tests and accidental network calls.

Rules:
- Never hit real backend endpoints in tests.
- Centralize MSW or manual mocks if network mocks are needed.
- Keep `src/services/mock/**` as the canonical fake implementation.
- Add a lint/CI rule or comment in contributor docs stating the above.

Deliverables:
- Mock utilities under `src/test/mocks/` if reuse is needed.
- Document in `CONTRIBUTING.md` or a dedicated `TESTING.md`.

Verification:
- `git grep 'http://localhost:8000' src/**/*.test.*` returns nothing.
- Mock paths are explicit and discoverable.

---

## Execution order recommendation
1. Setup from item 1.
2. Logic/hooks/services in items 2–5.
3. Components in item 6.
4. CI coverage in item 7.
5. E2E in item 8 last, since it has the highest maintenance cost.

No item above should be started without first rebasing onto latest `main` and using a dedicated branch. Delete remote feature branches after merge.
