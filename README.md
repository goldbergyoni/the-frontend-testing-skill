

# The Frontend Testing Skill

**AI-native test writing.** Not prompts. Not tips. A complete skill that writes production-grade tests from first principles.

Your AI coding assistant finally knows how to test. This skill transforms Claude Code, Cursor, Windsurf, or any AI editor into a senior testing engineer with 660+ battle-tested practices baked in.

<img src="./skills/testing/the-testing-skill.png" alt="The Testing Skill" width="640">

---

## Why This Exists

AI assistants write tests that look right but break in production. They mock internals. They test implementation details. They create brittle, flaky, unmaintainable suites.

This skill fixes that. It embeds deep testing expertise—the kind that takes years to develop—directly into your AI's decision-making. The result: tests that actually catch bugs, survive refactors, and make your codebase more reliable.

---

## What You Get

**660+ Testing Best Practices** — Curated rules covering test anatomy, assertions, mocking, DOM testing, data handling, and architecture. Not generic advice. Actionable patterns.

**Page & Component Integration Tests** — First-class support for real-world browser testing with Vitest Browser Mode, Playwright, or Cypress. Unit tests are the easy part.

**Specialized Agents** — Purpose-built agents for planning, analyzing, writing, verifying, and healing tests. When tests fail, the healer agent debugs and fixes. When locators break, the locator-fixer adds proper ARIA attributes.

**Structured Workflow** — The "Double Gate" principle: test planning first, verification last. No more forgotten edge cases or untested code paths.

**Clear Reporting** — Know exactly what was tested, what passed, and what needs attention.

---

## Getting Started

### 1. Copy the skill to your project

```bash
# Copy these folders to your project root
cp -r commands/ your-project/commands/
cp -r agents/ your-project/agents/
cp -r skills/ your-project/skills/
```

### 2. Configure for your stack

Edit `skills/testing/config.toml` with your test commands, app URL, and framework preferences.

### 3. Write tests

```
/testskill.write-test login page
```

That's it. The skill handles planning, page analysis, test writing, and verification automatically.

---

## Commands

| Command | What It Does |
|---------|--------------|
| `/testskill.write-test <page>` | Full workflow: plan → analyze → write → verify |
| `/testskill.plan <page>` | Create test plan only |
| `/testskill.verify <plan-path>` | Verify tests against plan |
| `/testskill.review <test-file>` | Review test file against best practices |
| `/testskill.init` | Initialize skill in a project |

---

## The Agents

| Agent | Role |
|-------|------|
| **Planner** | Creates comprehensive test plans with coverage targets |
| **Page Analyzer** | Inspects live app to capture network calls, state, and UI structure |
| **Verifier** | Runs tests, checks quality, generates reports |
| **Healer** | Debugs and fixes failing tests |
| **Locator Fixer** | Adds ARIA attributes for stable selectors |


## License

MIT
