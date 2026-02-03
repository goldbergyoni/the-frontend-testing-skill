---
description: Initialize Testing Skill - set up MCP servers, update memory files, and integrate with spec-driven development frameworks
---

# Initialize Testing Skill

Set up the testing skill for this project: install required MCP servers, link project memory files, and integrate with spec-driven development frameworks.

## Prerequisites

1. Verify `.claude/skills/testing/SKILL.md` exists in this project
2. If not found, STOP and report: "Testing skill not found at `.claude/skills/testing/`. Install it first."

## Tasks

### 1. Install MCP Servers

The testing skill requires these MCP servers for browser automation, test execution, and coverage tracking.

**Idempotency check**: Before installing, check if these tool prefixes are already available:

- `mcp__playwright__*`
- `mcp__playwright-test__*`
- `mcp__test-coverage__*`

**If all tools are already available**, skip installation and note "MCP servers already installed" for the checklist.

**Required MCP Servers:**

| Server          | Purpose                                        | Source                                                                 |
| --------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| Playwright      | Browser automation, snapshots, screenshots     | [Microsoft](https://github.com/microsoft/playwright-mcp)               |
| Playwright Test | Test execution, debugging, locator generation  | [Playwright](https://playwright.dev/) (built-in)                       |
| Test Coverage   | Coverage summary, file coverage, diff tracking | [test-coverage-mcp](https://github.com/goldbergyoni/test-coverage-mcp) |

**Ask the user:**

> Would you like me to install the required MCP servers for the testing skill?
>
> - Playwright (browser automation)
> - Playwright Test (test execution)
> - Test Coverage (coverage tracking)

**If user confirms**, run these commands to install each server:

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
claude mcp add playwright-test -- npx playwright run-test-mcp-server
claude mcp add test-coverage -- npx -y test-coverage-mcp
```

**After installation**, verify the servers are available by checking that these tool prefixes work:

- `mcp__playwright__*`
- `mcp__playwright-test__*`
- `mcp__test-coverage__*`

Report installation status to the user.

### 2. Update Memory Files

Search project root for these files:

- `CLAUDE.md`
- `AGENTS.md`
- `README.md`

**Idempotency check**: For each file found, check if it contains `.claude/skills/testing/`. If it already references the skill, skip that file and note "already references skill" for the checklist.

For each file found:

- Check if it contains `## Testing` AND references `.claude/skills/testing/`

  - If already references testing skill: skip
  - If no testing skill reference: append this section at the end (if there is already a "## Testing" block- append only the content. else- add the title+content):

  ```markdown
  ## Testing

  Testing is a core practice in this project. For planning, coding, or reviewing - consult the testing skill at `.claude/skills/testing/SKILL.md`. Follow the workflow in `.claude/skills/testing/test-workflow.md`.

  **Specifically, it is crucial to follow the Double Gate 🌉 principle in the test workflow.**
  ```

  - Make sure to add this section as well, under the relevant section (or as a standalone section if it fits better like this)- for making sure any new feature will yield an addition of a relevant integration test:

  ````markdown
  ### Integration Testing Requirements

      **MANDATORY**: Every feature added to the system must have integration tests.

      When adding a new feature:

      1. **Check for existing integration tests** for the relevant page
      - If integration tests exist, add new test scenarios for your feature
      - If no integration tests exist, create them as part of your feature work

      2. **Follow the testing workflow** from `.claude/skills/testing/test-workflow.md`:
      - Apply the Double Gate 🌉 principle: test planning as first task, test verification as last task
      - Use the `testskill.planner` agent to create test definitions
      - Use the `testskill.page-analyzer` agent before writing test code
      - Use the `testskill.verifier` agent to validate test quality

      3. **Test planning must be part of the feature task list**:
      - Example task structure:
          ```markdown
          - [ ] Task 1: Create test plan (invoke testskill.planner agent)
          - [ ] Task 2-N: Implement feature
          - [ ] Task N+1: Run testskill.page-analyzer agent (when page skeleton exists)
          - [ ] Task N+2: Write and verify tests pass (invoke testskill.verifier agent)
          ```

      4. **Never skip integration tests** - they define "done" for the feature

      **If you are asked to add a feature without integration tests, you must:**
      - Remind the user about the integration testing requirement
      - Include test planning and test verification tasks in your implementation plan
      - Create integration tests if they don't exist for the page
  ````

### 3. Update SessionStart Hook

Add the golden gate reminder to the SessionStart hook so it's shown at the beginning of every session.

**Idempotency check**: Check if `.claude/settings.json` exists and already contains a SessionStart hook with the testing reminder. If it already contains the golden gate message, skip updating and note "SessionStart hook already configured" for the checklist.

**Steps:**

1. Check if `.claude/settings.json` exists in the project root
2. If it doesn't exist, create it with the basic hook structure
3. If it exists, read it and check if the SessionStart hook with testing reminder is already present
4. If not present, add or update the SessionStart hook

**Hook configuration to add:**

The SessionStart hook should add this message to Claude's context at the start of every session:

```
**Testing Reminder**: This project follows the Double Gate 🌉 principle. For ANY task involving features or code changes:
- First task: Create test plan (consult `.claude/skills/testing/test-workflow.md`)
- Last task: Verify tests pass and meet quality standards

Consult `.claude/skills/testing/SKILL.md` for full testing workflow guidance.
```

**Implementation:**

Add this to `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '**Testing Reminder**: This project follows the Double Gate 🌉 principle. For ANY task involving features or code changes:\n- First task: Create test plan (consult `.claude/skills/testing/test-workflow.md`)\n- Last task: Verify tests pass and meet quality standards\n\nConsult `.claude/skills/testing/SKILL.md` for full testing workflow guidance.'"
          }
        ]
      }
    ]
  }
}
```

**Merge behavior**: If `.claude/settings.json` already exists with other content:

- Parse the existing JSON
- If `hooks` key doesn't exist, add it with the SessionStart configuration above
- If `hooks.SessionStart` doesn't exist, add it
- If `hooks.SessionStart` exists, check if our testing reminder hook is already present:
  - If present (check for "Double Gate" in the command), skip
  - If not present, append our hook to the existing SessionStart hooks array

Report to the user which action was taken: created new file, updated existing file, or skipped (already configured).

### 4. Detect SDD Framework

Check for these spec-driven development frameworks:

| Framework | Detection                               |
| --------- | --------------------------------------- |
| OpenSpec  | `openspec/AGENTS.md` exists             |
| SpecKit   | `speckit/` or `.speckit/` folder exists |
| BMAD      | `bmad/` or `.bmad/` folder exists       |
| AgentOS   | `agentos/` or `.agentos/` folder exists |

Report which framework found (or "none detected").

### 5. Update SDD Framework Files (if detected)

**Idempotency check**: Check if the framework's AGENTS.md contains `## Testing Integration`. If it already has this section, skip updating and note "already integrated" for the checklist.

**A. Update framework's AGENTS.md** - Add this section (if not already referencing testing skill):

```markdown
## Testing Integration

Before finalizing specs or tasks, review testing requirements:

- Skill: `.claude/skills/testing/SKILL.md`
- Workflow: `.claude/skills/testing/test-workflow.md`
- Patterns: `.claude/skills/testing/patterns-and-practices/`
```

**B. Update command templates** - For each template file (proposal, apply, task templates), add this section:

```markdown
## Testing Alignment

Any spec creation, task planning, or tech design must align with the testing skill. Before finalizing this document, review `.claude/skills/testing/test-workflow.md` to ensure testing considerations are incorporated into your plan.
```

**Template locations by framework:**

| Framework | Command Templates                                     |
| --------- | ----------------------------------------------------- |
| OpenSpec  | `.claude/commands/openspec/*.md`                      |
| SpecKit   | `speckit/templates/*.md` or `.speckit/templates/*.md` |
| BMAD      | `bmad/templates/*.md` or `.bmad/templates/*.md`       |
| AgentOS   | `agentos/templates/*.md` or `.agentos/templates/*.md` |

### 6. Output Setup Checklist

Before outputting the summary, also check:

- **secrets.toml**: Check if `.claude/skills/testing/secrets.toml` exists. If missing, note it in checklist with instructions to copy from `secrets.example.toml`.
- **Skill folder**: Check if `.claude/skills/testing/SKILL.md` exists.

Print this checklist followed by the summary:

```
## Setup Checklist

✅ MCP servers installed (or ❌ Not installed - run installation step)
✅ secrets.toml exists (or ❌ Missing - copy from secrets.example.toml)
✅ Skill folder exists (or ❌ Missing - install testing skill first)
✅ Project memory references skill (or ❌ Not referenced - run memory files step)
✅ SessionStart hook configured (or ❌ Not configured - run SessionStart hook step)
✅ SDD framework integrated (or ⏭️ No SDD framework detected)
```

Then print the detailed summary:

```
## Testing Skill Initialization Complete

### MCP Servers:
- [list installed servers, or "skipped by user", or "already installed"]

### Memory Files Updated:
- [list each file updated, or "none found", or "already references skill"]

### SessionStart Hook:
- [report: "configured in .claude/settings.json", "already configured", or "updated existing settings"]

### SDD Framework Detected:
- [framework name, or "none"]

### Templates Updated:
- [list each file updated, or "none", or "already integrated"]
```

### 7. Getting Started Message

After the checklist and summary, print this getting-started message:

```
🚀 Ready to start testing!

Pick a page and run: /testskill.write-test <page-url>

Want more control? Run these in sequence:
1. /testskill.plan <view-name>
2. /testskill.analyze-page <view-name>

This gives you a full plan with context.
```

## Important Rules

- Skip any file that already contains `.claude/skills/testing/`
- Do not overwrite existing content - only append new sections
- Use relative paths from project root in all references
