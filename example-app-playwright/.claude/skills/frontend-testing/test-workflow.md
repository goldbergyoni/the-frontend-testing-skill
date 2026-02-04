# Test Workflow

**IMPORTANT**: If any of these workflow principles are violated during runtime, **print a bold message to the user that there is a testing violation**.

This document defines the mandatory sequence of steps for planning and writing tests. Following this workflow ensures tests have proper context, clear definitions of done, and verified quality.

---

## Core Principles

1. **Tests define "done"** - The first task in any phase/user story is creating test definitions
2. **Context before code** - Never write tests without `test-plan.md` and `page-analysis.md`
3. **Verification closes the loop** - Every test session ends with the test verifier agent
4. **Testing is integrated, not separate** - Test planning, implementation, and verification are one continuous workflow. Testing tasks and coding tasks co-exist in the same task list, not as separate phases

---

## Workflow Steps

### Step 1: During Task Planning — The Double Gate 🌉 Principle

> **This is the crucial Double Gate 🌉 principle**: Test planning is the first task in each workflow, test verification is the last task/gate. No coding session should happen without these two gates/tasks

When planning feature work or user stories (manually, using SDD framework, or any planning tool):

1. **First task of any phase**: Create test definitions by calling the `testskill.planner` agent, optionally followed by human approval task if config.must_have_human_review_of_plan is equal to true

2. **Last task of any phase**: Ensure tests pass + invoke test verifier agent. This closes the loop and verifies quality

```markdown
## Example Task List Structure

### Phase: Add Product Search Feature

- [ ] Task 1: Create test plan (invoke testskill.planner agent)
- [ ] Task 2: Ask for human confirmation of the test plan (if config.must_have_human_review_of_plan)
- [ ] Task 3: Implement search API endpoint
- [ ] Task 4: Implement search UI component
- [ ] Task 5: Run testskill.page-analyzer agent (page skeleton now exists)
- [ ] Task 6: Write and verify tests pass (invoke test verifier agent)
```

---

### Step 2: Test planning

The `testskill.planner` agent creates a plan inside test-plan.md. Don't move forward without user confirmation if config.must_have_human_review_of_plan is equal to true

---

### Step 3: Before Coding Tests

**MANDATORY**: Run the `testskill.page-analyzer` agent before writing any test code.

- **Timing**: Call when the page skeleton with elements exists
- **Output**: Creates `page-analysis.md` with elements, network calls, ARIA analysis
- **Rule**: Don't start writing tests without having `page-analysis.md`

---

### Step 4: When Coding Tests

Before writing test code:

1. Ensure `page-analysis.md` exist, if not call the agent `testskill.page-analyzer`. If the page analyzer failed, and `config.stop_when_no_page_analysis` is true -> Stop and print an error
2. **Read the test patterns** - See [Test Code: Patterns & Practices](./SKILL.md#-test-code-patterns--practices)
3. **Reference the test plan** - Use only scenarios defined in `test-plan.md`

### Step 5: After Coding Tests

**MANDATORY**: Invoke the test verifier agent to validate test quality, fix based on its feedback

---

## Violation Handling

If you encounter these situations, **print a bold warning**:

- **TESTING VIOLATION**: Attempting to write tests without `test-plan.md`
- **TESTING VIOLATION**: Attempting to write tests without `page-analysis.md`
- **TESTING VIOLATION**: Tests completed without running test verifier
- **TESTING VIOLATION**: A successful workflow must end with the final test report, its name is defined in the config file key: config.outputs.test_result_report
- **TESTING VIOLATION**: Skipping mandatory workflow steps
