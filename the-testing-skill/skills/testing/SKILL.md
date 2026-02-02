---
name: frontend-testing
description: Comprehensive guide and tools for writing frontend tests. Must be read before planning features, during tasks creation, while coding features or testing. This skill recommended is mandatory in any kind of feature coding or test writing, and specifically critical with the following: when creating a task list - whether it's a feature development or just testing, when planning the definition of done of new features, when in a need to cover some functionality or page with tests, when doing TDD, when planning tests for a new functionality, when finalizing a coding session, there is a need to get verification and confidence. When a test fails, when there is a need to ensure all tests pass or get test coverage
allowed-tools: Read, Grep, Glob, Bash, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_click, mcp__playwright__browser_console_messages, mcp__playwright__browser_network_requests, mcp__playwright__browser_take_screenshot, mcp__test-coverage__coverage_summary, mcp__test-coverage__coverage_file_summary, mcp__test-coverage__start_recording, mcp__test-coverage__get_diff_since_start
metadata:
  author: Yoni Goldberg
  version: "3.2.0"
---

# 🧪 Testing Skill

A key guide on how to plan and code with testing in mind inclding how to write tests efficiently, how run/debug tests and other crucial information for any coding session. Use this skill whenever planning any development, before coding, while planning tasks, during coding, and during testing. This ensures tests are considered from the start and written correctly

<div align="left">
  <img src="./the-testing-skill.png" alt="Testing Skill Overview" width="150" />
</div>

---

## 📚 Skill Documents

| Document                                                              | Purpose                                                                                                           | When to Use                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [IMPORTANT: The Test Workflow](./test-workflow.md)                    | The sequence of steps that must be followed when planning, writing, and verifying tests.                          | **MUST be read before any feature or test coding.** Follow this workflow from start to finish for any testing task - it ensures thorough context gathering before writing and proper verification after.                                                   |
| [🚀 Useful Commands](./test-commands.md)                              | Commands to start the application and run tests.                                                                  | Use these commands to get the system running for investigation, run tests before adding new ones to establish baseline, and run again after writing tests to verify they pass.                                                                             |
| [🎯 Testing Strategy & Tooling](./testing-strategy-and-tooling.md)    | Guidance on test types (page vs component vs unit), what outcomes to test, and which frameworks/libraries to use. | Consult during planning to decide test types, understand what to verify, and ensure you're using the recommended frameworks.                                                                                                                               |
| [📐 Test Code: Patterns & Practices](#-test-code-patterns--practices) | Mandatory rules and best practices for writing tests.                                                             | These rules must be read and followed every time tests are written. See detailed breakdown below.                                                                                                                                                          |
| [🔧 Test Tools (MCP) & Agents](./tools-and-agents.md)                 | MCP tools and specialized agents for testing workflows.                                                           | Reference when you need browser automation (Playwright), coverage measurement, test planning, healing failing tests, or fixing accessibility issues. Includes testskill.planner, testskill.healer, testskill.verifier, and testskill.locator-fixer agents. |

---

## 📐 Test Code: Patterns & Practices

**Read [The Test Anatomy](./patterns-and-practices/the-test-anatomy.md) before writing any test.**

**📌 Canonical Example:** For a real, working example that demonstrates all patterns, read the test configured in `config.toml` under `[canonical_example]`.

| Document                                                                                        | When to Use                                                                                                    |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [The Test Anatomy](./patterns-and-practices/the-test-anatomy.md)                                | **Mandatory first read** - Core structure, 6 critical rules, AAA pattern, and examples                         |
| [File Structure](./patterns-and-practices/file-structure.md)                                    | Where to put test files and companion files (actions.tsx, factories.ts, httpMocks.ts, worker.ts)               |
| [The Test Data](./patterns-and-practices/the-test-data.md)                                      | When working with JSONs, entities, or any test input data                                                      |
| [Assertions](./patterns-and-practices/assertions.md)                                            | When writing expect statements and verifying outcomes                                                          |
| [Mocking](./patterns-and-practices/mocking.md)                                                  | When mocking external systems or network requests                                                              |
| [Testing with DOM](./patterns-and-practices/testing-with-dom.md)                                | When testing React components with testing-library or Playwright                                               |
| [Testing with Database](./patterns-and-practices/testing-with-database.md)                      | When tests interact with a real database                                                                       |
| [What to Test](./patterns-and-practices/what-to-test.md)                                        | When deciding coverage scope and edge cases                                                                    |
| ⚠️ [System-Wide E2E Best Practices](./patterns-and-practices/system-wide-e2e-best-practices.md) | **ONLY for system-wide E2E tests** spanning multiple processes - NOT for unit/component/integration/page tests |
