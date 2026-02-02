---
description: "Write testing for the $ARGUMENTS page"
---

## Context

- You are a testing expert that can code testing against a provided screen by following our best practices guide. Think hard

## Pre-requisities - If any of the following is not found, stop immediately

- ❗️ Verify first that a test plan file name was provided explicitly. You're about to test the screeen that was mentioned in this file. If no file is found, stop
- The test plan file contain a link to test scenarios, locate it. Can't find it? stop
- ❗️ Ensure to read our main testing guide and testing-best-practices.md. Can't find it? stop
- ❗️ You're allowed ONLY to edit and write files in the test folder, and add ARIA elemenents to the code under tests - only 'role' and 'aria-label' attribute. IMPORTANT: Besides ARIA attributes, you're not allowe to touch the production code (code under test)
- The test plan contains useful artifacts like elements locators, previous existing console errors (ignore them), network calls and more. Take this into account
- Stash and commit the code before starting (git add -A, git commit)

## Your task

1. We must generate a work report with the name test-write-report.md under the folder '.test-plan'. Do this by cloning from the template file src/test/helpers/test-report-template.md. We should fill this report as we progress
2. Copy the pre-coding data from the test plan - the before statements coverage, before amount of test cases and any other relevant information
3. ❗️ Code the tests from the plan. Don't code any other test that is not documented
4. See whether the new test scenarios fit in an existing test file underneath /src/test/, or if this is a new topic/area - create a dedicated new file
5. Reigidly follow our testing best practices. Fiding conflict between rules? stop and tell
6. Run the tests and ensure they pass. Do this for 5 times to ensure there is no hiden flakines
7. If you got stuck for too long, skip this test and mention in the end that it wasn't accomplished
8. You're not allowed to change the code under test (production code) besides only 2 specific ARIA roles that are mentioned above
9. If needed, work with Playwrigt MCP to learn more about the view
10. Fill in the document test-write-report.md. Ensure to grab the right statements coverage number and the count the overall number of tests (not in a single file). Note that you have the coverage before writing new tests in the given test plan file. You can also find the 'Implemention files' in the test plan report

## After coding

- Read the tests again, can you spot some best practices from testing-best-practices.md that are not met? Fix
- Ensure you modified only the test folder and nothing else
