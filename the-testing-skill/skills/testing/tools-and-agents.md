# 🔧 Test Tools & Agents

MCP tools and specialized agents for testing workflows.

---

## 🛠️ MCP Tools

### @playwright/mcp

Browser automation for page inspection and interaction. Navigate pages, click elements, capture console/network, take screenshots and accessibility snapshots. Use for page analysis, test planning, debugging UI issues.

### test-coverage-mcp

Measure and track code coverage. Get project/file coverage summaries, record baselines, and compare diffs. Use before writing tests (establish baseline) and after (verify improvement).

---

## 🤖 Agents

### testskill.planner ✅

Creates test context folder and test plan. Sets up working folder, measures coverage baseline, proposes test cases with simulation guidance. Can run early (even before page exists). Outputs `test-plan.md`. Invoke via `/testskill.plan`.

### testskill.page-analyzer ✅

Analyzes web pages for testing. Navigates to target page, documents interactive elements and ARIA attributes, captures network/console, takes screenshots and accessibility snapshots. **MANDATORY before writing tests** - call when page skeleton exists. Outputs `page-analysis.md`.

### testskill.healer 🚧

Debug and fix failing tests. Analyzes failure messages, identifies root cause (selector changed, timing issue, logic error), applies fixes and re-runs to verify. Use when tests fail and need repair.

### testskill.verifier 🚧

Verify tests pass and meet quality standards. Runs all tests, checks for `.skip`/`.only`, measures coverage vs baseline, verifies best practices, generates report. Use after completing tests, before marking done. See also [test-verification.md](./test-verification.md).

### testskill.locator-fixer 🚧

Add ARIA attributes to elements lacking accessibility. Identifies elements that can't be selected with `getByRole`, proposes and applies appropriate labels. Use when testskill.planner reports ❌ in ARIA column.

---

## 📊 Quick Reference

| Scenario                                         | Use                       |
| ------------------------------------------------ | ------------------------- |
| Starting test planning (early, even before page) | `testskill.planner`       |
| Analyzing page elements before writing tests     | `testskill.page-analyzer` |
| Measuring coverage                               | `test-coverage-mcp`       |
| Inspecting page elements manually                | `@playwright/mcp`         |
| Debugging failing tests                          | `testskill.healer`        |
| Verifying tests are complete                     | `testskill.verifier`      |
| Fixing missing ARIA                              | `testskill.locator-fixer` |
