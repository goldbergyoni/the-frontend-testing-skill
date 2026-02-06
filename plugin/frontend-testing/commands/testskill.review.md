---
description: 'Review a test file against testing best practices'
---

## What This Does

Reviews a test file or specific test against all testing best practices and produces a violation report.

## Arguments

- `$ARGUMENTS` (required): Test file path OR specific test title

## Validation

**If no argument provided, stop and print:**

> Please provide a test file path or test title. Example: `/testskill.review src2/pages/Teams/test/Teams.test.tsx`

## Instructions

1. Read all pattern files from `.claude/skills/testing/patterns-and-practices/`:

   - `the-test-anatomy.md` (Sections A, B)
   - `assertions.md` (Section D)
   - `mocking.md` (Section E)
   - `testing-with-dom.md` (Section F)
   - `the-test-data.md` (Section C)
   - `what-to-test.md` (Section I)

2. Count the total number of best practices/rules across all pattern files. This count will be reported in the output.

3. Read the test file specified in `$ARGUMENTS`

4. For each rule, check if the test violates it. **Only report violations when 99% confident.**

5. Detect where is the code under test, plant a bug that the test should detect. For example, comment a critical line or change an operator. Ensure that the test indeed fails after a mutant (bug) was put in. Revert the test back to its healthy state

6. Produce output in this format:

```
## Test Review: {filename}

### Summary
📊 **{total count}** best practices checked
✅ **{count}** best practices followed
❌ **{count}** violations found
➖ **{count}** rules not applicable
🧌👍 **{Mutant detection}** Detetced

### Violations

| Lines | Rule | Issue | Suggested Fix |
|-------|------|-------|---------------|
| {line range} | {rule ID} | {what's wrong} | {one-liner fix suggestion} |
```

## Example Output

```
## Test Review: OrdersPage.test.tsx

### Summary
📊 **63** best practices checked
✅ **12** best practices followed
❌ **3** violations found
➖ **48** rules not applicable

### Violations

| Lines | Rule | Issue | Suggested Fix |
|-------|------|-------|---------------|
| 23-25 | A.13 | Test contains try-catch block | Remove try-catch; let test fail naturally |
| 31 | F.1 | Uses `getByTestId('submit-btn')` | Use `getByRole('button', { name: 'Submit' })` |
| 45-52 | A.3 | Test has 14 statements (max: 10) | Extract setup to beforeEach or helper |
```

If no violations found, congratulate the test author.
