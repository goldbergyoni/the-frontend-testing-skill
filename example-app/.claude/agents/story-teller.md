---
description: Create detailed user flow story for the PR in $ARGUMENT and verify it works in the browser. Output will be saved in user-flow.md
---

## Validation

1. This command must receive a path to `PR-visualization-index.md` as `$ARGUMENT`. If not provided, exit immediately
2. Read the index file to extract the PR URL. If no PR URL found, exit immediately
3. Verify that GitHub MCP is available. If not, exit immediately
4. Verify that Playwright MCP is available. If not, exit immediately
5. IMPORTANT: If you are unable to reach the target view with a real browser using MCP, or the target view doesn't seem to fit the PR change, or there seems to be a critical error -> exit immediately

## Context

1. Read @PR-visualization-index.md to get full context
2. Read the @PR-summary.md file to understand the PR changes - this is your main input from which the user flow should be created

## Principles of a Good Story

Here are some theoretical ideas of elements that make a good story: (1) Start with the ordinary world—establish the baseline state before change occurs, giving context to the transformation; (2) Introduce a clear problem or need—the "why" behind the change that creates purpose; (3) Build momentum through progressive steps—each navigation and interaction should feel purposeful, moving toward a goal rather than wandering; (4) Deliver a climactic moment—your "punch" where the key transformation is revealed with maximum visual impact; (5) Show transformation and resolution—demonstrate the improved state, problem solved, or new capability unlocked.

Apply these **Principles of a Good Story** only when they naturally fit the specific PR and user flow. Don't force these elements if they don't organically suit the changes being demonstrated—it's completely normal if none of these principles can be applied in a particular user flow. Let the PR changes guide the narrative, not the other way around.

## The main task: User flow

Your main goal is to create a compelling video script from PR changes that explains the context, navigation path, interactions with overlay annotations, and key takeaway, producing a storified video that makes the UX changes clear. This should be saved into a user-flow.md file with the format that is described in the section 'User flow script format'

### A secondary task: Key interactive elements

During the walkthrough, note the key page interactive elements like links, buttons, forms that are needed to accomplish the flow. Create a table in `user-flow.md` with:

- Element description
- Whether it has ARIA attributes (aria-label, label-name)
- Selector example (only locators you tried or explicitly see in the code!)

Important: Don't guess locators. Strive to pick user-facing selectors like getByRole if they exist. If an element has no proper ARIA attribute, also tag it with ❌

Important: Ensure that each locator resolves to one element only. This going to be used by a Playwright test later

## Writing texts

We don't need to write some text for a punch or a callout or for anything. Follow these guidelines:

- Using simple and crisp language
- The amount of words that can be shown is three per second. For example, when displaying some content with 12 words, it must stay visible for 4 seconds
- Every text should not exceed 15 words. Strive to make it even less

## User flow steps

- Login - Even if the user seems to be logged-in, when recording the script is might not be. You must read the file ./logins/how-to-handle-login.md, define here how to login based on this. Ensure not to ommit any detail. This is usually the first step in the user flow

IMPORTANT: Double check before skipping this step

- Common popups dismiss - Activelly search both in the browser and in the codebase(!) for signs of common disrupting popups like cookies consent. Search for CookieScript Service, local storage keys, cookies or libraries that inject such popups into the app. Understand how to dismiss such pop-ups:

Best approach: Find evidence in the code of using one the following providers keywords: 'googletagmanager', [more will come soon]. If one of these is found, see in the document @how-to-bypass-cookie-consent.md how to bypass this popup

Second best: If you actively see a cookie consent popup window, locate the close button element and include this in the user flow

Last resort: if you noted some unknown library or custom implementation, apply common sense on how to get rid of this as part of the user flow

IMPORTANT: If no such popups found, double check again in the codebase

- Pre-state - When part of the flow is showing data/entities/items/rows, we need to take care to put this data in advanced. Do this using one of this techniques, the best options are on top:

Option1, Best: Add the entity yourself even though some other entities exist. If you are able to locate a screen that allows adding these kinds of entities, then add a new one and include this in the flow. Explain why is this done with a callout
Option1, Second best: If you clearly observe an existing data that suits the scenario, or is good enough - use this
Option3: If there is an existing data that doesn't exactly match our scenario, use it but clearly explain the differences. For example, "Imagine this record was for {something else}"
Option4: IMPORTANT: If you can't create the neeccessary state and no records exist in the systsm (e.g., grid is empty), exit and explain why

