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

### test-planner ✅

Analyzes web pages and creates test plans. Navigates to target page, documents elements and ARIA attributes, captures network/console, proposes test cases with simulation guidance. Outputs `test-plan.md` and `page-analysis.md`. Invoke via `/plan-test`.

### test-healer 🚧

Debug and fix failing tests. Analyzes failure messages, identifies root cause (selector changed, timing issue, logic error), applies fixes and re-runs to verify. Use when tests fail and need repair.

### test-verifier 🚧

Verify tests pass and meet quality standards. Runs all tests, checks for `.skip`/`.only`, measures coverage vs baseline, verifies best practices, generates report. Use after completing tests, before marking done. See also [test-verification.md](./test-verification.md).

### page-locator-fixer 🚧

Add ARIA attributes to elements lacking accessibility. Identifies elements that can't be selected with `getByRole`, proposes and applies appropriate labels. Use when test-planner reports ❌ in ARIA column.

---

## 📊 Quick Reference

| Scenario | Use |
|----------|-----|
| Planning tests for a new page | `test-planner` |
| Measuring coverage | `test-coverage-mcp` |
| Inspecting page elements | `@playwright/mcp` |
| Debugging failing tests | `test-healer` |
| Verifying tests are complete | `test-verifier` |
| Fixing missing ARIA | `page-locator-fixer` |
