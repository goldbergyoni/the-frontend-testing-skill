---
description: 'Plan testing of a the $ARGUMENTS page and scenarios including page inspection, elements accessibility check, console errors verification, print screens and more'
---

## What This Does

Creates a comprehensive test plan for a page/view before writing tests. Delegates to the `testskill.planner` agent.

## Arguments

- `$ARGUMENTS` (required): Page/view name or feature description (e.g., "login page", "checkout flow")
- `$root_working_folder` (optional): Folder to create test context in

## Output

- `test-plan.md` in the working folder containing:
  - Coverage baseline
  - Proposed test cases with priorities
  - Simulation instructions for each scenario
  - Next steps

## Run the Agent

Invoke the `testskill.planner` agent with the provided arguments.
