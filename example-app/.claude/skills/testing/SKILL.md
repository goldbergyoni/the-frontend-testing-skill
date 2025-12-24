---
name: testing
description: Comprehensive guide for writing tests for React/frontend projects. MUST be read before planning any coding session and during every coding session. Use when planning, writing, verifying, or debugging any type of test.
allowed-tools: Read, Grep, Glob, Bash, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_click, mcp__playwright__browser_console_messages, mcp__playwright__browser_network_requests, mcp__playwright__browser_take_screenshot, mcp__test-coverage__coverage_summary, mcp__test-coverage__coverage_file_summary, mcp__test-coverage__start_recording, mcp__test-coverage__get_diff_since_start
---

# 🧪 Testing Skill

A key guide on how to plan and code with testing in mind inclding how to write tests efficiently, how run/debug tests and other crucial information for any coding session. Use this skill whenever planning any development, before coding, while planning tasks, during coding, and during testing. This ensures tests are considered from the start and written correctly

---

## 📚 Skill Documents

| Document                                                              | Purpose                                                                                  | When to Use                                                                                                                                                                                                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [IMPORTANT: The Test Workflow](./test-workflow.md)                    | The sequence of steps that must be followed when planning, writing, and verifying tests. | **MUST be read before any feature or test coding.** Follow this workflow from start to finish for any testing task - it ensures thorough context gathering before writing and proper verification after.                               |
| [🚀 Useful Commands](./test-commands.md)                              | Commands to start the application and run tests.                                         | Use these commands to get the system running for investigation, run tests before adding new ones to establish baseline, and run again after writing tests to verify they pass.                                                         |
| [🎯 Testing Strategy](./testing-strategy.md)                          | Guidance on what types of tests to write and how to plan exhaustive test cases.          | Consult during planning to decide between unit/component/integration tests and to systematically identify edge cases that need coverage.                                                                                               |
| [🛠️ Testing Framework & Libraries](./testing-workflow-tooling.md)     | Which test runners, libraries, and tools to prefer.                                      | Reference when setting up tests to ensure you're using the recommended frameworks and following project conventions.                                                                                                                   |
| [📐 Test Code: Patterns & Practices](#-test-code-patterns--practices) | Mandatory rules and best practices for writing tests.                                    | These rules must be read and followed every time tests are written. See detailed breakdown below.                                                                                                                                      |
| [🔧 Test Tools & Agents](./tools-and-agents.md)                       | MCP tools and specialized agents for testing workflows.                                  | Reference when you need browser automation (Playwright), coverage measurement, test planning, healing failing tests, or fixing accessibility issues. Includes test-planner, test-healer, test-verifier, and page-locator-fixer agents. |

---

## 🔄 Typical Workflow

```
1. Read test-planning-workflow.md → Follow the mandatory steps
2. Read testing-strategy.md → Decide test types, plan edge cases
3. Read test-patterns.md → Internalize rules before writing
4. Run existing tests (test-commands.md) → Establish baseline
5. Write tests following patterns
6. Run tests again → Verify they pass
7. Execute verification (test-verification.md) → Mandatory final checks
```

---

## ⚠️ Important Rules

1. **Always follow the workflow** - The sequence in test-planning-workflow.md is mandatory
2. **Read patterns before writing** - test-patterns.md rules must be followed strictly
3. **Run verification** - [test-verification.md](./test-verification.md) checks are required before completing work
4. **Use tools and agents** - See [tools-and-agents.md](./tools-and-agents.md) for available MCP tools and specialized agents

---

## 📐 Test Code: Patterns & Practices

**Read [The Test Anatomy](./patterns-and-practices/the-test-anatomy.md) before writing any test.**

| Document                                                                                        | When to Use                                                                                                    |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [The Test Anatomy](./patterns-and-practices/the-test-anatomy.md)                                | **Mandatory first read** - Core structure, 6 critical rules, AAA pattern, and examples                         |
| [The Test Data](./patterns-and-practices/the-test-data.md)                                      | When working with JSONs, entities, or any test input data                                                      |
| [Assertions](./patterns-and-practices/assertions.md)                                            | When writing expect statements and verifying outcomes                                                          |
| [Mocking](./patterns-and-practices/mocking.md)                                                  | When mocking external systems or network requests                                                              |
| [Testing with DOM](./patterns-and-practices/testing-with-dom.md)                                | When testing React components with testing-library or Playwright                                               |
| [Testing with Database](./patterns-and-practices/testing-with-database.md)                      | When tests interact with a real database                                                                       |
| [What to Test](./patterns-and-practices/what-to-test.md)                                        | When deciding coverage scope and edge cases                                                                    |
| ⚠️ [System-Wide E2E Best Practices](./patterns-and-practices/system-wide-e2e-best-practices.md) | **ONLY for system-wide E2E tests** spanning multiple processes - NOT for unit/component/integration/page tests |
