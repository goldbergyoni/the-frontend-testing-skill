---
description: Orchestrates multiple sub-agents to visualize this PR $ARGUMENT into a user flow video
---

## Validation

- This command must receive a PR URL as `$ARGUMENT`. If not provided, exit immediately.
- Playwright MCP must be available. If no, exit immediately.
- GitHub MCP must be available. If no, exit immediately.

## Setup

1. Read the PR title using GitHub MCP. If it doesn't exist, exit immediately.
2. Create a dedicated fresh pr folder for this PR under `{root}/pr-visualizations/{short-valid-folder-name-from-PR-title}{timestamp}/`. Never use an existing folder!
3. Ensure the folder is empty upon start. If it is not empty - create a fresh folder by adding some number as a suffix
4. Copy `/.claude/templates/PR-visualization-template.md` into the PR folder and rename it to `PR-visualization-index.md`
5. In the index file, fill in the `{PR_URL_PLACEHOLDER}` and `{PR_NAME}` placeholders in the index file with actual values from the PR
6. In the index file, fill in the `{CONFIG}` placeholder with all the key-values from `/.claude/templates/config.yml`
7. Copy all the files and folders from the '.claude/templates' folder into the pr folder that was created in bullet 2

## PR Summarizer

Run the agent `@agents/PR-summarizer.md` and pass it the path to the index file {PR-folder-path}/PR-visualization-index.md. Ask it to summarize the PR and include its results in the index file. It may create other artifacts within the same folder if needed

## Storyteller

Run the agent `@agents/story-teller.md` and pass it the path to the index file {PR-folder-path}/PR-visualization-index.md. Ask it to create a story out of this PR and update the index file

## Test Creator

Run the agent `@agents/test-creator.md` and pass it the path to the index file {PR-folder-path}/PR-visualization-index.md. Ask it to create a video and fill the results in the index file

## Finalization

Ensure the index file has a final status and a sensible state of information. If not, please mention this in your output. If all seems correct and there is a video path and there is no information for the error exit, then set the status to a positive status

## Checklist

✅ ALL agents were called
✅ The status cannot be positive if one of the agents reported failure
