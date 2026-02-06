# Frontend Testing Skill

**AI-native test writing.** Not prompts. Not tips. A complete skill that writes production-grade tests from first principles.

## Quick Start

```
/testskill.write-test <page-name>
```

That's it. The skill handles planning, page analysis, test writing, and verification automatically.

## Commands

| Command | What It Does |
|---------|--------------|
| `/testskill.write-test <page>` | Full workflow: plan → analyze → write → verify |
| `/testskill.plan <page>` | Create test plan only |
| `/testskill.verify <plan-path>` | Verify tests against plan |
| `/testskill.review <test-file>` | Review test file against best practices |
| `/testskill.init` | Initialize skill in a project |

## Agents

| Agent | Role |
|-------|------|
| **Planner** | Creates comprehensive test plans with coverage targets |
| **Page Analyzer** | Inspects live app to capture network calls, state, and UI structure |
| **Verifier** | Runs tests, checks quality, generates reports |
| **Healer** | Debugs and fixes failing tests |
| **Locator Fixer** | Adds ARIA attributes for stable selectors |

## Core Philosophy

The **"Double Gate 🌉 Principle"**: Test planning is the first task in any workflow, test verification is the last. Testing is integrated throughout development, not separate.

## Configuration

After installation, edit `.claude/skills/testing/config.toml` to configure:

- **Frameworks**: vitest, vitest-browser-mode, playwright, msw
- **Commands**: App start/stop, test run commands
- **Workflow**: Enforcement rules for plans and analysis

## Documentation

- [Test Workflow](./test-workflow.md) - Mandatory workflow sequence
- [Test Anatomy](./patterns-and-practices/the-test-anatomy.md) - 6 critical rules
- [Patterns & Practices](./patterns-and-practices/) - Best practice guides

## License

MIT
