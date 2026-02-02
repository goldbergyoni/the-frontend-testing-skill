# Demo

- Usage 1: feature request
- Usage 2: test request
- A diagram

# Test prompt

In the products page, please add a button on the upper part of the screen to allow filtering for products locally without backend. The button name should be "Filters". When clicked, a popover is opened that allows to filter by product name, by a range of prices, and also to reset filters. Also, to submit once the filters are submitted, then obviously the products are being filtered. Ensure to use the testing skill while planning and coding

http://localhost:5173/products

# Ideas not to execute yet

- page-analysis conflicts, reads from previous folder
- Remove test write agent
- When to implement the tests
- Create failing tests in a file, not just titles
- Healer
- Make agents return score
- Manual instructions
- Instructions: On every change, run the tests
- Benchmarks
- Create agents - test plan, test verify
- More detailed test-plan.cases - how to reproduce, what is expected,
- Agents ping pong

### 10. Command Files Don't Exist in Expected Locations

The skill table references commands like `plan-test.md`, `write-tests.md`, `verify-test.md` but these don't exist at `example-app/.claude/commands/`. Instead, there are `testPlan.md` and `writeTests.md` with different naming. The skill documents reference paths that may not resolve correctly.

### 11. Package Manager Inconsistency

- `testPlan.md` uses `npm run test:browser` and `npm run dev`
- Project uses `pnpm` exclusively
- Need to replace all `npm` references with `pnpm`

### 3. MCP Tool Naming Inconsistency

- Skill documents reference `mcp__playwright__*` tools (e.g., `mcp__playwright__browser_navigate`)
- Agent files reference `mcp__playwright-test__*` tools (e.g., `mcp__playwright-test__browser_click`)
- These appear to be two different MCP servers. The skill should clarify which to use and when.

### 4. Broken Template References

- `writeTests.md` references `src/test/helpers/test-report-template.md` which likely doesn't exist
- Need to create this template or fix the path

### 5. Typos in system-wide-e2e-best-practices.md

- Line 7: "havesummarize" should be "have summarize" or "should summarize"
- Line 11: "dedciated" should be "dedicated"

---

## Missing Pieces

### 6. No Task-List Integration Guidance

The user workflow states: "When someone is coding a feature, it will use some tool to build a task list. That tool should find the skill and then be informed when exactly to incorporate testing tasks into the plan."

**Missing:** The skill needs a document explaining:

- How TodoWrite should incorporate testing tasks during feature development
- At what point in a feature task list should testing tasks appear
- Example of a proper task list that includes testing phases

### 7. No Unified "Full Testing Workflow" Command

User wants: "a command, or maybe a sub-agent that allows running all the recommended testing workflow (page analysis, test plan, test write) all together."

**Missing:** An orchestrating command like `/test-full` or `/test-complete` that:

1. Runs page analysis (planner agent)
2. Creates test plan (testPlan command)
3. Writes tests (writeTests command)
4. Verifies tests (coverage check)

### 8. No Verify-Test Command

The skill mentions `test-verification.md` but there's no corresponding `/verify-test` command. The verification workflow should be invokable standalone.

### 9. Missing Healer Documentation in Skill

The `playwright-test-healer` agent exists but isn't mentioned in the skill documents. When tests fail, the skill should guide users to the healer agent.

### 10. Incomplete Coverage Goals

`testing-strategy.md` has TBD placeholders for coverage targets:

```markdown
| Line coverage | TBD% |
| Branch coverage | TBD% |
```

---

## Structural Issues

### 11. Duplication Between Commands and Skill Documents

- `testPlan.md` command and `test-planning-workflow.md` skill document overlap significantly
- `writeTests.md` command duplicates guidance from `test-patterns.md`
- Consider: Commands should invoke skill documents, not duplicate their content

### 12. Missing Entry Point Documentation

No clear document explains:

- "I'm building a feature - how do I incorporate testing?"
- "I just want to test an existing page - what's the workflow?"
- "Tests are failing - where do I start?"

Consider adding a `GETTING-STARTED.md` or expanding SKILL.md with use-case-based entry points.

### 13. Agents vs Commands vs Skill Documents - Unclear Relationship

The skill has:

- Skill documents (patterns, practices, workflows)
- Commands (/testPlan, /writeTests)
- Agents (playwright-test-planner, playwright-test-generator, playwright-test-healer)

**Missing:** Clear documentation on:

- When to use a command vs when to use an agent
- How they relate to each other
- Which order they should be invoked

---

## Configuration/Environment Issues

### 14. Hardcoded URLs

- `testPlan.md` hardcodes `localhost:5173`
- This should be configurable or documented where to change it

### 15. Coverage File Path Assumptions

Documents reference `coverage/lcov.info` but the actual path depends on test runner configuration. Should document how to configure this or detect it.

---

## Suggested New Documents

### 16. Add: Workflow Entry Points Document

Create `WORKFLOWS.md` explaining:

```markdown
## Workflow 1: Testing During Feature Development

1. Read skill → 2. Add testing tasks to todo list → 3. Use planner → 4. Write tests → 5. Verify

## Workflow 2: Standalone Testing of Existing Page

1. /testPlan pageUrl → 2. /writeTests → 3. /verify-test

## Workflow 3: Debugging Failing Tests

1. Identify failure → 2. Use healer agent → 3. Verify fix
```

### 17. Add: MCP Tools Quick Reference

Create a quick reference showing which MCP tools exist, what they do, and when to use them.

### 18. Add: Examples Directory

Create `examples/` with:

- Example test plan output
- Example test file following all best practices
- Example coverage report interpretation

---

## Minor Improvements

### 19. Broken Reference in test-patterns.md

Line 10-11 says: "For comprehensive rules with detailed examples, see: **[testing-best-practices.md](../../testing-best-practices.md)**"

This relative path may not resolve correctly depending on where it's read from.

### 20. Partial incomplete ideas

The previous ideas.md had incomplete bullets like "- Config", "- Healer", "- MCPs" without explanation. These should be expanded or removed.
