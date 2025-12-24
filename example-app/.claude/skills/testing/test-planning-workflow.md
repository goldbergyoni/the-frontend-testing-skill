# 🔍 Test Planning & Workflow

The sequence of steps that must be followed when planning, writing, and verifying tests. Follow this workflow from start to finish for any testing task - it ensures thorough context gathering before writing and proper verification after.

---

## 📋 Mandatory Workflow Steps

### Step 1: Gather Context

Before writing any test, you must understand what you're testing.

#### 1.1 Read the Source Code

- [ ] Read the source file(s) under test
- [ ] Identify public API / exported functions
- [ ] Note dependencies and external calls
- [ ] Understand the expected behavior

#### 1.2 Inspect the Running Application (for UI tests)

```bash
# Navigate to the page
mcp__playwright__browser_navigate --url="<app.app_url>/your-route"

# Get accessibility tree - essential for finding proper locators
mcp__playwright__browser_snapshot

# Take screenshot if visual context helps
mcp__playwright__browser_take_screenshot
```

#### 1.3 Analyze Network & Console

```bash
# Discover which API endpoints the component calls
mcp__playwright__browser_network_requests

# Check for existing errors or warnings
mcp__playwright__browser_console_messages
```

#### 1.4 Find Existing Patterns

- [ ] Check `test-lib/fixtures/` for existing data factories
- [ ] Check `test-lib/handlers/` for existing MSW handlers
- [ ] Look at similar tests in the codebase for patterns

---

### Step 2: Plan Test Scenarios

Using [testing-strategy.md](./testing-strategy.md), identify:

- [ ] Which test type(s) to use (unit, component, integration)
- [ ] Happy path scenarios
- [ ] Edge cases and error conditions
- [ ] Apply deliberate fire principle (test least privilege, boundary values)

---

### Step 3: Record Baseline Coverage

```bash
# Record current coverage before writing tests
mcp__test-coverage__start_recording --lcovPath="coverage/lcov.info"
```

---

### Step 4: Write Tests

Following [test-patterns.md](./test-patterns.md):

- [ ] Read the 6 critical rules before writing
- [ ] Use AAA structure (Arrange-Act-Assert)
- [ ] Apply smoking gun principle
- [ ] Keep tests flat and simple

---

### Step 5: Run and Verify

```bash
# Run tests (see commands.test_run_command in config.toml)

# Check coverage impact
mcp__test-coverage__get_diff_since_start --lcovPath="coverage/lcov.info"
```

---

### Step 6: Complete Verification

Follow [test-verification.md](./test-verification.md) checklist before marking work complete.

---

## ✅ Definition of Done

Your testing work is complete when:

- [ ] All planned scenarios have tests
- [ ] Tests pass consistently (run multiple times, no flakiness)
- [ ] Coverage improved (verified with diff tool)
- [ ] Verification checklist passes
- [ ] No console errors in test output
- [ ] Tests follow all patterns in test-patterns.md

---

## 💡 Context Gathering Example

### Testing a Product List Component

```bash
# 1. Start the app (see commands.app_start_command in config.toml)

# 2. Navigate to page
mcp__playwright__browser_navigate --url="<app.app_url>/products"

# 3. Get element structure
mcp__playwright__browser_snapshot
# → Reveals: table with role="grid", buttons with accessible names

# 4. Check API calls
mcp__playwright__browser_network_requests
# → Reveals: GET /api/products returns array of products

# 5. Now I understand:
#    - Component fetches from /api/products
#    - Need to mock this endpoint with MSW
#    - Can use getByRole('grid') and getByRole('button', {name: '...'})
#    - Check test-lib/handlers/ for existing /api/products handler
```
