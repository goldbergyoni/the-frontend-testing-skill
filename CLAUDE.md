# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **The Frontend Testing Skill** - a Claude Code skill that orchestrates comprehensive frontend test writing and verification. It provides specialized agents, commands, and best practices documentation for testing workflows.

**Core Philosophy**: The "Double Gate 🌉 Principle" - test planning is the first task in any workflow, test verification is the last. Testing is integrated throughout development, not separate.

## Key Commands

All commands are configured in `/skills/testing/config.toml`:

| Command | Purpose |
|---------|---------|
| `/testskill.write-test <page-name>` | Full test workflow (plan → analyze → write → verify) |
| `/testskill.plan <page-name>` | Create test plan only |
| `/testskill.verify <test-plan.md-path>` | Verify tests after writing |
| `/testskill.review <test-file-path>` | Review test file against best practices |
| `/testskill.init` | Initialize skill in a project |

**Test Commands** (from config.toml):
- Run tests: `npm run test:page:ui`
- Run with coverage: `npm run test:page:coverage`
- Start app: `npm run start:staging-new`

## Architecture

```
the-frontend-testing-skill/
├── agents/                    # 5 specialized agents for testing workflows
│   ├── testskill.planner.md   # Creates test-plan.md with coverage baseline
│   ├── testskill.verifier.md  # Verifies tests pass & meet quality standards
│   ├── testskill.page-analyzer.md  # Analyzes pages before test writing (MANDATORY)
│   ├── testskill.healer.md    # Debug & fix failing tests (placeholder)
│   └── testskill.locator-fixer.md  # Add ARIA attributes (placeholder)
├── commands/                  # CLI command definitions
├── skills/testing/            # Core skill with all documentation
│   ├── SKILL.md               # Main skill definition & index
│   ├── config.toml            # Configuration (framework, commands, paths)
│   ├── test-workflow.md       # CRITICAL: Double Gate workflow
│   └── patterns-and-practices/  # 9 best practice guides
└── docs/demo/                 # Demo materials
```

## Mandatory Workflow

**VIOLATION WARNINGS** will be printed if these are not followed:

1. **Before writing tests**: Must have `test-plan.md` (from testskill.planner)
2. **Before writing tests**: Must have `page-analysis.md` (from testskill.page-analyzer)
3. **After writing tests**: Must run testskill.verifier
4. **Every task list**: First task = test planning, Last task = test verification

## Critical Files to Read

1. `/skills/testing/test-workflow.md` - The mandatory workflow sequence
2. `/skills/testing/patterns-and-practices/the-test-anatomy.md` - 6 critical rules for test structure
3. `/skills/testing/config.toml` - Project-specific configuration
4. Canonical example test: `src2/pages/Teams/test/Teams.integration.spec.tsx`

## Test Writing Rules (Summary)

The 6 most critical rules from `the-test-anatomy.md`:

1. No more than 10 statements per test
2. Include only details that affect test results - no unnecessary details
3. Totally flat: no if/else, loops, try-catch, console.log
4. Never mock internal parts - only external systems
5. **Smoking Gun Principle**: Every assertion value must appear first in arrange phase
6. Tests are self-contained - never rely on other tests' state

**Test title pattern**: `When {scenario}, then {expectation}`

**Test structure**: AAA (Arrange-Act-Assert) with clear phase separation

## Configuration

`/skills/testing/config.toml` controls:

- **Workflow enforcement**: `stop_when_no_plan`, `stop_when_no_page_analysis`, `must_have_human_review_of_plan`
- **Frameworks**: vitest, vitest-browser-mode, msw
- **Commands**: App start/stop, test run, git staging
- **Paths**: Test context artifacts location
- **App URLs**: Frontend at localhost:3000

## MCP Servers Required

The skill uses three MCP servers (installed via `/testskill.init`):
- `@playwright/mcp` - Browser automation
- `test-coverage-mcp` - Coverage tracking and comparison
- `playwright-test` - Test execution

## Test Types (Priority Order)

1. **Page Testing** (Primary) - Single page scope, one meaningful user action per test
2. **Component Testing** - Reusable components and design system libraries
3. **Unit Testing** - Only for heavy logic with high combinatorial inputs

**Test only external outcomes**: UI changes users notice, API mutations, storage changes. Never test implementation details.
