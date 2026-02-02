---
description: 'Setup Playwright for frontend page and component testing. Including Playwright config, browser installation, CI, rules and more
---

## Prereqisties - validate this first

Infer the following pieces of information and remember them. If one of them is unclear or can't be found, please stop immediately and ask the user to clarify this:

A. Infer what is the existing package.json command to start the front-end, we call this 'the start command'
B. Infer what port is used to serve the front-end locally, we call this 'local port'
C. Find out which folder holds the various front-end pages, we call this 'pages folder'
D. Find out which package manager is being used: npm, yarn, or PNPM

If any of this information is unclear, ask the user to clarify before proceeding

If all good, print out your findings

## Tasks

1. **Install Playwright**
   - Add Playwright as a dev dependency
   - Use npm, yarn, or pnpm based on what exists in the project

2. **Configure post-install script**
   - Add a postinstall script to package.json that runs: `playwright install --with-deps`
   - This ensures browsers and system dependencies are installed automatically

3. **Create test scripts**
   - Add these exact scripts to package.json:
     - `test`: Run `playwright test`
     - `test:ui`: Run `playwright test --ui`
     - `test:coverage`: Run `playwright test --coverage`

4. **Pin Playwright version**
   - In package.json, set the Playwright version to an exact version (no ^ or ~)
   - Example: `"@playwright/test": "1.40.0"` not `"^1.40.0"`
   - Explain: This prevents CI failures when new Playwright versions require different Docker images

5. **Configure playwright.config.ts**
   - Set `fullyParallel: true`
   - Set `testMatch` to match test files under the pages folder: `**/frontend/pages/**/*.test.ts` (adjust path based on actual project pages folder)
   - Configure one browser project only: Chromium
   - Add webServer configuration pointing to the local port of the Vite dev server (typically port 5173)

   `
webServer: {
    command: "{The existing start command, see package.json commands }",
    url: "http://localhost:{The local port}",
    reuseExistingServer: !process.env.CI,
  }
   `

6. Underneath the root, create a test folder to hold reusable assets, rules, and hooks


7. Copy the file @testing-best-practices.md under /test

8. Create a claude.md file that explains the key testing instructions: explain the overall approach of testing whole web pages while isolating the backend. Create a section about the various packages and scripts that can be executed. Point to the @testing-best-practices.md    file as the main rules for writing good tests

9. **Create GitHub Actions workflow**
   - Copy the file @page-testing-ci.yml to the standard .github folder
   - Modify it to adapt to this project
   - Use the EXACT same Playwright version as pinned in package.json
   - Ensure the right package manager is used
   - Ensure caching and report upload are configured correctly

10. **Create hello-world test**
   - In one of the front-end page directories, create a test file
   - Write a minimal test: `expect(true).toBe(true)` or similar
   - Run the test to verify the entire setup works
   - Confirm test passes before completing

11. **Greet end advice what to do next** - If all went well, greet the user, explain how to write tests, and propose running the next subagent - 'page-test-setup'


## Other instructions

 - This work involves no coding or complexity, just simple and standard configuration. If something demands more thinking and doesn't seem trivial, please stop and inform the user. Don't try to be creative 

- Execute all steps sequentially
