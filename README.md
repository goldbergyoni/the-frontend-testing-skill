# Frontend Testing Setup

An automated agent-based approach to setting up modern frontend page testing with Playwright, following best practices for fast, reliable, and maintainable tests.

## Overview

This repository provides Claude Code agents that automatically configure frontend testing infrastructure and generate high-quality test examples. The approach focuses on testing complete web pages while isolating the backend, enabling fast and reliable tests during development.

## Prerequisites

1. **Claude Code** - Install from [claude.ai/code](https://claude.ai/code)
2. **Running Frontend Application** - Your project must have a `package.json` script that starts the frontend system with the backend (e.g., `npm run dev`, `pnpm dev`)
3. **Active Development Server** - The coding agent needs a running system to experiment with

## Getting Started

Follow these steps in order:

### Step 1: Copy Agent Files

Copy the `.claude` folder and all its contents to your project's root directory. This includes:
- `/setup-playwright.md` - Agent for Playwright setup
- `/plan-test.md` - Agent for test planning
- `/write-tests.md` - Agent for test implementation
- `/verify-test.md` - Agent for test verification
- Supporting files and testing rules

### Step 2: Configure Playwright

Run the setup agent:

```bash
/setup-playwright
```

This agent will:
- Install Playwright with pinned versions
- Create `playwright.config.ts` with optimized settings
- Configure test scripts in `package.json`
- Set up GitHub Actions CI workflow
- Create a hello-world test to verify setup
- Copy testing best practices documentation

**Configuration Details:**
```javascript
webServer: {
    command: "pnpm dev",  // Your start command
    url: "http://localhost:5173",  // Your local port
    reuseExistingServer: !process.env.CI,
},
testMatch: "**/pages/**/*.test.ts",
fullyParallel: true,
projects: [{ name: "chromium" }]
```

### Step 3: Bypass Authentication (Manual Step)

⚠️ **Manual Configuration Required** - This step doesn't have an automated agent yet.

You need to configure your tests to bypass the login system. Common approaches:

**Option A: Mock Local Storage**
```typescript
await page.addInitScript(() => {
  localStorage.setItem('authToken', 'fake-test-token');
  localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
});
```

**Option B: Mock Backend Auth Responses**
```typescript
await page.route('**/api/auth/login', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ token: 'fake-token', user: { id: 1 } })
  });
});

await page.route('**/api/auth/me', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ id: 1, name: 'Test User' })
  });
});
```

Create a test setup file with your authentication bypass logic for reuse across tests.

### Step 4: Plan Your Tests

Choose a specific screen/page to test, then run:

```bash
/plan-test [screen-name] [optional: specific area to test]
```

Example:
```bash
/plan-test dashboard user-metrics-section
```

This agent will:
- Analyze the page structure
- Identify testable elements
- Generate a test plan with proposed test cases
- Create a `test-plan/[screen-name]-plan.md` file

### Step 5: Write Tests

Using the generated test plan, run:

```bash
/write-tests test-plan/[screen-name]-plan.md
```

This agent will:
- Process the test plan
- Generate actual test code following best practices
- Create test files in the appropriate page directory
- Include proper selectors, assertions, and structure

### Step 6: Verify Tests

After the tests are written, verify they work correctly:

```bash
/verify-test test-results.md
```

This agent will:
- Analyze test execution results
- Identify issues or flaky tests
- Suggest improvements
- Validate test quality

## Running Tests

After setup, use these commands:

```bash
npm run test          # Run all tests
npm run test:ui       # Run tests with Playwright UI
npm run test:coverage # Run tests with coverage
```

## Key Testing Principles

This setup follows these core principles:

1. **Page-Level Testing** - Test complete pages, not isolated components
2. **Backend Isolation** - Mock backend responses for fast, reliable tests
3. **Development Focus** - Tests run during development, not just in CI
4. **Parallel Execution** - Tests run concurrently for speed
5. **Best Practices** - Follow patterns from `@testing-best-practices.md`

## Project Structure

After setup, your project will include:

```
your-project/
├── .claude/
│   └── commands/
│       ├── setup-playwright.md
│       ├── plan-test.md
│       ├── write-tests.md
│       └── verify-test.md
├── .github/
│   └── workflows/
│       └── page-testing.yml
├── test/
│   ├── @testing-best-practices.md
│   └── claude.md
├── playwright.config.ts
└── [pages]/
    └── **/*.test.ts
```

## CI/CD Integration

GitHub Actions workflow is automatically configured to:
- Use the exact Playwright version from `package.json`
- Cache dependencies for faster runs
- Upload test reports and traces
- Run on pull requests and main branch

## Troubleshooting

- **Tests fail to start** - Verify your dev server command and port in `playwright.config.ts`
- **Browser not found** - Run `npx playwright install --with-deps`
- **Flaky tests** - Check network mocking and timing in test setup
- **CI failures** - Ensure Playwright version is pinned (no `^` or `~`)

## Learn More

- See [test/claude.md](test/claude.md) for testing approach details
- See [test/@testing-best-practices.md](test/@testing-best-practices.md) for comprehensive testing rules
- Visit [playwright.dev](https://playwright.dev) for Playwright documentation

## Contributing

This is a work-in-progress project. Contributions and feedback are welcome!
