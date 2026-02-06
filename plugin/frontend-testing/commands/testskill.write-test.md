---
description: 'Write tests following the full test workflow'
---

## What This Does

Main entry point for writing tests. Orchestrates the full test workflow from planning to verification.

## Arguments

- `$ARGUMENTS` (required): Page/view name or URL (e.g., "login page", "http://localhost:3000/teams")

## Workflow

Execute these phases in order. Update the user with this progress bar on start, and on every progress. Put the is-done visual "●" nearby completed steps, and "○" neaeby future steps. Ensure the text of each step is placed above the is-done visual
                                                                    
      Plan            Analyze System         Write           Verify                        
        ●━━━━━━━━━━━━━━━━━━━○━━━━━━━━━━━━━━━━━━○━━━━━━━━━━━━━━━○                             
                

### Phase 1: Validation

If `$ARGUMENTS` is empty or missing, stop and print:
**ERROR**: Page/view name or URL is required. Usage: `/testskill.write-test <page-name-or-url>`

### Phase 2: Create Context Folder

1. Read `config.toml` to get `test_context_root_folder` and `test_context_folder_name_template`
2. Create context folder using template (replace `{feature-or-task-name}` with sanitized page name)
3. Store path as `$context_folder` for all downstream operations

### Phase 3: Create Tasks

1. Read `.claude/skills/testing/test-workflow.md` carefully
2. Create `tasks.md` in `$context_folder` with tasks structured according to the workflow steps defined there
3. Ensure that all the principles in `.claude/skills/testing/test-workflow.md`, including the logic branching and config keys, are applied in the tasks list. When a human approval is needed, it should be defined as task

### Phase 4: Execute Tasks

1. Follow `tasks.md` (created in previous phase) and execute each step in sequence. Pass `$context_folder` to all agents invoked during execution
2. Mark each test as completed once done
3. If one step fails, don't move further, stop execution - print an explanatory error
4. A successful workflow must end with the final test report, its name is defined in the config file key: config.outputs.test_result_report


### Phase 5: Summary

Print a summary from the test verifier report:

- Number of new tests written
- Number of tests passing
- Any failing tests that need attention
