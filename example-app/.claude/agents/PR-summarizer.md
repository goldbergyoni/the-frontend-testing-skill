---
description: Analyze the PR described in $ARGUMENT and create initial summary with proposed user flow
---

## Validation

1. This command must receive a path to `PR-visualization-index.md` as `$ARGUMENT`. If not provided, exit immediately
2. Read the index file to extract the PR URL. If no PR URL found, exit immediately
3. Verify that GitHub MCP is available. If not, exit immediately
4. Verify that Playwright MCP is available. If not, exit immediately

## Tasks

Visit the PR using GitHub MCP.

Learn it, read the description and the code that changed. If you can't find the right view, stop early and tell why. If needed, search for a feature flag in the code and note whether it needs to be activated/deactivated.

Create a markdown file `PR-summary.md` in the same folder as the index file with the following content:

1. **PR title** - The title of the PR
2. **PR description** - The full description from the PR
3. **Code changes** - List of files changed with brief description of what changed in each
4. **Comments** - Any relevant PR comments that provide context
5. **Product change** - Describe the product change briefly
6. **Tech change** - Describe what changed technically
7. **Code locations** - Find in the codebase where physically is the page path and where are the related components
8. **Proposed user flow** - Initial draft of how to navigate to the changed feature from the home page. Note any pre-state that might be needed (existing records/entities)

## Update Index

Update the `PR-visualization-index.md` file:

- Fill in `{PR_SUMMARY_ONE_PARAGRAPH}` with a brief summary of the PR
- Fill in `{NAVIGATION_PATH_AND_INSTRUCTIONS}` with the frontend route path
- Fill in `{PR_SUMMARY_AGENT_STATUS}` with one of: SUCCESS, PARTIAL_SUCCESS, or FAILURE

**Only if there was an error that led to an early exit:**

- Fill in `{EXIT_DESCRIPTION}` with details of what went wrong
- Fill in `{Reason}` with the appropriate reason code
- Set `{EXITING_AGENT}` to `PR-summarizer`
- Set `{PR_SUMMARY_AGENT_STATUS}` to `FAILURE`
- Do NOT update the Status field
