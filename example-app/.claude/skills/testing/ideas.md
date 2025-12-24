# Tasks list

1. Create a config.toml configuration file in the testing skill root with these items: stop-when-no-plan, stop-when-no-page-analysis, test-framework, code-mocking-framework, network-interception-framework, must-have-human-review-of-plan, app-start-command, app-stop-command (nullable but recommended), test-start-command, test-context-root-folder (where to save test plans, possible value: 'given-spec-folder', 'custom-path'), test-context-folder-name (where to save test plans, test results and other artifacts), app-url (the frontend or api base url),

Put sensible comments for each. They deal with whether the agent should stop if there are no tests, there is no test plan or no page analysis, what is the chosen test framework, and the rest is pretty self-explanatory. This this config will get used to make decisions during the workflow

2. Create test-workflow.md - this file that is being referred to from the @SKILL.md is the key explanation of the desired testing workflow. We should create here a very concise instruction that will be used by the planning and coding agent. First, a high-level instruction: if any of these principles are violated during runtime, please print a bold message to the user that there is a testing violation. First step of the workflow: during task planning, the first task of a phase or user story is to create the test's definition (not necessary the implementation). This makes the next coding task have a clear definition of done in the context: The last task of a task series is to ensure the test passes and invokes the test verifier agent. Second. before planning or coding tests, we must ensure that there is a test context folder, a place to store the various test artifacts (not code). The coding agent might pass some specific given spec folder, or there is a custom path where we always wish to save underneath test plans. Third before coding any tests, there must be first two key artifacts:
   A. app-analysis.md, which summarizes run-time information from the Target App (like all the network calls that happen in the Target section)
   B. test-plan.md, which has a definition of all the desired test cases.
   We should stop and avoid writing tests if these mandatory artifacts are not found unless the config item stop_when_no_plan is explicitly set to false.
   Fourth. When coding a test, ensure to read and take into account the testing skill section that is called "Test Code Patterns and Practices" And use the various tools that are mentioned in the testing skill, contextually upon it
   Fifth. After coding all the desired tests, be sure to invoke the test verifier agent

3. In @test-commands.md explain that to start the application, stop it, run the tests. We should refer the corresponding config keys, not to change the markdown themselves but rather just point to the grid from the config. This way, our testing skill remains system-agnostic. Find the keys and include them in the description. In any file under the testing skill where you see a reference to some start or test command, replace the instructions with an instruction to read from the config key. Put the real key name.

4. Fix Typos in system-wide-e2e-best-practices.md

- Line 7: "havesummarize" should be "have summarize" or "should summarize"
- Line 11: "dedciated" should be "dedicated"

5. Replace hard-coded URLs with corresponding config like config.app-url

# Ideas not to execute yet

- Solve the test plan issue, tasks are not good
- Connect to main context: OpenSpec, Agents.md, claude.md
- Try a feature - add a contact support page, use claude.md workflow, it will generate test cases... where? failure...
- Create agents - test plan, test verify
- More detailed test-plan.cases - how to reproduce, what is expected,
- Init: install MCP, fill config,
- test-planner agent
- Use workflow only to create tasks
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
