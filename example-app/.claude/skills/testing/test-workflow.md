# 🔄 Test Workflow

**IMPORTANT**: If any of these workflow principles are violated during runtime, **print a bold message to the user that there is a testing violation**.

This document defines the mandatory sequence of steps for planning and writing tests. Following this workflow ensures tests have proper context, clear definitions of done, and verified quality.

---

## Core Principles

1. **Tests define "done"** - The first task in any phase/user story is creating test definitions (not neccesserily the implementation)
2. **Context before code** - By default, avoid writing tests without app analysis and a test plan documents
3. **Verification closes the loop** - Every test session ends with the test verifier agent

---

## Workflow Steps

### Step 1: Ensure Test Context Folder Exists

Before planning or coding any tests, verify the test context folder exists. This folder stores test artifacts (plans, analysis, results).

**Location is determined by config keys:**

- `paths.test_context_root_folder` - Base location for test artifacts. This path may be:
  - **Provided by a parent agent** - When the testing skill is invoked as part of a larger workflow (e.g., spec-driven development framework), the parent agent passes the spec folder path where all context and artifacts should be managed
  - **A custom path from config** - When the testing skill runs standalone, this defaults to the configured path
- `paths.test_context_folder_name` - A dedicated folder for this testing session

```bash
# Create if it doesn't exist
mkdir -p <test_context_root_folder>/<test_context_folder_name>
```

---

### Step 2: Create/Verify Mandatory Artifacts

Before writing ANY test code, check whether these artifacts exist in the test context folder:

#### A. `app-analysis.md`

This is created by the test-planner agent which summarizes runtime information from the target application

#### B. `test-plan.md`

This is created by the test-planner agent which set the test scenarios

**IMPORTANT:** If `workflow.stop_when_no_plan` is `true` in config, the workflow STOPS here until artifacts are created. Do NOT proceed to writing tests without these artifacts.

---

### Step 3: During Task Planning

When planning feature work or user stories, whether manually, using SDD framework or using any planning tool:

1. **First task of any phase**: Create test definitions in `test-plan.md`

   - This gives subsequent coding tasks a clear definition of done

2. **Last task of any phase**: Ensure tests pass + invoke test verifier agent
   - This closes the loop and verifies quality

```markdown
## Example Task List Structure

### Phase: Add Product Search Feature

- [ ] Task 1: Define test cases for product search (creates test-plan.md)
- [ ] Task 2: Implement search API endpoint
- [ ] Task 3: Implement search UI component
- [ ] Task 4: Write and verify tests pass (invokes the test verifier agent)
```

---

### Step 4: When Coding Tests

Before writing test code:

1. **Read the test patterns** - See [Test Code: Patterns & Practices](./SKILL.md#-test-code-patterns--practices), ensure to follow all patterns and practices
2. **Reference the test plan** - Use only scenarios defined in `test-plan.md`
3. **Use app analysis** - Reference network calls and elements from `app-analysis.md`

---

### Step 5: After Coding Tests

**MANDATORY**: Invoke the test verifier agent to:

---

## Config Keys Reference

| Key                                       | Purpose                         |
| ----------------------------------------- | ------------------------------- |
| `workflow.stop_when_no_plan`              | Stop if test-plan.md missing    |
| `workflow.stop_when_no_page_analysis`     | Stop if app-analysis.md missing |
| `workflow.must_have_human_review_of_plan` | Require approval before coding  |
| `commands.app_start_command`              | How to start the app            |
| `commands.test_run_command`               | How to run tests                |
| `paths.test_context_root_folder`          | Where to store artifacts        |
| `paths.test_context_folder_name`          | Artifact folder name            |
| `app.app_url`                             | Application base URL            |

---

## Violation Handling

If you encounter these situations, **print a bold warning**:

- ⚠️ **TESTING VIOLATION**: Attempting to write tests without `test-plan.md`
- ⚠️ **TESTING VIOLATION**: Attempting to write tests without `app-analysis.md`
- ⚠️ **TESTING VIOLATION**: Tests completed without running test verifier
- ⚠️ **TESTING VIOLATION**: Skipping mandatory workflow steps
