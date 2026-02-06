---
description: 'Verify tests pass and meet quality standards'
---

## What This Does

Verifies test quality after a test writing session. Delegates to the `testskill.verifier` agent.

## Arguments

- `$ARGUMENTS` (required): Path to `test-plan.md` file

## Output

- Report file in the test context folder containing:
  - Plan vs actual test matching
  - Test execution results
  - Coverage changes
  - Best practices violations (reported, not fixed)
  - Mutation testing results
  - Overall assessment and recommendation

## Run the Agent

Invoke the `testskill.verifier` agent with the provided arguments.
