---
description: Write Playwright test with visual annotations for PR in $ARGUMENT and generate video
---

## Validation

1. This command must receive a path to `PR-visualization-index.md` as `$ARGUMENT`. If not provided, exit immediately
2. Read the index file to extract the PR URL. If no PR URL found, exit immediately
3. Verify that GitHub MCP is available. If not, exit immediately
4. Verify that Playwright MCP is available. If not, exit immediately
5. Verify that the index file contains a user-flow.md that explains the test story. If not, exit immediately
6. Ensured app runs before running the test. You can read in @PR-visualization-index.md how to start it

## Tasks

Read the `user-flow.md` file in the same folder to understand the story and interactive elements.

### Write Playwright test

Write the user flow as a single Playwright test without assertions. This test is for video recording, not for standard testing.

The test should follow all the steps from "The user flow" section. Don't display two callouts at once. Use the "Key interactive elements" table to find out how to interact with elements

Try to navigate using the site menu/links. Only if no other choice, navigate with page.goto, but then you must call the `await injectTooltipIntoPage(page)`

IMPORTANT: Minimize timeouts, try to rely on getByRole, getByLabel and other user-facing locators. Try to avoid nth locators like first(), last(). Don't wait for elements to appear for more than 4000 milliseconds

IMPORTANT: User flow may define a need to close random pop-ups (e.g., cookie consent popup), if there is an instruction to put a cookie or local storage key - put this on page addInitialScript so it happens before the content loads. If the instruction points to a close locator, then you may use Playwright addLocatorHandler

When writing the test, don't rely on brittle assumptions like network idle. Instead, after the locator, put a waitFor the next element that you think should appear.

### Login

If there are login instructions, make sure to embed them in the login function that is being called from beforeEach

### Include visual annotations

IMPORTANT: Any time a callout tooltip is being displayed, you must accompany this with `await page.timeout({same time like the tooltip time})`. Otherwise, the page navigation will move forward without letting the tooltip to be displayed with the right timing

Here is a good example:

```javascript
await page.evaluate(() => {
    const menuButton = document.querySelector('[aria-label="Product actions"]');
    (window as any).createTooltip(
      menuButton,
      "Notice the new menu on each item",
      5000
    );
  });
await page.waitForTimeout(5000); //Same number like the tooltip!
```

The `tooltip.js` library is pre-loaded in the `beforeEach` hook of the test template. Use it to display tooltips on elements during the test.

**Function signature:**

```javascript
createTooltip(elementOrSelector, content, hideAfterMs);
```

**Parameters:**

- `elementOrSelector`: CSS selector string (e.g., 'button', '.my-class') or DOM element
- `content`: Text to display in the tooltip
- `hideAfterMs`: Duration in milliseconds before auto-hiding (default: 30000)

**Usage example:**

```javascript
// Show tooltip on a button, wait 7 seconds
await page.evaluate(() => {
  const buttons = Array.from(document.querySelectorAll('button'));
  const targetButton = buttons[0];
  (window as any).createTooltip(targetButton, 'This is a new feature!', 10000);
});
await page.waitForTimeout(7000);

// Show tooltip on a header, wait 3 seconds
await page.evaluate(() => {
  const header = document.querySelector('h2');
  (window as any).createTooltip(header, 'Check out this section!', 10000);
});
await page.waitForTimeout(3000);
```

**Important:**

- Don't display two tooltips at the same time
- Wait for the tooltip display duration before moving to the next step
- Follow the user flow instructions for which elements to annotate and for how long

### Create test file

1. Create a test file by copying @pr-flow-recorder-template.ts, put it in the PR folder, name it `pr-flow-recorder-{feature-name}-{timestamp}.test.ts`
2. Put the test inside this file, keep the beforeEach and other existing code

### Run the tests

Run the tests: `npm run test:e2e`

## Checklist to verify when done

✅ If the status is Success, then there must be a VIDEO_FILE_PATH
✅ If the status is success, then the generated Playwright test must pass
✅ If the status is success, then all the user flows steps are included in the test
✅ The test is not waiting for element longer than 4000 ms
✅ There must be at least one tooltip
✅ If you navigated programatically into a page with page.goto, you must afterward call `await injectTooltipIntoPage(page)`

## Update Index

Update the `PR-visualization-index.md` file:

- Fill in `{VIDEO_CREATOR_STATUS}` with one of: SUCCESS, PARTIAL_SUCCESS, or FAILURE

**If successful:**

- Fill in `{VIDEO_FILE_PATH}` with the path to the generated video file
- Set `{VIDEO_CREATOR_STATUS}` to `SUCCESS`

**Only if there was an error that led to an early exit:**

- Fill in `{EXIT_DESCRIPTION}` with details of what went wrong
- Fill in `{Reason}` with the appropriate reason code (CANT_FIND_PATH, ANNOTATIONS_FAILURE, STATE_ISSUE, OTHER)
- Set `{EXITING_AGENT}` to `test-creator`
- Set `{VIDEO_CREATOR_STATUS}` to `FAILURE`
- Do NOT update the Status field