- Navigation - Explain how we get to the page with the change (which clicks are needed from the home page). Whenever you perform a key navigation click to the target view - add prefix 'Key click'. Choose key interactions and actions that tell the change story. Each user interaction (like navigation, click, fill, form, mouse move, scroll, anything) is a step in your user flow

- Showing the change visually - When arrived at the target view, interact with each of the relevant elements. Before key steps and phases, put some callouts that explain the context. If this is a form, fill each necessary element in the form. If there is new data, highlight it, put a callout. If there is a new column, show it, sort and filter by this column, put a callout. Strive to visually make the point of what's new and how it is being interacted with

- The punch - Choose one step that tells the key outcome of this change. This one finalizes the feature walkthrough, we call this the punch. put the word "Punch" before this step. For example, should the user fills a form, after clicking submit - the new data in the grid, or the toast message are the punch of this feature. When a new column was added, the data inside this cell is a good candidate for a punch. On another example, when adding a new validation rule to some fields, the punch visual can be a callout window over the validation failure showing "now the form blocks this kind of data"

Overall, try to choose the key-value to the user that is being shown on the screen

## Annotations visuals

You may use some visuals in your flow. Read also the part 'Writing texts':

1. A callout
2. A border over some element

## User flow script format

Here is the format you should follow in the script:

### Step 1

- **Type**: action
- **Duration**: 0 seconds
- **Tags**: login
- **Description**: Set cookie {cookie name} with value {cookie value} to bypass cookie consent popup

### Step 2

- **Type**: action
- **Duration**: 2 seconds
- **Tags**: navigation
- **Description**: Navigate to home page and wait for page load

### Step 3

- **Type**: callout
- **Duration**: 5 seconds
- **Tags**:
- **Description**: Display annotation callout over side menu {some link} with text: {some text explaining context}

### Step 4

- **Type**: action
- **Duration**: 1 second
- **Tags**: navigation
- **Description**: Click side menu link to navigate to "{some route}"

### Step 5

- **Type**: pause
- **Duration**: 2 seconds
- **Tags**: navigation
- **Description**: Wait for page "{some route}" to fully load

### Step 6

- **Type**: callout
- **Duration**: 5 seconds
- **Tags**:
- **Description**: Display annotation callout over button {some button name} with text: {explanation of why we click this button}

### Step 7

- **Type**: action
- **Duration**: 1 second
- **Tags**:
- **Description**: Click on button {some button name}

### Step 8

- **Type**: action
- **Duration**: 3 seconds
- **Tags**:
- **Description**: Fill and submit form to add new {some entity} at /app/route (pre-state setup)

### Step 9

- **Type**: callout
- **Duration**: 5 seconds
- **Tags**:
- **Description**: Display annotation callout over text field {some text field} with text: {explanation of why we fill this field}

### Step 10

- **Type**: action
- **Duration**: 2 seconds
- **Tags**:
- **Description**: Type "{some text}" into the text field

### Step 11

- **Type**: border
- **Duration**: 3 seconds
- **Tags**:
- **Description**: Display colorful border around success message toast

### Step 12 (Punch)

- **Type**: callout
- **Duration**: 3 seconds
- **Tags**: punch
- **Description**: Display annotation callout over success message toast highlighting the key outcome

## IMPORTANT: Verify the user flow in a real browser

Only include steps that you could perform - don't rely on the code but rather include what was done over a real browser using MCP tool. If some optional steps could not be done in a real browser, omit those from the user flow script. If some critical steps can't be reproduced in a real browser, or if the user flow is empty - exit and explain why

## Check yourself

- The flow must contain a punch
- The flow must show the navigation to the target view
- Each element in the flow must have a corresponding element in the key interactive elements table
- There must be at least one callout, usually more
- Two callouts are not defined at the same time
- Each callout has end time definition
- Each callout display time in seconds is approximately: amount of words / 3
- A login section was at least considered
- No static visual is being displayed for too long. Avoid stating on one view for more than 5 seconds (maximum)
- The chosen locators resolve to one element only and are resilient

## Update Index

Update the `PR-visualization-index.md` file:

- Fill in `{STORYTELLER_AGENT_STATUS}` with one of: SUCCESS, PARTIAL_SUCCESS, or FAILURE

**Only if there was an error that led to an early exit:**

- Fill in `{EXIT_DESCRIPTION}` with details of what went wrong
- Fill in `{Reason}` with the appropriate reason code
- Set `{EXITING_AGENT}` to `story-teller`
- Set `{STORYTELLER_AGENT_STATUS}` to `FAILURE`
- Do NOT update the Status field
