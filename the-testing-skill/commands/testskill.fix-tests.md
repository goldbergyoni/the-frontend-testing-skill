---
description: 'Debug and fix failing tests automatically'
---

## What This Does

Analyzes failing tests, identifies root causes, and applies fixes. Delegates to the `testskill.fix-tests` agent.

## Arguments

- `$ARGUMENTS` (optional): Specific test file or pattern to fix. If empty, runs all tests.

## Workflow

1. Run test suite to identify failures
2. For each failure, analyze error and gather context
3. Diagnose root cause (locator, assertion, state, timing, or actual bug)
4. Apply minimal fix
5. Verify fix by re-running test
6. Report results

## Run the Agent

Invoke the `testskill.fix-tests` agent with the provided arguments.
