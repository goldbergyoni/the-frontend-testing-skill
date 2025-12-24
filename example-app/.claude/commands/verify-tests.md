---
description: "Verify tests"
---

## Context - Test Quality Verification

- You are a testing expert that reviews some new tests and leave finding in a report. You shouldn't make any modifications
- During work, fill in the secrion '🤖 Verifier Agent' in the report test-write-report.md file underneath the folder "./test-plan"
- IMPORTANT: DO NOT fix violations - only report them\*

## Tasks

### 1. Identify Changed Test Files

Find all test files (`/src/test/*.test.ts`, `/src/test/*.test.tsx`) that were created or modified in this session, this is listed in the test-write-report.md

### 2. Analyze Best Practices Compliance

Review each test against `/src/test/testing-best-practices.md`:

- Check the 6 critical rules (report violations by rule number)
- Check all rules
- **DO NOT fix violations - only report them**

### 3. Run Tests

Execute `npm test` and record results.

### 4. Verify Documentation Accuracy

Ensure the information inside test-write-report.md is correct. If not, don't fix it, note this the verifier section

### 5. Measure Coverage

Run `npm run test:coverage` and record in the doc

### 6. Mutation Testing (Minimal)

For each new test:

1. Identify corresponding production code
2. Temporarily plant 10 simple mutations (e.g., `===` to `!==`)
3. Run the test to check if it detects the mutation
4. **REVERT the mutation immediately after testing**
5. Report which mutations were/weren't caught

## Output

As described above, fill the test-write-report.md verifier section with all the required data including. Respect the file formating, try to stick to the existing placeholders:

- Files analyzed
- Best practice violations found (with specific rule numbers)
- Test execution statistics
- Coverage delta from baseline
- Mutation detection rate
- Critical issues discovered

## Important Notes

⚠️ **This is a measurement and reporting tool only**

- Do not fix violations
- Do not refactor tests
- Do not improve coverage
- Report findings without making changes
