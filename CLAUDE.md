# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **The Frontend Testing Skill** - a Claude Code skill that orchestrates comprehensive frontend test writing and verification. It provides specialized agents, commands, and best practices documentation for testing workflows.

**Core Philosophy**: The "Double Gate 🌉 Principle" - test planning is the first task in any workflow, test verification is the last. Testing is integrated throughout development, not separate.

## Repository Structure

```
the-frontend-testing-skill/
├── the-testing-skill/           # The distributable skill package
│   ├── agents/                  # 5 specialized agents
│   │   ├── testskill.planner.md
│   │   ├── testskill.verifier.md
│   │   ├── testskill.page-analyzer.md
│   │   ├── testskill.healer.md
│   │   └── testskill.locator-fixer.md
│   ├── commands/                # Slash command definitions
│   └── skills/testing/          # Core documentation & config
│       ├── config.toml          # Framework & workflow settings
│       ├── test-workflow.md     # Double Gate workflow (CRITICAL)
│       └── patterns-and-practices/  # 9 best practice guides
├── example-app-playwright/      # Demo app with Playwright tests
├── example-app-vitest-browser/  # Demo app with Vitest Browser Mode
└── docs/demo/                   # Presentation materials
```

## Key Commands

| Command | Purpose |
|---------|---------|
| `/testskill.write-test <page-name>` | Full workflow: plan → analyze → write → verify |
| `/testskill.plan <page-name>` | Create test plan only |
| `/testskill.verify <test-plan.md-path>` | Verify tests after writing |
| `/testskill.review <test-file-path>` | Review test file against best practices |
| `/testskill.init` | Initialize skill in a project |

## Mandatory Workflow

**VIOLATION WARNINGS** will be printed if these are not followed:

1. **Before writing tests**: Must have `test-plan.md` (from testskill.planner)
2. **Before writing tests**: Must have `page-analysis.md` (from testskill.page-analyzer)
3. **After writing tests**: Must run testskill.verifier
4. **Every task list**: First task = test planning, Last task = test verification

## Critical Files to Read

1. `the-testing-skill/skills/testing/test-workflow.md` - The mandatory workflow sequence
2. `the-testing-skill/skills/testing/patterns-and-practices/the-test-anatomy.md` - 6 critical rules
3. `the-testing-skill/skills/testing/config.toml` - Configuration template

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

## Configuration (config.toml)

When installing the skill in a project, `config.toml` controls:

- **Workflow enforcement**: `stop_when_no_plan`, `stop_when_no_page_analysis`, `must_have_human_review_of_plan`
- **Frameworks**: vitest, vitest-browser-mode, playwright, msw, etc.
- **Commands**: App start/stop, test run, git staging
- **Paths**: Test context artifacts location
- **Canonical example**: Path to a reference test file in the target project

## Example Apps

The repository includes working example applications demonstrating skill integration:

- **example-app-playwright/**: React + Vite app with Playwright-based browser tests
- **example-app-vitest-browser/**: React + Vite app with Vitest Browser Mode tests

Both use: React 19, Vite, MSW for API mocking, Chakra UI, React Query.

Run tests in example apps:
```bash
cd example-app-playwright
pnpm install
pnpm test:browser        # Vitest browser tests
pnpm test:e2e            # Playwright E2E tests
```

## Test Types (Priority Order)

1. **Page Testing** (Primary) - Single page scope, one meaningful user action per test
2. **Component Testing** - Reusable components and design system libraries
3. **Unit Testing** - Only for heavy logic with high combinatorial inputs

**Test only external outcomes**: UI changes users notice, API mutations, storage changes. Never test implementation details.
